import { NextResponse } from "next/server";
import crypto from "crypto";
import { promisify } from "util";
import { getSupabase } from "@/lib/supabase";

const pbkdf2 = promisify(crypto.pbkdf2);

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await pbkdf2(password, salt, 100000, 64, "sha256");
  return `${salt}:${hash.toString("hex")}`;
}

function createToken(userId: string, role: string, secret: string): string {
  const mac = crypto.createHmac("sha256", secret).update(`${userId}.${role}`).digest("hex");
  return `${userId}.${role}.${mac}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) return NextResponse.json({ valid: false });

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ valid: false });

  const { data: user } = await supabase
    .from("admin_users")
    .select("id, name, email, invite_expires")
    .eq("invite_token", token)
    .eq("invite_accepted", false)
    .single();

  if (!user) return NextResponse.json({ valid: false });
  if (new Date(user.invite_expires) < new Date()) return NextResponse.json({ valid: false, reason: "expired" });

  return NextResponse.json({ valid: true, name: user.name, email: user.email });
}

export async function POST(request: Request) {
  const { token, password } = await request.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  const { data: user } = await supabase
    .from("admin_users")
    .select("id, role, invite_expires")
    .eq("invite_token", token)
    .eq("invite_accepted", false)
    .single();

  if (!user) return NextResponse.json({ error: "Invalid or expired invite link" }, { status: 400 });
  if (new Date(user.invite_expires) < new Date()) {
    return NextResponse.json({ error: "This invite link has expired" }, { status: 400 });
  }

  const password_hash = await hashPassword(password);

  const { error } = await supabase
    .from("admin_users")
    .update({ password_hash, invite_accepted: true, invite_token: null, invite_expires: null })
    .eq("id", user.id);

  if (error) return NextResponse.json({ error: "Failed to activate account" }, { status: 500 });

  const secret = process.env.ADMIN_SECRET ?? "buef-fallback-secret";
  const cookieToken = createToken(user.id, user.role, secret);

  const response = NextResponse.json({ ok: true });
  const prod = process.env.NODE_ENV === "production";
  response.cookies.set("admin_token", cookieToken, {
    httpOnly: true,
    secure: prod,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
