import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

// Change this to your verified sender address
const FROM_EMAIL = "WealthCoin Academy <onboarding@resend.dev>";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  const normalized = email.trim().toLowerCase();

  try {
    // 1. Save subscriber
    const { error: dbError } = await supabase
      .from("academy_subscribers")
      .upsert(
        { email: normalized, unsubscribed: false },
        { onConflict: "email" }
      );

    if (dbError) throw dbError;

    // 2. Send welcome email
    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: normalized,
      subject: "Welcome to the WealthCoin Academy",
      html: welcomeEmail(normalized),
    });

    if (emailError) throw emailError;

    return res.status(200).json({ message: "Subscribed" });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
}

function welcomeEmail(email) {
  const unsubscribeUrl = `https://officialwealthcoin.com/api/unsubscribe?email=${encodeURIComponent(email)}`;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #0a0f0a; color: #e8e8e8; border-radius: 12px;">
      <h1 style="color: #D4AF37; font-size: 22px; margin: 0 0 16px;">Welcome to the WealthCoin Academy</h1>
      <p style="line-height: 1.6;">Thank you for joining our email alerts! Every participant plays a key role in our ecosystem's growth, and we are glad to have you here.</p>
      <p style="line-height: 1.6;">We will notify you as new lessons are published. In the meantime, take the time to explore more of what we do in the <a href="https://officialwealthcoin.com/#foundation" style="color: #D4AF37;">Foundation section</a> and connect with us through our verified socials.</p>

      <blockquote style="border-left: 3px solid #D4AF37; margin: 24px 0; padding: 8px 16px; color: #c9c9c9; font-style: italic;">
        "No servant can serve two masters: for either he will hate the one and love the other, or else he will hold to the one and despise the other. Ye cannot serve God and riches."<br/>
        <span style="font-style: normal; font-size: 12px; color: #D4AF37;">— Luke 16:13 (JUB)</span>
      </blockquote>

      <p style="font-size: 12px; color: #999; line-height: 1.6; margin-top: 24px;">
        You're receiving this because you subscribed to WealthCoin Academy lesson updates.
        <br/>
        <a href="${unsubscribeUrl}" style="color: #D4AF37;">Unsubscribe</a>
      </p>
    </div>
  `;
}