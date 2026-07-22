import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  if (request.headers.get("x-admin-role") !== "super_admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, email, role } = await request.json();
  if (!name || !email || !role) {
    return NextResponse.json({ error: "Name, email and role are required" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const invite_token = crypto.randomUUID();
  const invite_expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const { error } = await supabase
    .from("admin_users")
    .upsert(
      {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        role,
        invite_token,
        invite_expires,
        invite_accepted: false,
        password_hash: null,
      },
      { onConflict: "email" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buef.joybringerscharity.org";
    const inviteUrl = `${siteUrl}/admin/accept-invite?token=${invite_token}`;
    const roleLabel = role === "super_admin" ? "Super Admin" : "Editor";

    await resend.emails.send({
      from: "BUE Foundation <noreply@joybringerscharity.org>",
      to: email,
      subject: `You've been invited to BUE Foundation Admin`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;">
          <div style="margin-bottom:24px;">
            <span style="background:#4B1F6F;color:white;font-weight:bold;padding:6px 14px;border-radius:6px;font-size:13px;">BUE Foundation</span>
          </div>
          <h2 style="color:#212121;margin-bottom:8px;">You've been invited</h2>
          <p style="color:#555;margin-bottom:8px;">Hello <strong>${name}</strong>,</p>
          <p style="color:#555;margin-bottom:24px;">
            You've been invited to join the BUE Foundation admin panel as an <strong>${roleLabel}</strong>.
            Click the button below to set your password and activate your account.
          </p>
          <a href="${inviteUrl}" style="display:inline-block;background:#4B1F6F;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">
            Accept Invitation
          </a>
          <p style="color:#999;font-size:12px;margin-top:32px;">This link expires in 7 days. If you weren't expecting this, ignore this email.</p>
        </div>
      `,
    });
  } catch {
    // Email failure is non-fatal — user record is already created
  }

  return NextResponse.json({ ok: true });
}
