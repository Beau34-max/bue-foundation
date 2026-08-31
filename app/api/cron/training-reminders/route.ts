import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_FROM = "BUE Foundation <noreply@joybringerscharity.org>";

// September 7 2026 — start of Digital Skills-Up Programme
const START_DATE = new Date("2026-09-07T00:00:00Z");
const REMINDER_DAYS = [7, 1, 0];

function teamsBlock(): string {
  return `
    <div style="background:#ffffff;border:1px solid #e0d7f0;border-left:4px solid #4B1F6F;border-radius:8px;padding:20px;margin:20px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;font-weight:bold;color:#4B1F6F;width:160px;">Training Days:</td>
          <td style="padding:8px 0;">Monday, Thursday and Saturday</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Time:</td>
          <td style="padding:8px 0;">4:00 PM – 6:00 PM</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Mode:</td>
          <td style="padding:8px 0;">Online via Microsoft Teams</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Joining Link:</td>
          <td style="padding:8px 0;"><a href="https://teams.microsoft.com/meet/324668366130321?p=6ozMU4pt79767S8MX9" style="color:#4B1F6F;">Click here to join</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Meeting ID:</td>
          <td style="padding:8px 0;">324 668 366 130 321</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold;color:#4B1F6F;">Passcode:</td>
          <td style="padding:8px 0;font-family:monospace;font-size:15px;letter-spacing:1px;">cS26tD6z</td>
        </tr>
      </table>
    </div>`;
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = new Date(START_DATE);
  start.setUTCHours(0, 0, 0, 0);

  const daysUntil = Math.round((start.getTime() - today.getTime()) / 86_400_000);

  if (!REMINDER_DAYS.includes(daysUntil)) {
    return NextResponse.json({ success: true, skipped: true, days_until_start: daysUntil });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  const { data: registrations, error } = await supabase
    .from("submissions")
    .select("name, email")
    .eq("type", "training_registration")
    .filter("data->>programme", "ilike", "%Digital Skills%");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!registrations?.length) {
    return NextResponse.json({ success: true, sent: 0, days_until_start: daysUntil });
  }

  let subject: string;
  let headline: string;
  let body: string;

  if (daysUntil === 7) {
    subject = "Your Training Starts in 1 Week – Digital Skills-Up Programme | BUE Foundation";
    headline = "Starting in 1 Week";
    body = "We are writing to remind you that the <strong>BUE Foundation Digital Skills-Up Programme 2026</strong> begins in <strong>7 days</strong> — on Sunday, 7 September 2026. Please find your joining details below.";
  } else if (daysUntil === 1) {
    subject = "Your Training Starts Tomorrow – Digital Skills-Up Programme | BUE Foundation";
    headline = "Starting Tomorrow";
    body = "This is a reminder that the <strong>BUE Foundation Digital Skills-Up Programme 2026</strong> begins <strong>tomorrow</strong>, Sunday, 7 September 2026. Please find your joining details below and ensure you are ready to join.";
  } else {
    subject = "Training Starts Today at 4 PM – Digital Skills-Up Programme | BUE Foundation";
    headline = "Starting Today!";
    body = "Today is the day! The <strong>BUE Foundation Digital Skills-Up Programme 2026</strong> begins <strong>today at 4:00 PM</strong>. Please join the Microsoft Teams session using the details below. We encourage you to join a few minutes early.";
  }

  let sent = 0;
  const failures: string[] = [];

  for (const reg of registrations) {
    try {
      await resend.emails.send({
        from: MAIL_FROM,
        to: [reg.email],
        subject,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;color:#212121;">
            <div style="background:#4B1F6F;padding:20px 24px;border-radius:8px 8px 0 0;">
              <h2 style="color:white;margin:0;">${headline}</h2>
              <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;">BUE Foundation Digital Skills-Up Programme 2026</p>
            </div>
            <div style="background:#f7f7f7;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e8e8;border-top:none;">
              <p>Dear <strong>${reg.name}</strong>,</p>
              <p>${body}</p>
              ${teamsBlock()}
              <p>Please keep these details safe and use the same link for all scheduled sessions. We encourage you to join a few minutes before 4:00 PM.</p>
              <p>We look forward to welcoming you to the programme.</p>
              <p>Visit us at <a href="https://buef.joybringerscharity.org" style="color:#4B1F6F;">buef.joybringerscharity.org</a> to learn more about our programmes.</p>
              <p style="margin-top:24px;">Warm regards,<br/><strong>BUE Foundation Team</strong><br/><span style="color:#888;font-size:13px;">The Joybringers · Afikpo-North, Ebonyi State, Nigeria</span></p>
            </div>
          </div>`,
      });
      sent++;
    } catch (e) {
      failures.push(`${reg.email}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  console.log(`[cron] training-reminders: ${sent}/${registrations.length} sent (T-${daysUntil} days)`, failures);

  return NextResponse.json({
    success: true,
    days_until_start: daysUntil,
    sent,
    total: registrations.length,
    failures,
  });
}
