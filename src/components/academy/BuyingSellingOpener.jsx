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
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
          Lessons 1–4 gave you the wallet, the system, the why, and how to transact safely.
          Now the real question: how do you actually get crypto in the first place?
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {/* Exchange door */}
          <button
            onClick={() => navigate("/academy/lesson/buying-selling-exchange")}
            className="group flex flex-col items-start rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              The Exchange Road
            </span>
            <h2 className="mt-3 font-display text-2xl text-white">
              "I'll use an exchange."
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              The easy on-ramp. You buy there, they hold the keys. Convenient —
              but you're trusting them with your assets until you send them to your wallet.


            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition group-hover:text-white">
              Explore
              <span aria-hidden="true">→</span>
            </span>
          </button>

          {/* Phantom door */}
          <button
            onClick={() => navigate("/academy/lesson/buying-selling-phantom")}
            className="group flex flex-col items-start rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              The Self-Custody Road
            </span>
            <h2 className="mt-3 font-display text-2xl text-white">
              "I'll use Phantom."
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              You hold your own keys from the start. More steps — but it ends in
              your wallet, not theirs.


            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition group-hover:text-white">
              Explore
              <span aria-hidden="true">→</span>
            </span>
          </button>

          {/* Selling door */}
          <button
            onClick={() => navigate("/academy/lesson/buying-selling-selling")}
            className="group flex flex-col items-start rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-[#D4AF37]/50 hover:bg-white/[0.06] sm:col-span-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              The Exit Road
            </span>
            <h2 className="mt-3 font-display text-2xl text-white">
              "I need to sell."
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              The flip side of the same skills — getting your money back out. Selling is
              the same process, just reversed.


            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] transition group-hover:text-white">
              Go to selling
              <span aria-hidden="true">→</span>
            </span>
          </button>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8">
          <p className="text-sm leading-7 text-white/60">
            Both roads lead to the same place — and share one truth that matters more than
            the platform you pick:{" "}
            <span className="font-semibold text-white">
              whoever holds the keys holds the assets.


            </span>
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6 text-center sm:p-8">
          <p className="font-display text-lg text-white sm:text-xl">
            "Of what good is the price to buy wisdom in the hand of a fool, when he has no heart to understand?"
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Proverbs 17:16 — JUB
          </p>
        </div>
      </div>
    </main>
  );
}
