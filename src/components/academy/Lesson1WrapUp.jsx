import React, { useState } from "react";

const SUBSCRIBE_ENDPOINT = "/api/subscribe"; // ← point this at your backend

export default function Lesson1WrapUp({ onBack, onComplete }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!consent) {
      setError("Please agree to receive lesson updates.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(SUBSCRIBE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      console.error("Subscribe failed:", err);
      setStatus("error");
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]">
          <span aria-hidden="true">←</span>
          Back
        </button>

        <header className="mt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Lesson 1 · Wallet Safety & Creation
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
            You're Set Up & Secure
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            Whether you created a wallet or brought your own, you now know how to protect what's been entrusted to you.
          </p>
        </header>

        {/* Recap */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
          <h2 className="font-display text-lg text-white">What you learned</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-white/70">
            <li>• What a wallet is and why self-custody matters</li>
            <li>• How a centralized exchange differs from owning your own wallet</li>
            <li>• How to create a wallet — or confirm your existing one is set up right</li>
            <li>• How to protect your recovery phrase — the most important habit in crypto</li>
          </ul>
        </div>

        {/* Stewardship callout */}
        <div className="mt-6 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-6 text-center sm:p-8">
          <p className="text-sm italic leading-8 text-white/80">
            "Moreover it is required of stewards, that a man be found faithful."
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            1 Corinthians 4:2 — JUB
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/60">
            Stewardship begins with wisdom. What you've learned today is the foundation for everything ahead.
          </p>
        </div>

        {/* Email gate — announcement subscription */}
        {status !== "success" ? (
          <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">Get Notified When Lesson 2 Drops</h2>
            <p className="mt-2 text-sm leading-7 text-white/60">
              Lesson 2 — Blockchain Basics — is in the works. Leave your email and we'll
              let you know the moment it's live. You can unsubscribe anytime.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-full bg-[#D4AF37] px-8 py-3.5 font-semibold text-black transition hover:bg-[#e0c04d] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Subscribing…" : "Notify Me →"}
              </button>
            </div>

            {/* Consent checkbox */}
            <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-white/50">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#D4AF37]"
              />
              <span>
                Yes, email me when new WealthCoin Academy lessons are released.
                You can unsubscribe at any time.
              </span>
            </label>

            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
          </form>
        ) : (
          <div className="mt-8 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-6 text-center sm:p-8">
            <p className="font-display text-xl text-white">You're on the list 🎉</p>
            <p className="mt-2 text-sm leading-7 text-white/60">
              We'll email you the moment Lesson 2 — Blockchain Basics — goes live.
              Keep an eye on your inbox.
            </p>
            <p className="mt-4 text-xs text-white/40">
              You can unsubscribe anytime using the link in any email we send.
            </p>
            <button
              onClick={onComplete}
              className="mt-6 rounded-full bg-[#D4AF37] px-8 py-3.5 font-semibold text-black transition hover:bg-[#e0c04d]"
            >
              Back to Academy →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
