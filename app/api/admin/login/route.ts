import { NextResponse } from "next/server";
import crypto from "crypto";
import { promisify } from "util";
import { getSupabase } from "@/lib/supabase";

const pbkdf2 = promisify(crypto.pbkdf2);

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const computed = await pbkdf2(password, salt, 100000, 64, "sha256");
  return computed.toString("hex") === hash;
}

function createToken(userId: string, role: string, secret: string): string {
  const mac = crypto.createHmac("sha256", secret).update(`${userId}.${role}`).digest("hex");
  return `${userId}.${role}.${mac}`;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { data: user } = await supabase
    .from("admin_users")
    .select("id, name, role, password_hash, invite_accepted")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (!user || !user.invite_accepted || !user.password_hash) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const secret = process.env.ADMIN_SECRET ?? "buef-fallback-secret";
  const token = createToken(user.id, user.role, secret);

  const response = NextResponse.json({ ok: true, role: user.role, name: user.name });
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
