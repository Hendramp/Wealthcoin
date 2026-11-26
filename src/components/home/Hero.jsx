import React from "react";
import { Link } from "react-router-dom";

const highlights = [
  { value: "1B", label: "WTC total supply" },
  { value: "100%", label: "Free Academy" },
  { value: "Polygon", label: "Mainnet" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-base px-6 pb-20 pt-16 text-primary sm:pb-24 sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ambient" />
      <div className="pointer-events-none absolute left-1/2 top-12 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl sm:h-96 sm:w-96" />

      <div className="mx-auto max-w-content text-center">
        <img
          src="/assets/logos/wealthcoin-logo.png"
          alt="WealthCoin emblem"
          className="mx-auto mb-8 h-24 w-24 rounded-full border border-border-subtle/25 object-cover sm:h-32 sm:w-32"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
          Digital assets with purpose
        </p>
        <h1 className="mx-auto mt-5 max-w-4xl text-display font-bold tracking-tight">
          Faith-driven <span className="text-accent-hover">FinTech</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-secondary sm:text-xl">
          Rooted in faith. Powered by blockchain. Built around education,
          responsible implementation, and wise stewardship.
        </p>

        <div className="mx-auto mt-9 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/academy"
            className="btn-gold min-h-12 w-full px-6 py-3 text-center font-semibold sm:w-auto"
          >
            Explore the Academy
          </Link>
          <Link
            to="/wtcs"
            className="btn-ghost min-h-12 w-full px-6 py-3 text-center font-semibold sm:w-auto"
          >
            WealthCoin Solutions
          </Link>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl gap-6 border-t border-border-subtle/25 pt-8 sm:grid-cols-3 sm:gap-4">
          {highlights.map((highlight) => (
            <div key={highlight.label} className="px-4">
              <dt className="font-display text-3xl font-semibold text-accent sm:text-4xl">
                {highlight.value}
              </dt>
              <dd className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-secondary">
                {highlight.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
