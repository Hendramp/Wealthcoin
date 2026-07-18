import React, { useEffect, useState } from "react";

const scriptures = [
  {
    verse:
      "“And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it.”",
    reference: "Genesis 2:15 — JUB",
  },
  {
    verse:
      "“Except the Lord build the house, they labour in vain that build it.”",
    reference: "Psalm 127:1",
  },
  {
    verse:
      "“And whatsoever ye do, do it heartily, as to the Lord, and not unto men.”",
    reference: "Colossians 3:23 — JUB",
  },
  {
    verse:
      "“And we know that all things work together for good to those who love God.”",
    reference: "Romans 8:28",
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
      className="relative min-h-screen overflow-hidden bg-[#020302] px-6 pb-20 pt-28 text-white"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(212,175,55,0.11),transparent_24%),radial-gradient(circle_at_50%_60%,rgba(15,65,34,0.22),transparent_48%),linear-gradient(180deg,#020302_0%,#061008_58%,#020202_100%)]" />

      {/* Soft ambient glow behind the coin */}
      <div className="hero-halo absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[110px]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl items-center justify-center">
        <div className="w-full text-center">
          {/* WealthCoin logo */}
          <div className="hero-coin-wrap mx-auto mb-7">
            <div className="hero-coin-frame">
              <img
                src="/assets/logos/wealthcoin-logo.png"
                alt="WealthCoin Logo"
                className="hero-coin-image"
              />
            </div>
          </div>

          {/* Polygon badge */}
          <div className="polygon-badge mx-auto inline-flex items-center gap-3 rounded-full px-5 py-2.5">
  <img
    src="/assets/logos/polygon-logo-white.png"
    alt="Polygon"
    className="h-5 w-5 object-contain"
  />

  <span className="text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm">
    Live on Polygon Network
  </span>
</div>

          {/* Main headline */}
          <h1 className="mt-8 font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            <span className="gold-text block">Build Generational</span>
            <span className="mt-2 block text-white">Wealth</span>
          </h1>

          <p className="mt-7 font-display text-lg tracking-wide text-[#D4AF37]/80 sm:text-xl md:text-2xl">
            Rooted in Faith — Powered by Blockchain
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg md:text-xl">
            WealthCoin is a stewardship-driven digital economy built on
            Polygon—designed to empower builders, strengthen communities, and
            create lasting opportunity across generations.
          </p>

          {/* Rotating Scripture */}
          <blockquote
            className={`mx-auto mt-9 flex min-h-[118px] max-w-3xl flex-col items-center justify-center transition-all duration-500 ${
              scriptureVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
            aria-live="polite"
          >
            <p className="text-lg italic leading-8 text-white/75 sm:text-xl">
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

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#early-access"
              className="btn-gold min-w-[225px] rounded-xl px-8 py-4 text-base font-bold"
            >
              Join Early Access
            </a>

            <a
              href="#foundation"
              className="btn-ghost min-w-[225px] rounded-xl px-8 py-4 text-base font-bold"
            >
              Explore the Foundation
            </a>
          </div>

          <div className="mt-12">
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