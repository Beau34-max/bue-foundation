import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const experience = formData.get("experience") as string;
    const linkedin = formData.get("linkedin") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const heardAbout = formData.get("heardAbout") as string;
    const cvFile = formData.get("cv") as File | null;

    // Save to Supabase (CV file goes to email; we store the filename)
    await supabase.from("submissions").insert({
      type: "career_application",
      name,
      email,
      phone,
      data: {
        position,
        experience,
        linkedin: linkedin || null,
        cover_letter: coverLetter,
        heard_about: heardAbout || null,
        cv_filename: cvFile && cvFile.size > 0 ? cvFile.name : null,
      },
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

    const attachments: nodemailer.SendMailOptions["attachments"] = [];
    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({
        filename: cvFile.name,
        content: buffer,
        contentType: cvFile.type,
      });
    }

    await transporter.sendMail({
      from: `"BUE Foundation Website" <${process.env.SMTP_USER || "info@buef.onmicrosoft.com"}>`,
      to: "info@buef.onmicrosoft.com",
      replyTo: email,
      subject: `Job Application – ${position} – ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #212121;">
          <div style="background: #4B1F6F; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Job Application</h2>
            <p style="color: rgba(255,255,255,0.75); margin: 4px 0 0;">BUE Foundation Careers</p>
          </div>
          <div style="background: #f7f7f7; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e8e8e8; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 160px; color: #4B1F6F;">Position Applied:</td><td style="padding: 8px 0;">${position}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #4B1F6F;">Full Name:</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #4B1F6F;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #4B1F6F;">Phone:</td><td style="padding: 8px 0;">${phone || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #4B1F6F;">Experience:</td><td style="padding: 8px 0;">${experience}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #4B1F6F;">LinkedIn:</td><td style="padding: 8px 0;">${linkedin || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #4B1F6F;">Heard About:</td><td style="padding: 8px 0;">${heardAbout || "Not specified"}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; color: #4B1F6F;">CV Attached:</td><td style="padding: 8px 0;">${cvFile && cvFile.size > 0 ? `Yes – ${cvFile.name}` : "No CV uploaded"}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 6px; border: 1px solid #e8e8e8;">
              <strong style="color: #4B1F6F;">Cover Letter / Motivation Statement:</strong>
              <p style="margin: 8px 0 0; white-space: pre-wrap; line-height: 1.6;">${coverLetter}</p>
            </div>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 16px; text-align: center;">
            This email was sent from the BUE Foundation website careers form.
          </p>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send application. Please try again." },
      { status: 500 }
    );
  }
}
