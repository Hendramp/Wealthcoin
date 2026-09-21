// src/pages/AcademyPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailGateModal from "../components/academy/EmailGateModal";

const STORAGE_KEY = "wtc_academy_email";

const lessons = [
  {
    slug: "wallet-safety",
    number: 1,
    title: "Wallet Safety & Creation",
    description: "What a wallet is, protecting your recovery phrase, and the habits that keep your assets safe.",
    status: "ready",
  },
  {
    slug: "blockchain-basics",
    number: 2,
    title: "Blockchain Basics",
    description: "What a blockchain is, how transactions work, and why networks and gas fees matter.",
    status: "ready",
  },
  {
    slug: "faithful-stewardship",
    number: 3,
    title: "Faithful Stewardship",
    description: "The journey of the stewards — what you do with what's entrusted to you. Luke 19.",
    status: "ready",
  },
  {
    slug: "keys-and-transactions",
    number: 4,
    title: "Keys & Transactions",
    description: "What's safe to share, what's yours to keep, and how to transact wisely in your wallet.",
    status: "ready",
  },
];

export default function AcademyPage() {
  const navigate = useNavigate();
  const [showGate, setShowGate] = useState(false);

  const handleLesson2Click = () => {
    const unlocked = typeof window !== "undefined" && !!localStorage.getItem(STORAGE_KEY);
    if (unlocked) {
      navigate("/academy/lesson/blockchain-basics");
    } else {
      setShowGate(true);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Back to WealthCoin */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]"
        >
          <span aria-hidden="true">←</span>
          Back to WealthCoin
        </Link>

        {/* Academy header */}
        <header className="mt-10 border-b border-[#D4AF37]/15 pb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            WealthCoin Academy
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            Learn to Steward
            <span className="gold-text block">Digital Assets Wisely</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            The Academy is <span className="font-semibold text-[#D4AF37]">100% free, forever</span> — practical education rooted in faithful stewardship. Understand blockchain, protect what you've been entrusted with, and participate with confidence.
          </p>
          <p className="mx-auto mt-6 max-w-2xl font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
            Everyone learns differently.
            <span className="gold-text block">Go at your own pace.</span>
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </header>

        {/* Lesson list */}
        <div className="mt-10 space-y-4">
          {lessons.map((lesson) => {
            const ready = lesson.status === "ready";
            const isLesson2 = lesson.slug === "blockchain-basics";

            // Lesson 2 is a button (gate-controlled), everything else is a Link
            if (isLesson2) {
              return (
                <button
                  key={lesson.slug}
                  onClick={handleLesson2Click}
                  className="group block w-full rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-[#D4AF37]/50 hover:bg-white/[0.06] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                          Lesson {lesson.number}
                        </p>
                      </div>
                      <h2 className="mt-2 font-display text-xl text-white sm:text-2xl">
                        {lesson.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-white/60">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            }

            return (
              <Link
                key={lesson.slug}
                to={ready ? `/academy/lesson/${lesson.slug}` : "#"}
                aria-disabled={!ready}
                className={`group block rounded-3xl border border-white/10 bg-white/5 p-6 transition sm:p-7 ${
                  ready
                    ? "hover:border-[#D4AF37]/50 hover:bg-white/[0.06]"
                    : "cursor-not-allowed opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                        Lesson {lesson.number}
                      </p>
                      {!ready && (
                        <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <h2 className="mt-2 font-display text-xl text-white sm:text-2xl">
                      {lesson.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-white/60">
                      {lesson.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stewardship footer */}
        <footer className="mt-16 rounded-3xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 p-8 text-center">
          <p className="text-sm italic leading-7 text-white/70">
            "And the LORD God took the man and put him into the garden of Eden to dress it and to keep it."
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            Genesis 2:15 — JUB
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50">
            Everything we're entrusted with is meant to be cared for and kept. The Academy exists to help you do exactly that.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50">
            Need a hand? Reach out anytime — we're happy to help you along the way.{" "}
            <a
              href="mailto:WTCteam@outlook.com"
              className="font-semibold text-[#D4AF37] underline underline-offset-2 hover:text-white"
            >
              WTCteam@outlook.com
            </a>
          </p>
        </footer>
      </div>

      {showGate && <EmailGateModal onClose={() => setShowGate(false)} />}
    </main>
  );
}
