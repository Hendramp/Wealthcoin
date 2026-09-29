// src/pages/academy/BuyingSellingPhantom.jsx
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

export default function BuyingSellingPhantom() {
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
          Lesson 5 · The Phantom Road
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          Self-Custody, Step by Step
        </h1>
        <p className="mt-4 text-base leading-7 text-white/60">
          You hold your own keys from the start. Tap a step to learn it — go at
          your own pace.
        </p>

        <div className="mt-8 space-y-4">
          <Section title="Step 1 — Download Phantom">
            <p>
              <strong className="text-white">
                Phantom is the app you'll buy with — and it's a self-custody wallet,
                so you hold your own keys from the start.
              </strong>{" "}
              If you already made a wallet in Lesson 1, you know the drill: your
              recovery phrase is the keys to everything. Write it down, keep it
              safe,and never share it with anyone. Phantom is the same deal — just
              a different app,and it's native to the Solana network.{" "}
            </p>
          </Section>

          <Section title="Step 2 — Buy with a card or Apple Pay">
            <p>
              <strong className="text-white">
                When you buy, the purchase lands as CASH — not Solana, not USDC,
                not anything else. CASH.
              </strong>{" "}
              CASH is native to the Solana network — think of it like a stablecoin,
              but only for Phantom. It holds a stable value, but it only lives on
              Solana. That one fact explains everything that comes next.{" "}
            </p>
            <p>
              <strong className="text-white">
                Because CASH is Solana-native, you can only convert it into other
                Solana-native things.{" "}
              </strong>{" "}
              You can't buy Polygon or Ethereum directly with it on Phantom — that's
              the whole reason this route exists. You convert it into Solana first,
              then move it from there.{" "}
              <em>(Note: memecoins are also an option here, but we're not covering
              those — and we don't give financial or trading advice. This is education,
              not recommendations.)</em>
            </p>
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <strong className="text-white">
                If you chose a different wallet from our library guide, you'll likely
                buy through that same wallet instead.
              </strong>{" "}
              Each wallet in the guide has its own way of getting money in — some use
              third-party providers like MoonPay or Transak, others have their own
              built-in flow. The pattern is the same: you buy, it lands in your wallet,
              and you move it where it needs to go. We'll add the specific steps for
              each wallet here in a bit.{" "}
            </p>
          </Section>

          <Section title="Step 3 — Convert CASH into Solana">
            <p>
              <strong className="text-white">
                Right in the Phantom app, you swap that CASH for Solana.
              </strong>{" "}
              It's a simple swap — you're trading one asset for another. From here,
              you have actual Solana you can move around the network. That's the
              "fuel" you'll send to the next stop.{" "}
            </p>
            <p>
              <strong className="text-white">
                Every swap and send costs gas — and you pay it in the network's native
                asset.
              </strong>{" "}
              Whatever blockchain you're on, you need its native asset to cover
              gas fees — we mentioned this back in Lesson 2. It varies by
              network, but typically Solana and Polygon are pretty low — WealthCoin's
              blockchain is Polygon, so its gas fees are always around a cent.{" "}
            </p>
          </Section>

          <Section title="Step 4 — Send Solana to OKX">
            <p>
              <strong className="text-white">
                Now you send that Solana to your OKX wallet — the one you created in
                Lesson 1.
              </strong>{" "}
              This is where Lesson 4 comes in: sending is the same process you
              already learned. Open your wallet, select the Solana network, paste
              your OKX receiving address, verify it character by character, check
              the network is Solana and not something else, review the amount and gas
              fee, then confirm. Once it's sent, it's sent — permanent, no undo.{" "}
            </p>
            <p>
              <strong className="text-white">
                Why OKX instead of swapping on Phantom?
              </strong>{" "}
              For us, the bridge rates on OKX were cheaper and the interface was
              easier to use. And since it's the wallet you already made in Lesson 1,
              it keeps the route to one familiar place. You're not learning a new
              platform — you're using the one you already know.{" "}
            </p>
          </Section>

          <Section title="Step 5 — Bridge to whatever chain you need">
            <p>
              <strong className="text-white">
                On OKX, you use the bridge feature to move from Solana to any other
                blockchain.

              </strong>{" "}
              That's how you get from a Solana-native purchase to Polygon, Ethereum,
              or anywhere else. A bridge locks your asset on one chain and issues a
              representation of it on the other. That's why bridges carry some risk —
              you're trusting the bridge's contract. We'll break that down more in the
              technical core, but for now: know what you're using,and check the
              network before you confirm. Every time.{" "}
            </p>
          </Section>

          <Section title="Why this whole route exists">
            <p>
              <strong className="text-white">
                One concept explains all five steps: CASH is native to Solana.

              </strong>{" "}
              Because it only lives on Solana, you can't buy other chains directly
              with it. So you buy CASH, convert it to Solana, send it to OKX,
              and bridge from there. Get that one thing, and the whole route makes sense
              instead of feeling like random steps. That's the clarity that keeps
              people from getting confused —and confused is exactly how people lose
              money.{" "}
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
            to="/academy/lesson/buying-selling-core"
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
