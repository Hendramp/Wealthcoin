// src/components/academy/EmailGateModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "wtc_academy_email";

export default function EmailGateModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email to continue.");
      return;
    }
    if (!isValidEmail(trimmed)) {
      setError("That doesn't look like a valid email. Mind double-checking?");
      return;
    }

    setError("");
    setSaving(true);

    try {
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
      } catch (err) {
        console.error("Subscribe call failed:", err);
      }

      localStorage.setItem(STORAGE_KEY, trimmed);
      navigate("/academy/blockchain-basics");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0f0b] p-6 text-white shadow-2xl sm:p-8">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-white/40 transition hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        )}

        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
          WealthCoin Academy
        </p>
        <h2 className="mt-2 font-display text-2xl text-white">
          Unlock Lesson 2
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/60">
          Enter your email to continue learning to steward your digital assets
          responsibly. It's free — we'll just keep you in the loop as new lessons
          drop.
        </p>
        <p className="mt-2 text-xs leading-6 text-white/40">
          Already signed up? Feel free to use the same email on any device — it'll
          just unlock right away.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#D4AF37]/60"
          />
          {error && (
            <p className="text-sm leading-6 text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-2xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-black transition hover:bg-[#e6c55a] disabled:opacity-60"
          >
            {saving ? "Unlocking…" : "Unlock Lesson 2 →"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs leading-5 text-white/40">
          We'll only email you about new Academy lessons. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
