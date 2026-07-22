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

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ needsSetup: false, error: "Database not configured" });

  const { count } = await supabase
    .from("admin_users")
    .select("*", { count: "exact", head: true });

  return NextResponse.json({ needsSetup: (count ?? 0) === 0 });
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { count } = await supabase
    .from("admin_users")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: "Setup already complete" }, { status: 403 });
  }

  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const password_hash = await hashPassword(password);

  const { data: user, error } = await supabase
    .from("admin_users")
    .insert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: "super_admin",
      password_hash,
      invite_accepted: true,
    })
    .select("id, role, name")
    .single();

  if (error || !user) {
    return NextResponse.json({ error: error?.message ?? "Failed to create account" }, { status: 500 });
  }

  const secret = process.env.ADMIN_SECRET ?? "buef-fallback-secret";
  const token = createToken(user.id, user.role, secret);

  const response = NextResponse.json({ ok: true });
  const prod = process.env.NODE_ENV === "production";
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: prod,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
