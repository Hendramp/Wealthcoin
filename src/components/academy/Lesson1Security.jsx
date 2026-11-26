import React from "react";

export default function Lesson1Security({ onBack }) {
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
            Secure Your Seed Phrase
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-secondary sm:text-base">
            This is where we'll ensure you've secured your seed phrase carefully. This is the most important step in all of crypto.
          </p>
        </header>

        <div className="mt-8 space-y-4">
          <div className="rounded-3xl border border-accent/20 bg-accent/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">Why your seed phrase matters</h2>
            <p className="mt-3 text-sm leading-7 text-secondary">
              Your seed phrase is the master key to your wallet. Anyone who has it can access your assets — forever. Lose it, and no one can recover your wallet for you.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="font-display text-lg text-white">The rules of seed phrase safety</h2>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-secondary">
              <li>• Write it down on paper — never store it digitally (no screenshots, no notes apps).</li>
              <li>• Keep it offline, in a safe place only you can access.</li>
              <li>• Never share it with anyone — not even "support" or "official" messages.</li>
              <li>• Never enter it into any website or app that asks for it.</li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => {}}
          className="mt-8 w-full rounded-full bg-accent py-3.5 font-semibold text-black transition hover:bg-accent-hover"
        >
          Continue →
        </button>
      </div>
    </main>
  );
}
