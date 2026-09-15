import React from "react";

export default function Lesson1OkxIntro({ onBack, onNext }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]">
          <span aria-hidden="true">←</span>
          Back
        </button>

        <header className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Lesson 1 · Wallet Safety & Creation
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
            Let's set up your OKX Wallet, this is the wallet with the green logo!
          </h1>
        </header>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6 sm:p-7">
            <p className="text-sm leading-7 text-white/70">
              OKX Wallet is our recommended starting wallet because it's <span className="text-white">self-custodial</span> — you hold your own keys, no KYC required, and no withdrawal holds. 
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Important to know
            </p>
            <p className="mt-3 text-sm leading-7 text-white/70">
              The OKX Wallet app <span className="text-white">doesn't let you buy crypto directly inside it</span>. It's a wallet, not an exchange. To add funds, you'll send crypto to it from a centralized exchange (like Coinbase or Kraken) or from another wallet you already have.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              Looking for other options?
            </p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              More wallet guides are available in the Library.
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="mt-8 w-full rounded-full bg-[#D4AF37] py-3.5 font-semibold text-black transition hover:bg-[#e0c04d]"
        >
          Continue →
        </button>
      </div>
    </main>
  );
}
