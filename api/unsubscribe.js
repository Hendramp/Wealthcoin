import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Email required" });
  }

  const normalized = email.trim().toLowerCase();

  try {
    const { error } = await supabase
      .from("academy_subscribers")
      .update({ unsubscribed: true })
      .eq("email", normalized);

    if (error) throw error;

    return res.status(200).json({ message: "Unsubscribed" });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return res.status(500).json({ message: "Something went wrong." });
  }
}
