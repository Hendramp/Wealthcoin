import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const scriptures = [
  {
    verse:
      "“And the LORD God took the man and put him into the garden of Eden to dress itand to keep it.”",
    reference: "Genesis 2:15 — JUB",
  },
  {
    verse:
      "“And whatever ye do, do it heartily, as to the Lord,and not unto men.”",
    reference:"Colossians 3:23 — JUB",
  },
  {
    verse:
      "“He that is faithful with little is faithful also with much,and he that is unjust with little is unjust also with much.”",
    reference:"Luke  ️16:10 — JUB",
  },
  {
    verse:
      "“Be ye therefore wise as serpents,and harmless as doves.”",
    reference:"Matthew  ️10:16 — JUB",
  },
  {
    verse:
      "“Knowing that a man is not justified by the works of the law, but by the faith of Jesus Christ...”",
    reference:"Galatians  ️2:16 — JUB",
  },
  {
    verse:
      "“Moreover it is required of stewards,that a man be found faithful.”",
    reference:"1 Corinthians  ️4:2 — JUB",
  },
];

const stats = [
  { value: "1B", label: "WTC Total Supply" },
  { value: "100%", label: "Free Academy" },
  { value: "Polygon", label: "Mainnet" },
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

  const scrollToPurchase = (e) => {
    e.preventDefault();
    const section = document.getElementById("purchase");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#020302] px-4 pb-16 pt-24 text-white sm:px-6 sm:pb-20 sm:pt-28"
    >
      <style>{`
        @keyframes heroFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes haloPulse {
          0%,100% { opacity: 0.45; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%,-50%) scale(1.1); }
        }
        @keyframes auroraDrift {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          33% { transform: translate3d(4%,-3%,0) scale(1.08); }
          66% { transform: translate3d(-3%,2%,0) scale(0.94); }
        }
        @keyframes shimmerSweep {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      {/* Layered background atmosphere — aurora blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(212,175,55,0.15),transparent_28%),radial-gradient(circle_at_85%_78%,rgba(15,65,34,0.32),transparent_44%),radial-gradient(circle_at_10%_68%,rgba(15,65,34,0.22),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_58%,#020202_100%)]" />

      <div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0a3d1c]/40 blur-[120px]"
        style={{ animation: "auroraDrift 22s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[#D4AF37]/8 blur-[140px]"
        style={{ animation: "auroraDrift 26s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-[#0a3d1c]/30 blur-[110px]"
        style={{ animation: "auroraDrift 30s ease-in-out infinite" }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl items-center justify-center sm:min-h-[calc(100vh-7rem)]">
        <div className="w-full text-center">
          {/* WealthCoin logo + pulsing halo */}
          <div className="relative mx-auto mb-5 w-fit sm:mb-7">
            <div
              className="absolute left-1/2 top-1/2 h-44 w-44 rounded-full bg-[#D4AF37]/15 blur-[70px]"
              style={{ animation: "haloPulse 5s ease-in-out infinite" }}
            />
            <div
              className="hero-coin-wrap scale-[0.82] sm:scale-100"
              style={{ animation: "heroFloat 7s ease-in-out infinite" }}
            >
              <div className="hero-coin-frame">
                <img
                  src="/assets/logos/wealthcoin-logo.png"
                  alt="WealthCoin Logo"
                  className="hero-coin-image"
                />
              </div>
            </div>
          </div>

          {/* Polygon badge — bigger mark, stacked purple label */}
          <div className="inline-flex flex-col items-center gap-1.5 rounded-2xl border border-[#8247E5]/40 bg-[#8247E5]/10 px-5 py-3 backdrop-blur-sm">
            <svg width="34" height="20" viewBox="0 0 56 32" className="-rotate-12" aria-hidden="true">
              <path
                d="M14 16 C14 8,22 8,28 16 C34 24,42 24,42 16 C42 8,34 8,28 16 C22 24,14 24,14 16Z"
                fill="none"
                stroke="#8247E5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8247E5] sm:text-xs">
              Live on Polygon
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A78BFA] sm:text-[10px]">
            
            </span>
          </div>

          {/* Main headline — gold shimmer */}
          <h1 className="mt-8 font-display text-[2.85rem] font-bold uppercase leading-[0.92] sm:mt-10 sm:text-7xl md:text-8xl lg:text-[6rem]">
            <span
              className="gold-text block"
              style={{
                backgroundSize: "200% auto",
                animation: "shimmerSweep 8s linear infinite",
              }}
            >
              Faith Driven
            </span>
            <span className="mt-3 block text-white">FinTech</span>
          </h1>

          <p className="mt-7 font-display text-base tracking-wide text-[#D4AF37]/85 sm:mt-8 sm:text-2xl md:text-3xl">
            Rooted in Faith — Powered by Blockchain
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:mt-6 sm:text-lg sm:leading-8">
            Free education. Real implementation. A crypto community that stewards wisely.
          </p>

          {/* Stats strip */}
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#07110d]/90 px-4 py-5 backdrop-blur-sm">
                <p
  className={`font-display text-2xl font-bold sm:text-3xl ${
    stat.value === "Polygon" ? "text-[#8247E5]" : "text-[#D4AF37]"
  }`}
>
  {stat.value}
</p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Pillar grid — 4 cards, each with its own character */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {/* Free Crypto Courses — gold, warm */}
            <Link
              to="/academy"
              className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.05] p-6 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/[0.09] hover:shadow-xl hover:shadow-[#D4AF37]/15 sm:p-7"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-2xl transition duration-500 group-hover:bg-[#D4AF37]/20" />
              <span className="relative rounded-full border border-[#D4AF37]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Education
              </span>
              <h2 className="relative mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                Free Crypto Courses
              </h2>
              <p className="relative mt-2 flex-1 text-sm leading-6 text-white/55">
                Wallets, safety &amp; stewardship — free forever.

              </p>
              <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                Get Started
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Accept Crypto — cool, calm, angular */}
            <Link
              to="/wtcs"
              className="group relative flex flex-col items-start overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] p-6 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-black/40 sm:p-7"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative rounded-md border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Implementation
              </span>
              <h2 className="relative mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                Accept Crypto
              </h2>
              <p className="relative mt-2 flex-1 text-sm leading-6 text-white/55">
                For businesses, ministries &amp; individuals.

              </p>
              <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Explore Solutions
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Marketplace — gold, bold, lively */}
            <Link
              to="/marketplace"
              className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/[0.08] p-6 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:bg-[#D4AF37]/[0.14] hover:shadow-xl hover:shadow-[#D4AF37]/20 sm:p-7"
            >
              <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-[#D4AF37]/10 blur-2xl transition duration-500 group-hover:bg-[#D4AF37]/20" />
              <span className="relative rounded-full border border-[#D4AF37]/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Marketplace
              </span>
              <h2 className="relative mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                Buy &amp; Sell
              </h2>
              <p className="relative mt-2 flex-1 text-sm leading-6 text-white/55">
                Trade goods &amp; services in WTC.(not active, in development)

              </p>
              <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]">
                Browse Listings
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

            {/* Library + Hub — quiet, deep, grounded */}
            <div className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/40 sm:p-7">
              <Link
                to="/hub"
                className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-lg shadow-black/40 transition hover:scale-105 hover:ring-[#D4AF37]/80"
              >
                Hub →
              </Link>
              <a href="#library" className="flex w-full flex-col items-start text-left">
                <span className="relative rounded-full border border-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                  Library
                </span>
                <h2 className="relative mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                  Learn &amp; Connect
                </h2>
                <p className="relative mt-2 flex-1 text-sm leading-6 text-white/55">
                  Official guides, verified channels &amp; the community hub.

                </p>
                <span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Explore the Library
                  <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
                </span>
              </a>
            </div>
          </div>

          {/* Purchase on Uniswap — centered below the pillars, smooth-scrolls to purchase section */}
          <div className="mt-10 flex justify-center">
            <a
              href="#purchase"
              onClick={scrollToPurchase}
              className="group inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[#D4AF37] px-14 py-5 text-lg font-semibold text-black shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#e8c65a]"
            >
              Purchase WTC on Uniswap
              <span aria-hidden="true" className="transition-transform group-hover:translate-y-1">↓</span>
            </a>
          </div>

          {/* Learn about the Founder — secondary CTA below Purchase */}
<div className="mt-4 flex justify-center">
  <Link
    to="/founder"
    className="group inline-flex min-h-[56px] items-center gap-3 rounded-xl border border-[#D4AF37]/50 bg-black/40 px-10 py-4 text-base font-semibold text-[#D4AF37] backdrop-blur-sm transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
  >
    Learn about the Founder
    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
  </Link>
</div>


          {/* Rotating Scripture */}
          <blockquote
            className={`mx-auto mt-12 flex min-h-[150px] max-w-3xl flex-col items-center justify-center px-1 transition-all duration-500 sm:min-h-[130px] ${
              scriptureVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }`}
            aria-live="polite"
          >
            <p className="text-xl italic leading-8 text-white/80 sm:text-2xl sm:leading-9">
              {activeScripture.verse}
            </p>
            <cite className="mt-4 block font-display text-base not-italic uppercase tracking-[0.22em] text-[#D4AF37]/80">
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

          {/* Belong footer */}
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
