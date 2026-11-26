import React from "react";
import { Link } from "react-router-dom";

export default function Lesson1Fork({ onNoWallet, onHasWallet }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Link to="/academy" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]">
          <span aria-hidden="true">←</span>
          Back to Academy
        </Link>

        <header className="mt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Lesson 1 · Wallet Safety & Creation
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
            Where are you starting from?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            We'll guide you based on where you are today. Both paths lead to the same place — understanding how to protect what you're entrusted with.
          </p>
        </header>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <button
            onClick={onNoWallet}
            className="group rounded-3xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-8 text-left transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              I don't have a wallet
            </p>
            <h2 className="mt-3 font-display text-xl text-white">
              Let's create one together
            </h2>
            <p className="mt-2 text-sm leading-7 text-white/60">
              We'll walk you through setting up your first wallet, step by step, from scratch.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-[#D4AF37] group-hover:underline">
              Start here →
            </span>
          </button>

          <button
            onClick={onHasWallet}
            className="group rounded-3xl border border-white/10 bg-white/5 p-8 text-left transition hover:border-white/30 hover:bg-white/[0.06]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              I already have a wallet
            </p>
            <h2 className="mt-3 font-display text-xl text-white">
              Let's make sure it's secure
            </h2>
            <p className="mt-2 text-sm leading-7 text-white/60">
              We'll review the habits that keep your wallet and your assets safe.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-white/50">
              Start here →
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
