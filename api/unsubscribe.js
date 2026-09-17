import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // GET = unsubscribe (the email link lands here)
  if (req.method === "GET") {
    try {
      const { error } = await supabase
        .from("academy_subscribers")
        .update({ unsubscribed: true });

      if (error) throw error;

      res.setHeader("Content-Type", "text/html");
      return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Unsubscribed — WealthCoin Academy</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #030604; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1rem; }
              .card { background: #0a0f0b; border: 1px solid rgba(212,175,55,0.25); border-radius: 16px; padding: 2.5rem; max-width: 420px; width: 100%; text-align: center; }
              h1 { font-size: 1.4rem; margin: 0 0 0.5rem; color: #D4AF37; }
              p { color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.5; margin:  ​0 1.5rem; }
              button { background: #D4AF37; color: #000; border: none; border-radius: 10px; padding: 0.8rem 1.5rem; font-size: 1rem; font-weight: 600; cursor: pointer; }
              button:hover { background: #e8c65a; }
              .done { display: none; color: #4ade80; font-size: 0.95rem; margin-top: 1rem; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>You're unsubscribed</h1>
              <p>You won't receive new WealthCoin Academy lesson notifications. If this was a mistake, you can resubscribe anytime.</p>
              <button id="resub">Resubscribe</button>
              <p class="done" id="done">You're back on the list. Welcome back! 🎉</p>
            </div>
            <script>
              document.getElementById("resub").addEventListener("click", async () => {
                const res = await fetch("/api/unsubscribe", {
                  method: "POST",
                });
                if (res.ok) {
                  document.getElementById("resub").style.display = "none";
                  document.getElementById("done").style.display = "block";
                }
              });
            </script>
          </body>
        </html>
      `);
    } catch (err) {
      console.error("Unsubscribe error:", err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  // POST = resubscribe (the button on the page)
  if (req.method === "POST") {
    try {
      const { error } = await supabase
        .from("academy_subscribers")
        .update({ unsubscribed: false });

      if (error) throw error;

      return res.status(200).json({ message: "Resubscribed" });
    } catch (err) {
      console.error("Resubscribe error:", err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
