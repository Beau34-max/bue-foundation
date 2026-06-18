import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_TO = process.env.SMTP_TO || "beatrice.ue@joybringerscharity.org";
const MAIL_FROM = "BUE Foundation <noreply@joybringerscharity.org>";

function getSubmissionType(programme: string): string {
  const p = programme.toLowerCase();
  if (p.startsWith("scholarship")) return "scholarship_application";
  if (p.startsWith("event")) return "event_registration";
  if (p.startsWith("training")) return "training_registration";
  if (p.startsWith("enterprise")) return "enterprise_application";
  return "programme_application";
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const programme = formData.get("programme") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || null;

    const fields: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (!["programme", "name", "email", "phone"].includes(key) && typeof value === "string") {
        fields[key] = value;
      }
    });

    // Save to Supabase — non-fatal
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from("submissions").insert({
          type: getSubmissionType(programme),
          name,
          email,
          phone,
          data: { programme, ...fields },
        });
      }
    } catch (dbErr) {
      console.error("Supabase insert error (non-fatal):", dbErr);
    }

    const fieldRows = Object.entries(fields)
      .map(([k, v]) =>
        `<tr><td style="padding:8px 0;font-weight:bold;width:180px;color:#4B1F6F;text-transform:capitalize;">${k.replace(/([A-Z])/g, " $1")}:</td><td>${v || "—"}</td></tr>`
      ).join("");

    await resend.emails.send({
      from: MAIL_FROM,
      to: [MAIL_TO],
      replyTo: email,
      subject: `New Application – ${programme} – ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#212121;">
          <div style="background:#4B1F6F;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h2 style="color:white;margin:0;">New Programme Application</h2>
            <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;">${programme}</p>
          </div>
          <div style="background:#f7f7f7;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e8e8;border-top:none;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;font-weight:bold;width:180px;color:#4B1F6F;">Programme:</td><td>${programme}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Full Name:</td><td>${name}</td></tr>
              <tr><td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
              ${fieldRows}
            </table>
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Programme apply error:", msg);
    return NextResponse.json({ success: false, error: `Failed to submit: ${msg}` }, { status: 500 });
  }
}
