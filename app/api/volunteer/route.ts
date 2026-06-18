import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_TO = process.env.SMTP_TO || "beatrice.ue@joybringerscharity.org";
const MAIL_FROM = "BUE Foundation <noreply@joybringerscharity.org>";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, state, lga, role, availability, message } = body;

    // Save to Supabase — non-fatal
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("submissions").insert({
          type: "volunteer_application",
          name,
          email,
          phone: phone || null,
          data: { address: address || null, state: state || null, lga: lga || null, role, availability: availability || null, message: message || null },
        });
      }
    } catch (dbErr) {
      console.error("Supabase insert error (non-fatal):", dbErr);
    }

    await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      replyTo: email,
      subject: `Volunteer Application – ${role} – ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#212121;">
          <div style="background:#4B1F6F;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h2 style="color:white;margin:0;">New Volunteer Application</h2>
          </div>
          <div style="background:#f7f7f7;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e8e8;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;font-weight:bold;width:140px;color:#4B1F6F;">Name:</td><td>${name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Phone:</td><td>${phone || "Not provided"}</td></tr>
              ${address ? `<tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Address:</td><td>${address}</td></tr>` : ""}
              ${state ? `<tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">State/LGA:</td><td>${state}${lga ? ` – ${lga}` : ""}</td></tr>` : ""}
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Role:</td><td>${role}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Availability:</td><td>${availability || "Not specified"}</td></tr>
            </table>
            ${message ? `<div style="margin-top:16px;padding:16px;background:white;border-radius:6px;border:1px solid #e8e8e8;"><strong style="color:#4B1F6F;">Motivation:</strong><p style="margin:8px 0 0;white-space:pre-wrap;line-height:1.6;">${message}</p></div>` : ""}
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Volunteer API error:", msg);
    return NextResponse.json({ success: false, error: `Failed to submit application: ${msg}` }, { status: 500 });
  }
}
