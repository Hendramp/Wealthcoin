// src/pages/academy/BuyingSellingExchange.jsx
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

export default function BuyingSellingExchange() {
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
          Lesson 5 · The Exchange Road
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          Centralized Exchanges, In Depth
        </h1>
        <p className="mt-4 text-base leading-7 text-white/60">
          Tap a topic to learn it — go at your own pace.
        </p>

        <div className="mt-8 space-y-4">
          <Section title="What a centralized exchange actually is">
            <p>
              <strong className="text-white">
                A centralized exchange (CEX) is a platform where you trade crypto — but they hold the keys for you.
              </strong>{" "}
              When you buy on Coinbase or Kraken, you're not holding the crypto
              yourself. The exchange holds it in their wallets, on your behalf.

            </p>
            <p>
              <strong className="text-white">
                That's the whole difference between an exchange and your own wallet.

              </strong>{" "}
              On an exchange, it's <em>their</em> crypto, not yours. They can
              freeze it, hold it, or restrict it. That's not fear-mongering — it's
              just how they work. The keys you hold are the ones that matter.{" "}
            </p>
          </Section>

          <Section title="The platforms, one by one">
            <p>
              <strong className="text-white">Coinbase</strong> — one of the
              biggest US exchanges. Easy to use, good for beginners. But centralized —
              they hold the keys.{" "}
            </p>
            <p>
              <strong className="text-white">Kraken</strong> — US-based, one of
              the oldest major exchanges. Known for security. Still centralized —
              they hold the keys.{" "}
            </p>
            <p>
              <strong className="text-white">Robinhood</strong> — a brokerage
              that offers crypto. You buy and sell through them, but you don't get
              direct access to your own private keys. Centralized in the "they hold it"
              sense. (Small note: they now offer a separate self-custody wallet
              product, but the core trading experience is still centralized.))
            </p>
            <p>
              <strong className="text-white">SoFi</strong> — a fintech/banking
              app that offers crypto trading. Same deal — they hold the keys, not you.{" "}
            </p>
            <p>
              The through-line: all of these are fine to <em>use</em> — but know
              the difference. Use an exchange to acquire; move what's yours to your
              own wallet when you're done.{" "}
            </p>
          </Section>

          <Section title="How buying actually works">
            <p>
              <strong className="text-white">
                First, you fund your account — a bank transfer or a card.

              </strong>{" "}
              That money sits on the exchange, in fiat (USD, EUR, etc.). It's
              not crypto yet — it's just money you've given them to hold.{" "}
            </p>
            <p>
              <strong className="text-white">
                Then you place an order — you say "I want to buy X amount of Bitcoin."
              </strong>{" "}
              A <strong>market order</strong> buys at the current price, right now.
              A <strong>limit order</strong> says "buy when the price hits this number" —
              it might fill in a minute or it might wait for days. For a beginner,
              market orders are simpler; limit orders give you more control.{" "}
            </p>
            <p>
              <strong className="text-white">
                When it fills, you now "own" crypto — but it's sitting on the
                exchange, in their wallet.

              </strong>{" "}
              You can see it in your balance, but you don't actually hold the keys
              to it. That's the ownership tradeoff: convenient to buy, but you're
              trusting them to hold it for you.{" "}
            </p>
          </Section>

          <Section title="The real costs">
            <p>
              <strong className="text-white">
                Exchanges don't just charge a flat fee — there are a few hidden costs.

              </strong>{" "}
              <strong>Spread</strong> is the difference between the buy price and the
              sell price — the exchange quietly takes a little from every trade.{" "}
              <strong>Trading fees</strong> are the per-trade fee they charge.{" "}
              <strong>Withdrawal fees</strong> are what they charge when you move
              crypto off the exchange to your own wallet. These add up — so it's
              worth knowing them before you trade, not after.{" "}
            </p>
            <p>
              <strong className="text-white">
                Gas fees barely apply on an exchange — they handle the network costs
                for you.
              </strong>{" "}
              When you trade on an exchange, you're not paying gas per swap — the
              exchange covers the network fees internally. That's one of the perks of
              centralized trading: you don't need to hold a native asset just to pay
              gas. You pay their trading fees instead. Gas only shows up when you{" "}
              <em>withdraw</em> — moving your crypto off the exchange to your own
              wallet. That's when the network's native asset matters again.{" "}
            </p>
          </Section>

          <Section title="Why you'd use one at all">
            <p>
              <strong className="text-white">
                Convenience, fiat on/off ramps, and liquidity.{" "}
              </strong>{" "}
              It's the easiest way to get money <em>into</em> crypto — you can use
              a bank transfer or card, things your self-custody wallet can't easily
              do. They also have deep liquidity, so big trades don't move the price
              as much.{" "}
            </p>
            <p>
              <strong className="text-white">
                But you wouldn't leave everything there.
              </strong>{" "}
              They hold the keys. If they freeze your account or go under, that's
              a risk you're trusting them with. The golden rule: use an exchange to
              <em>acquire</em>; move to your own wallet to <em>hold</em>. The
              keys you hold are the ones that matter.{" "}
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/academy/lesson/buying-selling"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/70 transition hover:border-[#D4AF37]/50 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to the fork
          </Link>
          <Link
            to="/academy/lesson/buying-selling/core"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-4 text-sm font-semibold text-[#D4AF37] transition hover:border-[#D4AF37] hover:text-white"
          >
            Continue to the technical core
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
