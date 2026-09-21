import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const scriptures = [
  {
    verse:
      "“And the LORD God took the man and put him into the garden of Eden to dress it and to keep it.”",
    reference: "Genesis 2:15 — JUB",
  },
  {
    verse:
      "“And whatever ye do, do it heartily, as to the Lord, and not unto men.”",
    reference: "Colossians 3:23 — JUB",
  },
  {
    verse:
      "“He that is faithful with little is faithful also with much, and he that is unjust with little is unjust also with much.”",
    reference: "Luke 16:10 — JUB",
  },
  {
    verse:
      "“Be ye therefore wise as serpents, and harmless as doves.”",
    reference: "Matthew 10:16 — JUB",
  },
  {
    verse:
      "“The prudent man foresees the evil and hides himself, but the simple pass on and are punished.”",
    reference: "Proverbs 22:3 — JUB",
  },
  {
    verse:
      "“Moreover it is required of stewards, that a man be found faithful.”",
    reference: "1 Corinthians 4:2 — JUB",
  },
];

export default function Hero() {
  const [scriptureIndex, setScriptureIndex] = useState(0);
  const [scriptureVisible, setScriptureVisible] = useState(true);

  useEffect(() => {
    const rotationInterval = window.setInterval(() => {
      setScriptureVisible(false);

      const transitionTimeout = window.setTimeout(() => {
        setScriptureIndex(
          (currentIndex) => (currentIndex + 1) % scriptures.length
        );

        setScriptureVisible(true);
      }, 500);

      return () => window.clearTimeout(transitionTimeout);
    }, 9000);

    return () => window.clearInterval(rotationInterval);
  }, []);

  const activeScripture = scriptures[scriptureIndex];

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#020302] px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-20 sm:pt-28"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(212,175,55,0.11),transparent_24%),radial-gradient(circle_at_50%_60%,rgba(15,65,34,0.22),transparent_48%),linear-gradient(180deg,#020302_0%,#061008_58%,#020202_100%)]" />

      {/* Soft ambient glow behind the coin */}
      <div className="hero-halo absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[90px] sm:h-80 sm:w-80 sm:blur-[110px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl items-center justify-center sm:min-h-[calc(100vh-7rem)]">
        <div className="w-full text-center">
          {/* WealthCoin logo */}
          <div className="hero-coin-wrap mx-auto mb-5 scale-[0.82] sm:mb-7 sm:scale-100">
            <div className="hero-coin-frame">
              <img
                src="/assets/logos/wealthcoin-logo.png"
                alt="WealthCoin Logo"
                className="hero-coin-image"
              />
            </div>
          </div>

          {/* Polygon Network */}
          <div className="mt-4 flex flex-col items-center sm:mt-7">
            <svg
              width="56"
              height="32"
              viewBox="0 0 56 32"
              className="-rotate-12"
              aria-hidden="true"
            >
              <path
                d="M14 16
                   C14 8,22 8,28 16
                   C34 24,42 24,42 16
                   C42 8,34 8,28 16
                   C22 24,14 24,14 16Z"
                fill="none"
                stroke="#A970FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C8A6FF] sm:text-sm sm:tracking-[0.32em]">
              Live on Polygon Network
            </span>
          </div>

          {/* Main headline — repositioned for search */}
          <h1 className="mt-6 font-display text-[2.65rem] font-bold uppercase leading-[0.95] sm:mt-8 sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            <span className="gold-text block">Faith Driven</span>
            <span className="mt-2 block text-white">FinTech</span>
          </h1>

          <p className="mt-6 font-display text-base tracking-wide text-[#D4AF37]/80 sm:mt-7 sm:text-xl md:text-2xl">
            Rooted in Faith — Powered by Blockchain
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/65 sm:mt-6 sm:text-lg sm:leading-8 md:text-xl">
            Free education. Real implementation. A community that stewards wisely.

          </p>

          {/* Two pillars — Free Courses (Academy) + Real Implementation (WTC Solutions) */}
          <div className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-5">
            {/* Free Courses — relabeled for search */}
            <Link
              to="/academy"
              className="group flex flex-col items-start rounded-3xl border border-[#D4AF37]/40 bg-[#D4AF37]/[0.06] p-6 text-left transition hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/[0.1] sm:p-7"
            >
              <span className="rounded-full border border-[#D4AF37]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                Crpto Education
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
               Free Crypto Courses
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Wallets, safety, stewardship &amp; more — at your own pace, free forever.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-[#D4AF37]">
                Start Learning cryptocurrency today
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* WTC Solutions */}
            <Link
              to="/wtcs"
              className="group flex flex-col items-start rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-left transition hover:border-white/35 hover:bg-white/[0.06] sm:p-7"
            >
              <span className="rounded-full border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                Real Implementation
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                Accept Crypto Payments
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                We help businesses, ministries &amp; individuals actually accept crypto.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-white">
                Explore Solutions
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>

          {/* Purchase WTC — primary action */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <a
              href="#purchase"
              className="min-h-[54px] rounded-xl bg-[#D4AF37] px-10 py-3 font-semibold text-black shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#e8c65a]"
            >
              Purchase WTC
            </a>

            <a
              href="#foundation"
              className="btn-ghost min-h-[54px] w-full sm:w-auto"
            >
              Explore the Foundation
            </a>

            <a
              href="#risk-section"
              className="btn-ghost min-h-[48px] px-8 text-sm"
            >
              Risk Section
            </a>
          </div>

          {/* Rotating Scripture */}
          <blockquote
            className={`mx-auto mt-10 flex min-h-[138px] max-w-3xl flex-col items-center justify-center px-1 transition-all duration-500 sm:min-h-[118px] ${
              scriptureVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
            aria-live="polite"
          >
            <p className="text-base italic leading-7 text-white/75 sm:text-xl sm:leading-8">
              {activeScripture.verse}
            </p>

            <cite className="mt-3 block font-display text-sm not-italic uppercase tracking-[0.22em] text-[#D4AF37]/70">
              {activeScripture.reference}
            </cite>
          </blockquote>

          {/* Scripture progress indicators */}
          <div
            className="mt-2 flex items-center justify-center gap-2"
            aria-label="Scripture rotation"
          >
            {scriptures.map((scripture, index) => (
              <button
                key={scripture.reference}
                type="button"
                onClick={() => {
                  setScriptureVisible(false);

                  window.setTimeout(() => {
                    setScriptureIndex(index);
                    setScriptureVisible(true);
                  }, 300);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === scriptureIndex
                    ? "w-7 bg-[#D4AF37]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Show ${scripture.reference}`}
              />
            ))}
          </div>

          <div className="mt-14 sm:mt-16">
            <div className="mx-auto h-px max-w-lg bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

            <p className="mt-8 font-display text-lg uppercase tracking-[0.35em] text-[#D4AF37] sm:text-xl">
              You can belong before you believe.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              You don’t have to share our faith to belong. All are welcome to participate with respect and integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
