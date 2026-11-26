// src/pages/academy/BuyingSellingCore.jsx
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

export default function BuyingSellingCore() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          to="/academy/lesson/buying-selling"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
          Lesson 5 · The Technical Core
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          What's Actually Happening Under the Hood
        </h1>
        <p className="mt-4 text-base leading-7 text-white/60">
          Both roads — exchange and Phantom — converge here. These are the
          concepts that separate people who understand crypto from people who
          just use it. Tap a topic to learn it.

        </p>

        <div className="mt-8 space-y-4">
          <Section title="What a swap actually is">
            <p>
              <strong className="text-white">
                A swap isn't "converting coins" — it's trading one asset for another.
              </strong>{" "}
              When you swap CASH for Solana on Phantom, you're not magically
              transforming one thing into another. You're selling one asset and
              buying another in a single step. The price you get is based on
              supply and demand at that exact moment and
            </p>
            <p>
              <strong className="text-white">
                That's where slippage comes in.
              </strong>{" "}
              The price can move a little between when you confirm and when it
              executes — especially on volatile assets. That's why you check the
              slippage tolerance before you swap. It's not a scam, it's just how
              trading works: the market moves, and your trade fills at whatever
              price it's at when it goes through. Checking is wisdom, not paranoia.{" "}
            </p>
          </Section>

          <Section title="What a bridge actually does">
            <p>
              <strong className="text-white">
                A bridge doesn't move tokens across chains like a pipe.


              </strong>{" "}
              It locks your asset on one chain, and issues a representation of it
              on the other. Your Solana is locked in the bridge's contract, and a
              wrapped version of it appears on the other chain. That's why bridges
              carry some risk — you're trusting the bridge's contract to hold your
              asset correctly and give you back what's yours when you bridge back.{" "}
            </p>
            <p>
              <strong className="text-white">
                That's not fear-mongering — it's just knowing what you're using.
              </strong>{" "}
              Reputable bridges have been audited and widely used. But "audited"
              doesn't mean "risk-free." Know what you're using, check the network
              before you confirm,and don't bridge more than you're comfortable
              trusting. That's stewardship, not paranoia.{" "}
            </p>
          </Section>

          <Section title="Network vs. asset — the one that saves you">
            <p>
              <strong className="text-white">
                Solana is a network. USDC is an asset that exists on many networks.



              </strong>{" "}
              You can have USDC on Solana,and USDC on Polygon. Same value,
              different roads. This is the exact reason you can't just send anything
              anywhere — you have to send the right asset on the right network to the
              right address. That's the whole "check the network" habit from Lesson
              4,and it's the single most common way people lose money: they send
              the right asset on the wrong network,and it's gone.{" "}
            </p>
            <p>
              <strong className="text-white">
                This ties back to Lesson 2's roads metaphor.

              </strong>{" "}
              Networks are the roads. Assets are the vehicles. You can have a
              USDC truck on the Solana road,and a USDC truck on the Polygon road —
              same truck, different road. Send it down the wrong road,and you might
              not get it back. That's why you check before you confirm. Every time.{" "}
            </p>
          </Section>

          <Section title="Why this matters — the difference between knowing and using">
            <p>
              <strong className="text-white">
                Anyone can tap buttons. Understanding what's happening under the
                hood is what keeps you from losing money.{" "}
              </strong>{" "}
              The person who doesn't understand slippage blames the app when a swap
              fills at a worse price. The person who understands it checks the
              tolerance first. The person who doesn't understand networks sends
              USDC down the wrong road and loses it. The person who understands
              checks the network before confirming. Same app, same buttons —
              completely different outcomes.{" "}
            </p>
            <p>
              <strong className="text-white">
                That's the whole point of the Academy.


              </strong>{" "}
              Not to make you a trader or an expert. To make you someone who
              knows what they're doing with what's been entrusted to them. To
              keep you from being deceived by confusion. As it is written:{" "}
              <em>"A prudent man foreseeth the evil, and hideth himself: but the
              simple pass on,and are punished."</em> — Proverbs  ̈22:3 (JUB). Checking
              isn't paranoia. It's wisdom.{" "}
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/academy/lesson/buying-selling"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/70 transition hover:border-[#D4AF37]/50 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back
          </Link>
          <Link
            to="/academy/lesson/buying-selling-selling"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-4 text-sm font-semibold text-[#D4AF37] transition hover:border-[#D4AF37] hover:text-white"
          >
            Continue to selling
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
