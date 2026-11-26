import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const highlights = [
  { value: "1B", label: "WTC total supply" },
  { value: "100%", label: "Free Academy" },
  { value: "Polygon", label: "Mainnet" },
];

const scriptures = [
  {
    verse: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
    reference: "Proverbs 3:5 · KJV",
  },
  {
    verse: "For which of you, intending to build a tower, sitteth not down first, and counteth the cost?",
    reference: "Luke 14:28 · KJV",
  },
  {
    verse: "For where your treasure is, there will your heart be also.",
    reference: "Matthew 6:21 · KJV",
  },
  {
    verse: "As every man hath received the gift, even so minister the same one to another.",
    reference: "1 Peter 4:10 · KJV",
  },
];

export default function Hero() {
  const [activeScripture, setActiveScripture] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScripture((current) => (current + 1) % scriptures.length);
    }, 8500);

    return () => window.clearInterval(timer);
  }, []);

  const scripture = scriptures[activeScripture];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-accent/20 bg-base px-5 pb-14 pt-14 text-primary sm:px-8 sm:pb-20 sm:pt-20"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(10,10,11,.96) 0%, rgba(10,10,11,.88) 54%, rgba(10,10,11,.72) 100%), url('/assets/backgrounds/hero-mountain.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ambient opacity-80" />
      <div className="pointer-events-none absolute -right-20 top-0 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-hover sm:text-xs">
            <img
              src="/assets/logos/polygon-logo.png"
              alt=""
              aria-hidden="true"
              className="h-4 w-4 object-contain"
            />
            Built on Polygon · Digital assets with purpose
          </div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Faith-driven
            <span className="mt-1 block bg-gradient-to-r from-accent-hover via-accent to-[#f2dfa0] bg-clip-text text-transparent">
              FinTech
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#D0CCC4] sm:text-lg sm:leading-8 lg:mx-0">
            Rooted in faith. Powered by blockchain. Built around education,
            responsible implementation, and wise stewardship.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/academy"
              className="btn-gold min-h-12 px-6 py-3 text-center font-semibold"
            >
              Explore the Academy
            </Link>
            <Link
              to="/wtcs"
              className="btn-ghost min-h-12 px-6 py-3 text-center font-semibold"
            >
              WealthCoin Solutions
            </Link>
          </div>

          <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-6 lg:mx-0">
            {highlights.map((highlight) => (
              <div key={highlight.label} className="text-center lg:text-left">
                <dt className="font-display text-2xl font-semibold text-accent-hover sm:text-3xl">
                  {highlight.value}
                </dt>
                <dd className="mt-1 text-[9px] font-semibold uppercase leading-4 tracking-[0.12em] text-[#C2BDB5] sm:text-[10px]">
                  {highlight.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[500px]">
          <div className="absolute inset-8 rounded-full border border-accent/20" />
          <div className="absolute inset-14 rounded-full border border-dashed border-accent/20" />
          <div className="relative flex min-h-[310px] flex-col items-center justify-center sm:min-h-[400px]">
            <div className="relative z-10 rounded-full border border-accent/45 bg-black/50 p-3 shadow-[0_0_70px_rgba(201,162,39,.2)] sm:p-4">
              <img
                src="/assets/logos/wealthcoin-logo.png"
                alt="WealthCoin emblem"
                className="h-36 w-36 rounded-full object-cover sm:h-48 sm:w-48"
              />
            </div>
            <div className="absolute right-[5%] top-[15%] flex items-center gap-2 rounded-xl border border-white/15 bg-[#111113]/95 px-3 py-2 shadow-xl sm:right-0">
              <img
                src="/assets/logos/polygon-logo.png"
                alt="Polygon"
                className="h-7 w-7 object-contain sm:h-9 sm:w-9"
              />
              <span className="text-xs font-semibold text-primary sm:text-sm">
                Polygon
              </span>
            </div>
            <div className="absolute bottom-[12%] left-[3%] rounded-xl border border-accent/25 bg-[#111113]/95 px-4 py-3 shadow-xl sm:bottom-[10%] sm:left-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent">
                WealthCoin
              </p>
              <p className="mt-1 text-xs text-[#D0CCC4]">Stewardship in action</p>
            </div>
          </div>

          <div
            className="rounded-2xl border border-accent/30 bg-[#101012]/95 p-5 shadow-2xl sm:p-6"
            aria-label="Rotating Scripture"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-hover">
                A word to carry with you
              </p>
              <span className="h-px flex-1 bg-accent/20" />
              <img
                src="/assets/logos/polygon-logo.png"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain opacity-75"
              />
            </div>
            <blockquote className="mt-4 min-h-[76px]" aria-live="polite">
              <p className="font-display text-lg leading-7 text-primary sm:text-xl">
                “{scripture.verse}”
              </p>
              <cite className="mt-2 block text-xs font-semibold not-italic tracking-wide text-accent-hover">
                {scripture.reference}
              </cite>
            </blockquote>
            <div className="mt-4 flex gap-2" aria-label="Choose a Scripture">
              {scriptures.map((item, index) => (
                <button
                  key={item.reference}
                  type="button"
                  onClick={() => setActiveScripture(index)}
                  aria-label={`Show ${item.reference}`}
                  aria-pressed={activeScripture === index}
                  className={`h-2.5 rounded-full transition-all ${
                    activeScripture === index
                      ? "w-7 bg-accent-hover"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
