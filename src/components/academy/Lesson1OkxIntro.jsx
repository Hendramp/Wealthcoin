import React from "react";

export default function Lesson1OkxIntro({ onBack, onNext }) {
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
            Let's set up your OKX Wallet.
          </h1>
        </header>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-accent/20 bg-accent/5 p-6 sm:p-7">
            <p className="text-sm leading-7 text-secondary">
              OKX Wallet is our recommended starting wallet because it's <span className="text-white">self-custodial</span> — you hold your own keys, no KYC required, and no withdrawal holds. This is the wallet with the green logo! Have your app store opened and ready to download the OKX Wallet (Web3 Wallet) app.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              Important to know
            </p>
            <p className="mt-3 text-sm leading-7 text-secondary">
              The OKX Wallet app <span className="text-white">doesn't let you buy crypto directly inside it</span>. It's a wallet, not an exchange. To add funds, you'll send crypto to it from a centralized exchange (like Coinbase or Kraken) or from another wallet you already have.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
              Looking for other options?
            </p>
            <p className="mt-3 text-sm leading-7 text-secondary">
              More wallet guides are available in the Library.
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="mt-8 w-full rounded-full bg-accent py-3.5 font-semibold text-black transition hover:bg-accent-hover"
        >
          Continue →
        </button>
      </div>
    </main>
  );
}
