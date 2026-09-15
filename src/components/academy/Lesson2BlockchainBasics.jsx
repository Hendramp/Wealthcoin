// src/components/academy/Lesson2BlockchainBasics.jsx
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

export default function Lesson2BlockchainBasics() {
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
          Lesson 2 · Blockchain Basics
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          Blockchain Basics
        </h1>
        <p className="mt-4 text-base leading-7 text-white/60">
          Tap a topic to learn it — go at your own pace.
        </p>

        <div className="mt-8 space-y-4">
          <Section title="So what exactly is a blockchain?">
            <p>
              <strong className="text-white">
                A blockchain is a shared notebook that everyone in the network has a copy of.
              </strong>{" "}
              When you send or receive money, it gets written on a page. That page is a
              "block," and every page is linked to the one before it — that's the "chain."
              Pages, all connected, all copied many times over.
            </p>
            <p>
              <strong className="text-white">
                Because everyone has a copy, no one can just cross something out.
              </strong>{" "}
              You'd have to change every single copy at once. So the record stays honest.
              It's not that nobody ever tries to mess with it — it's that messing with it
              is basically impossible.
            </p>
            <p>
              Want to see it for yourself? Every transaction for WealthCoin (WTC) is out
              in the open on the blockchain — you can look at the live record anytime on{" "}
              <a
                href="https://polygonscan.com/token/0x394b57f4a40ff31530d66f904e1db2c6516c018f#transactions"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#D4AF37] underline underline-offset-2 hover:text-white"
              >
                PolygonScan
              </a>
              . No need to take our word for it.
            </p>
          </Section>

          <Section title="How does money get sent and received?">
            <p>
              <strong className="text-white">
                Crypto is peer to peer — it goes straight from your wallet to theirs, with no middleman in between.
              </strong>{" "}
              No bank, no third party waiting to take its cut. When you send, the funds
              are yours to move, and once they're sent, they're the recipient's. There's
              no "waiting for it to clear" like a bank has.
            </p>
            <p>
              <strong className="text-white">
                The only wait is the few seconds it takes the network's computers to check that everything's valid.
              </strong>{" "}
              Your transaction goes out, a bunch of computers — the technical name is
              "nodes" — look at it and go "yeah, this checks out." Once enough of them
              agree, it's locked in. Done. Permanent. Nobody can undo it.
            </p>
            <p>
              <strong className="text-white">
                And this is exactly why the self-custody wallet from Lesson 1 matters so much.
              </strong>{" "}
              Because your funds are yours instantly — no bank, no exchange in the middle
              — <em>you</em> are the one in control. You hold the keys, so you hold the
              funds. No middleman means no one can freeze, hold, or take what's yours.
            </p>
          </Section>

          <Section title="What are networks, and why do they matter?">
            <p>
              <strong className="text-white">
                Think of networks like different roads — each one has its own rules and its own tolls.
              </strong>{" "}
              Bitcoin has its own road. Ethereum has its own road. And WealthCoin? We're
              on the <strong>Polygon</strong> road.
            </p>
            <p>
              <strong className="text-white">
                Always check which road you're on before you send.
              </strong>{" "}
              If you send Polygon assets down the Bitcoin road, aka pick the wrong network
              by accident — poof. Your funds are gone. Not stolen, not hacked — just gone,
              because they went down the wrong road and nobody can get them back. So check
              the network before you send. Every time. It's the difference between an
              "oops" and an "oh no."
            </p>
          </Section>

          <Section title="What are gas fees?">
            <p>
              <strong className="text-white">
                Gas is just the toll — a tiny fee you pay to the network every time you make a transaction.
              </strong>{" "}
              It's not going to some company; it's going to the network itself, the
              computers doing the work. Nobody's pocketing it.
            </p>
            <p>
              <strong className="text-white">
                On Polygon, that toll is basically nothing — pennies, sometimes less than one cent.
              </strong>{" "}
              That's a big reason we chose Polygon — you're not getting nickel-and-dimed
              every time you blink.
            </p>
            <p>
              The toll can change depending on the network, though. Each network sets its
              own. When a road's crowded, the toll goes up; when it's quiet, it drops.
              Some networks — like Ethereum when it's busy — can get surprisingly
              expensive. That's why the network you're on matters so much, and why
              Polygon's low fees make it such a friendly place to start.
            </p>
          </Section>

          <Section title="Why does any of this matter to you?">
            <p>
              <strong className="text-white">
                There's a difference between using something and understanding it.
              </strong>{" "}
              When you know how the record book works, why the roads matter, and what the
              toll's for — you're not just hoping it works. You actually <em>get</em> it.
            </p>
            <p>
              <strong className="text-white">
                And that's stewardship — you can't take care of what you don't understand.
              </strong>{" "}
              But once you do, you're not just holding a coin — you're taking care of
              something that's been entrusted to you.
            </p>
          </Section>
        </div>

        <div className="mt-10 rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6 text-center sm:p-8">
          <p className="font-display text-lg text-white sm:text-xl">
            "Wisdom is the principal thing; therefore, get wisdom: and with all thy
            getting get understanding."
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Proverbs 4:7 — JUB
          </p>
        </div>
      </div>
    </main>
  );
}
