// api/notify-lesson.js
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

  // Simple guard so only you can trigger this
  const secret = req.headers["x-notify-secret"];
  if (secret !== process.env.NOTIFY_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Pull everyone who hasn't unsubscribed
    const { data: subscribers, error } = await supabase
      .from("academy_subscribers")
      .select("email")
      .eq("unsubscribed", false);

    if (error) throw error;

    if (!subscribers || subscribers.length === 0) {
      return res.status(200).json({ success: true, sent: 0 });
    }

    // Send to each subscriber
    let sent = 0;
    for (const sub of subscribers) {
      try {
        await transporter.sendMail({
          from: "WealthCoin Academy <officialwealthcoin@gmail.com>",
          to: sub.email,
          subject: "Lesson 2 is live — Blockchain Basics",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #333;">
              <div style="text-align: center; margin-bottom: 24px;">
                <div style="font-size: 28px; font-weight: bold; color: #D4AF37;">WEALTHCOIN</div>
                <div style="font-size: 14px; letter-spacing: 2px; color: #666;">ACADEMY</div>
              </div>

              <h2 style="color: #222;">Lesson 2 is live: Blockchain Basics</h2>

              <p>Great news — <strong>Lesson 2: Blockchain Basics</strong> is now available in the Academy.</p>

              <p>In this lesson, you'll learn what a blockchain actually is, how transactions work, and why networks and gas fees matter.</p>

              <p style="text-align: center; margin: 28px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://officialwealthcoin.com"}/academy/lesson/blockchain-basics"
                   style="background-color: #D4AF37; color: #000; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: bold; display: inline-block;">
                  Start Lesson 2 →
                </a>
              </p>

              <p style="font-style: italic; color: #555; border-left: 3px solid #D4AF37; padding-left: 16px;">
                "Moreover it is required of stewards, that a man be found faithful."<br/>
                <span style="font-style: normal; font-size: 13px; color: #888;">— 1 Corinthians 4:2 (JUB)</span>
              </p>

              <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #888;">
                You're receiving this because you subscribed to WealthCoin Academy updates.<br/>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://officialwealthcoin.com"}/api/unsubscribe?email=${encodeURIComponent(sub.email)}" style="color: #888;">Unsubscribe</a> anytime.
              </p>
            </div>
          `,
        });
        sent++;
      } catch (e) {
        console.error("Failed to send to", sub.email, e);
      }
    }

    return res.status(200).json({ success: true, sent });
  } catch (err) {
    console.error("Notify error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
