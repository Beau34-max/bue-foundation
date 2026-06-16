import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, availability, message } = body;

    // Save to Supabase
    await supabase.from("submissions").insert({
      type: "volunteer_application",
      name,
      email,
      phone: phone || null,
      data: { role, availability: availability || null, message: message || null },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.office365.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "info@buef.onmicrosoft.com",
        pass: process.env.SMTP_PASS,
      },
      tls: { ciphers: "SSLv3" },
    });

    await transporter.sendMail({
      from: `"BUE Foundation Website" <${process.env.SMTP_USER || "info@buef.onmicrosoft.com"}>`,
      to: "info@buef.onmicrosoft.com",
      replyTo: email,
      subject: `Volunteer Application – ${role} – ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#212121;">
          <div style="background:#4B1F6F;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h2 style="color:white;margin:0;">New Volunteer Application</h2>
            <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;">BUE Foundation Volunteering</p>
          </div>
          <div style="background:#f7f7f7;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e8e8;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;font-weight:bold;width:140px;color:#4B1F6F;">Name:</td><td style="padding:8px 0;">${name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Email:</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Phone:</td><td style="padding:8px 0;">${phone || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Role Chosen:</td><td style="padding:8px 0;">${role}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Availability:</td><td style="padding:8px 0;">${availability || "Not specified"}</td></tr>
            </table>
            ${message ? `<div style="margin-top:16px;padding:16px;background:white;border-radius:6px;border:1px solid #e8e8e8;"><strong style="color:#4B1F6F;">Motivation:</strong><p style="margin:8px 0 0;white-space:pre-wrap;line-height:1.6;">${message}</p></div>` : ""}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Volunteer API error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit application." }, { status: 500 });
  }
}
