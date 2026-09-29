// src/pages/academy/BuyingSellingOpener.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BuyingSellingOpener() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          to="/academy"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]"
        >
          <span aria-hidden="true">←</span>
          Back to Academy
        </Link>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
          Lesson 5 · Buying &amp; Selling
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          Where Does the Money Come From?
        </h1>
        <p className="mt-4 text-base leading-7 text-white/60">
          Lessons 1–4 gave you the wallet, the system, the why, and how to
          transact safely. Now the real question: how do you actually get crypto
          in the first place? There are two main roads — pick the one that fits
          how you want to do things.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {/* Exchange door */}
          <button
            onClick={() => navigate("/academy/lesson/buying-selling/exchange")}
            className="group flex flex-col items-start rounded-3xl border border-white/10 bg-white/5 p-7 text-left transition hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              The Exchange Road
            </span>
            <h2 className="mt-3 font-display text-2xl text-white">
              "I'll use an exchange."
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              The easy on-ramp. Coinbase, Kraken, Robinhood, SoFi — you buy
              there, and they hold the keys for you. Convenient, but you're
              trusting them with your assets. We go deep on how it works, the
              real costs, and the ownership tradeoff.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition group-hover:text-white">
              Explore the exchange road
              <span aria-hidden="true">→</span>
            </span>
          </button>

          {/* Phantom door */}
          <button
            onClick={() => navigate("/academy/lesson/buying-selling/phantom")}
            className="group flex flex-col items-start rounded-3xl border border-white/10 bg-white/5 p-7 text-left transition hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              The Self-Custody Road
            </span>
            <h2 className="mt-3 font-display text-2xl text-white">
              "I'll use Phantom."
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              You hold your own keys from the start. Buy with a card or Apple
              Pay, it lands as CASH on Solana, then you send and bridge to
              wherever you need. More steps — but it ends in your wallet, not
              theirs.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition group-hover:text-white">
              Explore the Phantom road
              <span aria-hidden="true">→</span>
            </span>
          </button>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
          <p className="text-sm leading-7 text-white/60">
            Both roads lead to the same place — the technical core, where we
            break down what swaps, bridges, and networks actually do. And both
            share one truth that matters more than the platform you pick:{" "}
            <span className="font-semibold text-white">
              whoever holds the keys holds the assets.
            </span>
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6 text-center sm:p-8">
          <p className="font-display text-lg text-white sm:text-xl">
            "A prudent man foreseeth the evil, and hideth himself: but the
            simple pass on, and are punished."
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Proverbs 22:3 — JUB
          </p>
        </div>
      </div>
    </main>
  );
}
