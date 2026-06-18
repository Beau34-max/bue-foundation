import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_TO = process.env.SMTP_TO || "beatrice.ue@joybringerscharity.org";
const MAIL_FROM = "BUE Foundation <noreply@joybringerscharity.org>";

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

    // Save to Supabase — non-fatal
    try {
      const supabase = getSupabase();
      if (supabase) {
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
      }
    } catch (dbErr) {
      console.error("Supabase insert error (non-fatal):", dbErr);
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    if (cvFile && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({ filename: cvFile.name, content: buffer });
    }

    await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      replyTo: email,
      subject: `Job Application – ${position} – ${name}`,
      attachments,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#212121;">
          <div style="background:#4B1F6F;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h2 style="color:white;margin:0;">New Job Application</h2>
            <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;">BUE Foundation Careers</p>
          </div>
          <div style="background:#f7f7f7;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e8e8;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;font-weight:bold;width:160px;color:#4B1F6F;">Position:</td><td>${position}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Full Name:</td><td>${name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Phone:</td><td>${phone || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Experience:</td><td>${experience}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">LinkedIn:</td><td>${linkedin || "Not provided"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Heard About:</td><td>${heardAbout || "Not specified"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">CV Attached:</td><td>${cvFile && cvFile.size > 0 ? `Yes – ${cvFile.name}` : "No"}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:white;border-radius:6px;border:1px solid #e8e8e8;">
              <strong style="color:#4B1F6F;">Cover Letter:</strong>
              <p style="margin:8px 0 0;white-space:pre-wrap;line-height:1.6;">${coverLetter}</p>
            </div>
          </div>
        </div>`,
    });

    // Confirmation email to applicant — non-fatal
    try {
      await resend.emails.send({
        from: MAIL_FROM,
        to: [email],
        subject: `Application Received – ${position} | BUE Foundation`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;color:#212121;">
            <div style="background:#4B1F6F;padding:20px 24px;border-radius:8px 8px 0 0;">
              <h2 style="color:white;margin:0;">Application Received</h2>
              <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;">BUE Foundation Careers</p>
            </div>
            <div style="background:#f7f7f7;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e8e8;border-top:none;">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for applying for the <strong>${position}</strong> role at the BUE Foundation. We have received your application and will review it shortly.</p>
              <p>Our team will be in touch within <strong>7–14 working days</strong>. If you are shortlisted, we will contact you to arrange the next steps.</p>
              <p>In the meantime, feel free to explore our work at <a href="https://buef.joybringerscharity.org" style="color:#4B1F6F;">buef.joybringerscharity.org</a>.</p>
              <p style="margin-top:24px;">Warm regards,<br/><strong>BUE Foundation Team</strong><br/><span style="color:#888;font-size:13px;">The Joybringers · Afikpo-North, Ebonyi State, Nigeria</span></p>
            </div>
          </div>`,
      });
    } catch (confErr) {
      console.error("Confirmation email error (non-fatal):", confErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Apply API error:", msg);
    return NextResponse.json({ success: false, error: `Failed to send application: ${msg}` }, { status: 500 });
  }
}
