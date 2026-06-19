import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_FROM = "BUE Foundation <noreply@joybringerscharity.org>";

export async function POST(request: NextRequest) {
  try {
    const { name, email, amount, currency } = await request.json();

    const symbol =
      currency === "GBP" ? "£" : currency === "EUR" ? "€" : currency === "NGN" ? "₦" : "$";

    await resend.emails.send({
      from: MAIL_FROM,
      to: [email],
      subject: `Thank You for Your Donation | BUE Foundation`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;color:#212121;">
          <div style="background:#4B1F6F;padding:20px 24px;border-radius:8px 8px 0 0;">
            <h2 style="color:white;margin:0;">Thank You for Your Donation</h2>
            <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;">BUE Foundation – The Joybringers</p>
          </div>
          <div style="background:#f7f7f7;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e8e8e8;border-top:none;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you so much for your generous donation of <strong>${symbol}${amount}</strong> to the BUE Foundation.</p>
            <p>Your contribution goes directly towards our programmes — funding scholarships, supporting families in need, providing shelter, and delivering skills training to young people across Nigeria.</p>
            <p>You are now part of the Joybringers family, and your generosity is already making a real difference in people's lives.</p>
            <p>If you have any questions about your donation or would like to discuss other ways to support us, please don't hesitate to get in touch.</p>
            <p style="margin-top:24px;">With sincere gratitude,<br/><strong>Beatrice Uchenna Egwu (Aunty Chy)</strong><br/><span style="color:#888;font-size:13px;">Founder &amp; CEO · BUE Foundation – The Joybringers</span><br/><span style="color:#888;font-size:13px;">Afikpo-North, Ebonyi State, Nigeria</span></p>
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Donate confirm error (non-fatal):", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
