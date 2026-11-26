import React from "react";

export default function Lesson1CexIntro({ onBack, onNext }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-base px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-ambient" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-secondary transition hover:text-accent">
          <span aria-hidden="true">←</span>
          Back
        </button>

        <header className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Lesson 1 · Wallet Safety & Creation
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
            Where will you buy crypto?
          </h1>
        </header>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">What is a centralized exchange?</h2>
            <p className="mt-3 text-sm leading-7 text-secondary">
              A centralized exchange (CEX) is a platform where you buy and sell crypto — like Coinbase or Kraken. It's the easiest way to get your first crypto, but there's an important catch.
            </p>
          </div>

          <div className="rounded-3xl border border-accent/20 bg-accent/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">The key thing to understand</h2>
            <p className="mt-3 text-sm leading-7 text-secondary">
              <span className="text-white">A centralized exchange does not give you direct ownership of your digital assets.</span> The exchange holds them for you. That's why it's recommended to transfer your crypto to your own wallet, where you hold the keys.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">Our recommendation: Kraken</h2>
            <p className="mt-3 text-sm leading-7 text-secondary">
              We recommend <span className="text-white">Kraken</span> because they offer great support. Note that they require ID verification to use their service.
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="mt-8 w-full rounded-full bg-accent py-3.5 font-semibold text-black transition hover:bg-accent-hover"
        >
          Continue to wallet setup →
        </button>
      </div>
    </main>
  );
}
