import React, { useEffect, useState } from "react";

const scriptures = [
  {
    verse:
      "“And the LORD God took the man and put him into the garden of Eden to dress it and to keep it.”",
    reference: "Genesis 2:15 — JUB",
  },
  {
    verse:
      "“Unless the LORD builds the house, they labour in vain that build it; unless the LORD keeps the city, the watchmen watch in vain.”",
    reference: "Psalm 127:1 — JUB",
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
      "“And we now know that unto those who love God, all things help them unto good, to those who according to the purpose are called to be saints.”",
    reference: "Romans 8:28 — JUB",
  },
  {
    verse:
      "“For God so loved the world that he gave his only begotten Son, that whosoever believes in him should not perish, but have everlasting life.”",
    reference: "John 3:16 — JUB",
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

          {/* Main headline */}
          <h1 className="mt-6 font-display text-[2.65rem] font-bold uppercase leading-[0.95] sm:mt-8 sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            <span className="gold-text block">Build Generational</span>
            <span className="mt-2 block text-white">Wealth</span>
          </h1>

          <p className="mt-6 font-display text-base tracking-wide text-[#D4AF37]/80 sm:mt-7 sm:text-xl md:text-2xl">
            Rooted in Faith — Powered by Blockchain
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/65 sm:mt-6 sm:text-lg sm:leading-8 md:text-xl">
            WealthCoin is a stewardship-driven digital economy built on
            Polygon—designed to empower builders, strengthen communities, and
            create lasting opportunity across generations.
          </p>

          {/* Rotating Scripture */}
          <blockquote
            className={`mx-auto mt-7 flex min-h-[138px] max-w-3xl flex-col items-center justify-center px-1 transition-all duration-500 sm:mt-9 sm:min-h-[118px] ${
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

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#early-access"
              className="btn-gold min-h-[54px] w-full rounded-xl px-8 py-4 text-base font-bold transition active:scale-[0.99] sm:w-auto sm:min-w-[225px]"
            >
              Join Early Access
            </a>

            <a
              href="#foundation"
              className="btn-ghost min-h-[54px] w-full rounded-xl px-8 py-4 text-base font-bold transition active:scale-[0.99] sm:w-auto sm:min-w-[225px]"
            >
              Explore the Foundation
            </a>
          </div>

          <div className="mt-10 sm:mt-12">
            <div className="mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <p className="mt-6 font-display text-sm uppercase tracking-[0.4em] text-[#D4AF37]">
              Every Holder Belongs
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
              Community membership begins with holding WTC—not with status,
              staking level, or wallet size.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}