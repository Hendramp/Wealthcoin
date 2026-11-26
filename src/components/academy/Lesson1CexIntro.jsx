import React from "react";

export default function Lesson1CexIntro({ onBack, onNext }) {
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
            Where will you buy crypto?
          </h1>
        </header>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">What is a centralized exchange?</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              A centralized exchange (CEX) is a platform where you buy and sell crypto — like Coinbase or Kraken. It's the easiest way to get your first crypto, but there's an important catch.
            </p>
          </div>

          <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">The key thing to understand</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              <span className="text-white">A centralized exchange does not give you direct ownership of your digital assets.</span> The exchange holds them for you. That's why it's recommended to transfer your crypto to your own wallet, where you hold the keys.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">Our recommendation: Kraken</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              We recommend <span className="text-white">Kraken</span> because they offer great support. Note that they require ID verification to use their service.
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="mt-8 w-full rounded-full bg-[#D4AF37] py-3.5 font-semibold text-black transition hover:bg-[#e0c04d]"
        >
          Continue to wallet setup →
        </button>
      </div>
    </main>
  );
}
