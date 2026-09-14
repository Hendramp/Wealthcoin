import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "officialwealthcoin@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Valid email required" });
    }

    // Save subscriber to Supabase
    const { error: supabaseError } = await supabase
      .from("academy_subscribers")
      .upsert({ email, unsubscribed: false }, { onConflict: "email" });

    if (supabaseError) throw supabaseError;

    // Send welcome email
    await transporter.sendMail({
      from: "WealthCoin Academy <officialwealthcoin@gmail.com>",
      to: email,
      subject: "Welcome to WealthCoin Academy",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #333;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="font-size: 28px; font-weight: bold; color: #D4AF37;">WEALTHCOIN</div>
            <div style="font-size: 14px; letter-spacing: 2px; color: #666;">ACADEMY</div>
          </div>

          <h2 style="color: #222;">Welcome to the WealthCoin Academy!</h2>

          <p>Thank you for joining the WealthCoin Academy community. We're glad you're here.</p>

          <p>You'll be the first to know when new lessons drop — starting with <strong>Lesson 2: Blockchain Basics</strong>.</p>

          <p style="margin-top: 24px; font-style: italic; color: #555; border-left: 3px solid #D4AF37; padding-left: 16px;">
            "No servant can serve two masters... Ye cannot serve God and mammon."<br/>
            <span style="font-style: normal; font-size: 13px; color: #888;">— Luke 16:13 (JUB)</span>
          </p>

          <p style="margin-top: 24px;">We believe blockchain technology should be used as a tool for responsible stewardship — and we're building education to help you do exactly that.</p>

          <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #888;">
            You're receiving this because you subscribed to WealthCoin Academy updates.<br/>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://officialwealthcoin.com"}/api/unsubscribe?email=${encodeURIComponent(email)}" style="color: #888;">Unsubscribe</a> anytime.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
