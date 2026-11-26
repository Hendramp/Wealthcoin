// src/components/academy/Lesson1WrapUp.jsx
import React, { useState } from "react";
import EmailGateModal from "./EmailGateModal";

const STORAGE_KEY = "wtc_academy_email";

export default function Lesson1WrapUp({ onBack, onComplete }) {
  const [showGate, setShowGate] = useState(false);
  const alreadyUnlocked = typeof window !== "undefined" && !!localStorage.getItem(STORAGE_KEY);

  const handleUnlock = () => {
    if (alreadyUnlocked) {
      onComplete();
    } else {
      setShowGate(true);
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

        {/* Unlock Lesson 2 */}
        <div className="mt-8 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-6 text-center sm:p-8">
          <h2 className="font-display text-xl text-white">Ready for Lesson 2?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-white/60">
            Blockchain Basics — how transactions work, what networks and gas fees are, and why it all matters. Unlock it free.
          </p>
          <button
            onClick={handleUnlock}
            className="mt-6 rounded-full bg-[#D4AF37] px-8 py-3.5 font-semibold text-black transition hover:bg-[#e0c04d]"
          >
            Unlock Lesson 2 →
          </button>
        </div>
      </div>

      {showGate && <EmailGateModal onClose={() => setShowGate(false)} />}
    </main>
  );
}
