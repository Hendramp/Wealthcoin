import React from "react";

export default function Hero() {
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
          {/* Cropped premium coin */}
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
            <span className="polygon-dot" />

            <svg
              viewBox="0 0 38 33"
              aria-hidden="true"
              className="h-5 w-5 shrink-0"
            >
              <path
                d="M28.3 7.5a5.1 5.1 0 0 0-5.1 0l-3.6 2.1-3.6-2.1a5.1 5.1 0 0 0-5.1 0L3.5 11.8A5.1 5.1 0 0 0 1 16.2v8.5a5.1 5.1 0 0 0 2.5 4.4l7.4 4.3a5.1 5.1 0 0 0 5.1 0l7.4-4.3a5.1 5.1 0 0 0 2.5-4.4v-4.2l3.6 2.1v4.2l-7.4 4.3-3.6-2.1v-4.2l3.6-2.1v-4.2l-3.6-2.1-7.4 4.3v8.5l7.4 4.3 7.4-4.3a5.1 5.1 0 0 0 2.5-4.4v-8.5a5.1 5.1 0 0 0-2.5-4.4l-7.4-4.3Z"
                fill="currentColor"
              />
            </svg>

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

          <blockquote className="mx-auto mt-9 max-w-3xl">
            <p className="text-lg italic leading-8 text-white/75 sm:text-xl">
              “And we know that all things work together for good to those who
              love God.”
            </p>

            <cite className="mt-3 block font-display text-sm not-italic uppercase tracking-[0.22em] text-[#D4AF37]/70">
              Romans 8:28
            </cite>
          </blockquote>

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