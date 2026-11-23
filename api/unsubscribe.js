import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidToken(token) {
  return typeof token === "string" && UUID_PATTERN.test(token);
}

function sendHtmlError(res, status, title, message) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(status).send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} — WealthCoin Academy</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #030604; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1rem; }
          .card { background: #0a0f0b; border: 1px solid rgba(212,175,55,0.25); border-radius: 16px; padding: 2rem; max-width: 420px; width: 100%; text-align: center; }
          h1 { font-size: 1.4rem; margin: 0 0 0.5rem; color: #D4AF37; }
          p { color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.5; margin: 0 0 1.5rem; }
        </style>
      </head>
      <body><div class="card"><h1>${title}</h1><p>${message}</p></div></body>
    </html>`);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "GET") {
    const token = req.query?.token;
    if (!isValidToken(token)) {
      return sendHtmlError(
        res,
        400,
        "Invalid unsubscribe link",
        "This unsubscribe link is invalid or expired."
      );
    }

    try {
      const { data, error } = await supabase
        .from("academy_subscribers")
        .update({ unsubscribed: true })
        .eq("token", token)
        .select("id");

      if (error) throw error;
      if (!data || data.length === 0) {
        return sendHtmlError(
          res,
          404,
          "Invalid unsubscribe link",
          "This unsubscribe link is invalid or expired."
        );
      }

      res.setHeader("Content-Type", "text/html; charset=utf-8");
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
              p { color: rgba(255,255,255,0.7); font-size: 0.95rem; line-height: 1.5; margin: 0 0 1.5rem; }
              button { background: #D4AF37; color: #000; border: none; border-radius: 10px; padding: 0.8rem 1.5rem; min-height: 44px; font-size: 1rem; font-weight: 600; cursor: pointer; }
              button:hover { background: #e8c65a; }
              .done { display: none; color: #4ade80; font-size: 0.95rem; margin-top: 1rem; }
              .error { display: none; color: #f87171; font-size: 0.95rem; margin-top: 1rem; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>You're unsubscribed</h1>
              <p>You won't receive new WealthCoin Academy lesson notifications. If this was a mistake, you can resubscribe anytime.</p>
              <button id="resub" data-token="${token}">Resubscribe</button>
              <p class="done" id="done">You're back on the list. Welcome back! 🎉</p>
              <p class="error" id="resub-error">We couldn't resubscribe. Please try again.</p>
            </div>
            <script>
              document.getElementById("resub").addEventListener("click", async (event) => {
                const button = event.currentTarget;
                const errorMessage = document.getElementById("resub-error");
                errorMessage.style.display = "none";
                try {
                  const response = await fetch("/api/unsubscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: button.dataset.token }),
                  });
                  if (!response.ok) {
                    errorMessage.style.display = "block";
                    return;
                  }
                  button.style.display = "none";
                  document.getElementById("done").style.display = "block";
                } catch {
                  errorMessage.style.display = "block";
                }
              });
            </script>
          </body>
        </html>
      `);
    } catch (err) {
      console.error("Unsubscribe error:", err);
      return sendHtmlError(
        res,
        500,
        "Something went wrong",
        "Please try again later."
      );
    }
  }

  if (req.method === "POST") {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ message: "A valid token is required." });
      }
    }
    const token = body?.token;
    if (!isValidToken(token)) {
      return res.status(400).json({ message: "A valid token is required." });
    }

    try {
      const { data, error } = await supabase
        .from("academy_subscribers")
        .update({ unsubscribed: false })
        .eq("token", token)
        .select("id");

      if (error) throw error;
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "This resubscribe link is invalid or expired." });
      }

      return res.status(200).json({ message: "Resubscribed" });
    } catch (err) {
      console.error("Resubscribe error:", err);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
