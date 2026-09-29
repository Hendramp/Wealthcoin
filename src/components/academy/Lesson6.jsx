// src/pages/academy/Lesson6.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Section({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/5"
      >
        <span className="font-display text-lg text-white sm:text-xl">{title}</span>
        <span
          className={`shrink-0 text-[#D4AF37] transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 4v12M4 10h12" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="border-t border-white/10 px-6 py-6">
          <div className="space-y-4 text-base leading-8 text-white/70">{children}</div>
        </div>
      )}
    </div>
  );
}

export default function Lesson6() {
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
          Lesson 6 · Crypto, the Big Picture
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          Know What You're Holding
        </h1>
        <p className="mt-4 text-base leading-7 text-white/60">
          There are countless coins out there — more than anyone can track. Some
          built for real reasons, some for no reason at all, some straight-up
          traps. That's why this lesson exists: know what you're putting your
          money into. Tap a section to learn it — go at your own pace.
        </p>

        <div className="mt-8 space-y-4">
          <Section title="What is a stablecoin?">
            <p>
              <strong className="text-white">
                A stablecoin is a crypto that holds a steady value — a "digital
                dollar."
              </strong>{" "}
              Instead of the price swinging wildly, it stays pegged to a real
              currency, usually the US dollar. One USDC is meant to be worth $1,
              today, tomorrow, next week. That stability is the whole point.{" "}
            </p>
            <p>
              <strong className="text-white">
                The big ones you'll actually see in the wild: USDC, USDT, and DAI.
              </strong>{" "}
              USDC and USDT are the two everyone actually uses. DAI is the interesting
              one — we'll get to why in a second.{" "}
            </p>
            <p>
              <strong className="text-white">
                And it's not just dollars.

              </strong>{" "}
              There are euro stablecoins, Swiss franc ones — every major fiat
              currency is getting a digital version. The dollar's just the most
              famous. Wherever there's a currency, there's a stablecoin for it.{" "}
            </p>
          </Section>

          <Section title="How exactly do they keep their same value?">
            <p>
              <strong className="text-white">
                There's more than one way to build a stablecoin — and the design
                matters.{" "}
              </strong>{" "}
              This is the part worth understanding before you trust one with real
              money.{" "}
            </p>
            <p>
              <strong className="text-white">
                Fiat-backed (USDC, USDT) — real dollars in reserves.
              </strong>{" "}
              You give them $1, they hold $1 in a vault, and they give you 1
              coin. Simple, 1:1, most trusted. The dollar's actually there,
              somewhere, backing it.{" "}
            </p>
            <p>
              <strong className="text-white">
                Crypto-collateralized (DAI) — locked crypto backing it.
              </strong>{" "}
              DAI is pegged to the dollar too, but there's no bank holding dollars.
              Instead, it locks up crypto (like Ethereum) as collateral, and DAI is
              minted against it — over-collateralized, so there's more locked up than
              what's issued. If the collateral drops, more gets locked to keep it safe.

              No bank involved — the backing is other crypto. That's a genuinely
              different design.{" "}
            </p>
            <p>
              <strong className="text-white">
                Algorithmic (the risky ones) — no real backing at all.
              </strong>{" "}
              Code tries to hold the peg, with nothing solid behind it. This is
              where people got badly burned — the Terra/LUNA collapse wiped out
              billions. Know which kind you're holding before you trust it with real
              money.{" "}
            </p>
          </Section>

          <Section title="How are they useful day to day?">
            <p>
              <strong className="text-white">
                This is the everyday-use story — and it's why businesses care.
              </strong>{" "}
              A business can accept USDC and not worry about the price swinging
              overnight. It's a digital dollar. No volatility, it settles fast, and it
              costs a fraction of card processing. More of every sale stays with
              you.{" "}
            </p>
            <p>
              <strong className="text-white">
                The mental model: volatile assets are what you might hold; stablecoins
                are what you use.
              </strong>{" "}
              Two different jobs. Stablecoins are the workhorse — the currency, not
              the gamble. You don't speculate on them; you transact with them.{" "}
            </p>
          </Section>

          <Section title="The Volatile Assets">
            <p>
              <strong className="text-white">
                Now the other side: assets whose price actually moves. Each one was
                built for a reason — tap through and learn what that reason is.
              </strong>{" "}
            </p>

            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-lg text-[#D4AF37]">Bitcoin — The First</p>
                <p className="mt-2 text-white/70">
                  Launched in 2009, right after the global financial crisis — a
                  direct response to banks failing. It's capped at 21 million,
                  forever. Value comes from supply and demand — no CEO, no company,
                  just scarcity and network effect. The first block even carries a
                  headline from the Times:"Chancellor on brink of second bailout for
                  banks." — a permanent reminder of why it exists.{" "}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-lg text-[#D4AF37]">Ethereum — The World Computer</p>
                <p className="mt-2 text-white/70">
                  The first altcoin that mattered. Bitcoin is money; Ethereum runs
                  programs — smart contracts, code that executes automatically on the
                  blockchain. That one idea unlocked DeFi, NFTs, DAOs, everything. It's
                  not "Bitcoin but better" — it's a different tool: a world computer
                  instead of a ledger.{" "}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-lg text-[#D4AF37]">Zcash — Privacy</p>
                <p className="mt-2 text-white/70">
                  Bitcoin's ledger is public for everyone to see. Zcash uses
                  cryptography to let you prove a transaction is valid *without*
                  revealing who sent what to whom. Built for people who want financial
                  privacy by default.{" "}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-lg text-[#D4AF37]">Polygon — Speed and Cost</p>
                <p className="mt-2 text-white/70">
                  Ethereum works, but it's slow and expensive when busy. Polygon
                  runs alongside it, cheap and fast. That's why WealthCoin's built
                  here — everyday transactions need low fees to actually work.{" "}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-lg text-[#D4AF37]">Solana — Speed at Scale</p>
                <p className="mt-2 text-white/70">
                  Thousands of transactions per second, fractions of a cent. Great
                  for high-frequency trading, NFTs,and yes — memecoins —because when
                  a coin costs a fraction of a cent,and trades constantly, you need a
                  chain where fees don't eat the whole thing. That's why Phantom's
                  native to it.{" "}
                </p>
              </div>
            </div>
          </Section>

          <Section title="Why This Matters">
            <p>
              <strong className="text-white">
                There are countless coins out there — know what you're holding.{" "}
              </strong>{" "}
              Some built for real reasons, some for no reason at all, some
              straight-up traps. Knowing *why* a coin exists is how you tell a tool
              from a trap.{" "}
            </p>
            <p>
              <strong className="text-white">
                A steward doesn't just know what he holds — he knows why it exists,and
                what it's for.
              </strong>{" "}
              That's the difference between investing and gambling. And that's the
              whole point of this lesson.{" "}
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/academy"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/70 transition hover:border-[#D4AF37]/50 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to Academy
          </Link>
          <Link
            to="/academy/lesson/7"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-4 text-sm font-semibold text-[#D4AF37] transition hover:border-[#D4AF37] hover:text-white"
          >
            Continue to Lesson 7
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
