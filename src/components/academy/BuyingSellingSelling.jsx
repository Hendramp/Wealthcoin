// src/pages/academy/BuyingSellingSelling.jsx
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

export default function BuyingSellingSelling() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          to="/academy/lesson/buying-selling/core"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]"
        >
          <span aria-hidden="true">←</span>
          Back
        </Link>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
          Lesson 5 · Selling
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          The Flip Side — Getting Out
        </h1>
        <p className="mt-4 text-base leading-7 text-white/60">
          Selling is the same process you already know — just backwards. The
          only real difference is where the money ends up. Tap a topic to learn it.
        </p>

        <div className="mt-8 space-y-4">
          <Section title="The one idea: it's the same, just reversed">
            <p>
              <strong className="text-white">
                Buying and selling use the same skills — check the network, check
                the address, verify, confirm.

              </strong>{" "}
              The only difference is the direction: instead of money going in and
              crypto coming out, crypto goes in and money comes out. Same
              verification habits from Lesson 4 apply. Same check-before-confirm
              discipline. You're not learning a new skill — you're using the one
              you already have, in reverse.{" "}
            </p>
            <p>
              <strong className="text-white">
                The real difference between the two ways is just where the money
                ends up.

              </strong>{" "}
              On an exchange, it's one step — sell to fiat, withdraw to your bank.
              In a wallet, it depends on the wallet. Here's how both actually work.{" "}
            </p>
          </Section>

          <Section title="Selling in a wallet — third-party providers">
            <p>
              <strong className="text-white">
                Most wallets don't sell directly — they route you to a third-party
                provider.

              </strong>{" "}
              When you hit "sell" in a wallet, you'll usually be sent to a company
              like <strong>MoonPay</strong>, <strong>Transak</strong>, or{" "}
              <strong>Ramp</strong> — the same kind of providers that power the
              "buy with a card" button. The wallet handles the interface; the
              provider handles the actual conversion to fiat. That's not a bad
              thing — it's just how it works. Know who you're dealing with before
              you sell.{" "}
            </p>
            <p>
              <strong className="text-white">
                If you chose a wallet from our library guide, you'll likely buy and
                sell through that same wallet.

              </strong>{" "}
              The library guide's wallets each have their own way of doing it, but
              the pattern is the same: the wallet connects you to a provider to
              get your money out. We'll add the specific steps for each wallet to
              the Phantom code page in a bit.{" "}
            </p>
          </Section>

          <Section title="The Phantom way — swap, send, sell">
            <p>
              <strong className="text-white">
                Phantom is the exception — you can swap any asset to Solana, then
                sell it into CASH.

              </strong>{" "}
              The flow: swap whatever you hold into <strong>Solana</strong> right
              in Phantom, send that Solana to your <strong>OKX</strong> wallet (the
              one from Lesson 1), sell it into <strong>CASH</strong> on OKX, and
              CASH can be sent to your bank account. Same route as buying, just
              moving in the other direction.{" "}
            </p>
            <p>
              <strong className="text-white">
                Why OKX again? Same reason as buying — better bridge rates and an
                interface you already know.

              </strong>{" "}
              It keeps the whole thing in one familiar place. You're not learning
              a new platform to sell — you're using the one you already made your
              wallet in. Same habits, same checks, same confidence.{" "}
            </p>
          </Section>

          <Section title="Selling on an exchange — a little easier">
            <p>
              <strong className="text-white">
                An exchange is simpler because the fiat off-ramp is built in.

              </strong>{" "}
              You sell your crypto to fiat right there, and withdraw to your bank.
              No third-party provider, no swap-to-Solana dance — just sell and
              withdraw. The tradeoff is the same one from buying: you're trusting
              the exchange to pay you out. If they freeze your account or go under,
              that's the risk you held the whole time.{" "}
            </p>
            <p>
              <strong className="text-white">
                Same fees as buying, just in reverse.

              </strong>{" "}
              Spread on the sell, trading fees, and withdrawal fees when you move
              the fiat out. Knowing them before you sell is the same wisdom as
              knowing them before you buy.{" "}
            </p>
          </Section>

          <Section title="We don't give financial or tax advice">
            <p>
              <strong className="text-white">
                We are not financial or tax advisors, and this lesson is not
                financial or tax advice.

              </strong>{" "}
              Crypto regulations vary by country — and it's not just based on where
              your <em>home</em> is. It's about where the <em>transaction</em>{" "}
              takes place. What's legal in one place may not be in another. The
              responsibility is on you to know the rules where you're actually
              transacting. We're teaching you <em>how</em>; the <em>rules</em> are
              on you to check.{" "}
            </p>
          </Section>

          <Section title="The real charge">
            <p>
              <strong className="text-white">
                You now have the full picture: acquire, move, hold, sell.

              </strong>{" "}
              The whole Academy was leading here. From "what is a wallet" in
              Lesson 1, to "how you actually use one in the real world" today.
              You know how to get money in, how to hold it safely, how to move it
              between chains, and how to get it out when you need to. That's not a
              trader's skill set. That's a steward's skill set.{" "}
            </p>
            <p>
              <strong className="text-white">
                God wants his people educated and powerful, not deceived and
                confused.

              </strong>{" "}
              As it is written:{" "}
              <em>"Occupy till I come."</em> — Luke 19:13 (JUB). Not "hoard till
              I come." Not "gamble till I come." <em>Occupy</em> — engage with
              what's been entrusted to you, wisely, soberly, and faithfully. That's
              what you're now equipped to do.{" "}
            </p>
          </Section>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/academy/lesson/buying-selling/core"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/70 transition hover:border-[#D4AF37]/50 hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Back to the core
          </Link>
          <Link
            to="/academy"
            className="inline-flex items-center justify-center gap-2 rounded-3xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-4 text-sm font-semibold text-[#D4AF37] transition hover:border-[#D4AF37] hover:text-white"
          >
            Back to the Academy
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
