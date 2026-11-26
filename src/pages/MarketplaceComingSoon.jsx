import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import marketplaceConstruction from "../assets/marketplace-construction.png";

export default function MarketplaceComingSoon() {
  return (
    <div className="hero-bg relative min-h-screen overflow-hidden text-white">
      <Navbar />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-36 sm:px-6 sm:pt-40">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary transition hover:text-accent"
        >
          ← Back to WealthCoin
        </Link>

        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-accent">
            THE MARKETPLACE
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Buy, Sell &amp; List{" "}
            <span className="bg-gradient-to-r from-accent-hover via-accent to-accent bg-clip-text text-transparent">
              in WTC
            </span>
          </h1>

          <p className="mt-5 font-display text-xl font-bold text-accent">
            Coming soon.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-secondary">
            We're building the WealthCoin marketplace — a space for stewards to trade goods and services using WTC. It's not open yet. We'll announce when it is, and we'd rather open it once and open it right than rush it.
          </p>

          <div className="mx-auto mt-8 w-full max-w-[320px] overflow-hidden rounded-3xl border border-accent/20 bg-base shadow-accent-soft">
            <img
              src={marketplaceConstruction}
              alt="A cheerful dog in a yellow hard hat and blue overalls holding a red wrench"
              className="block h-auto w-full"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 min-[640px]:flex-row min-[640px]:justify-center">
            <Link
              to="/academy"
              className="min-h-[48px] rounded-xl bg-gradient-to-br from-accent-hover to-accent px-6 py-3 font-bold text-black shadow-accent-soft transition hover:-translate-y-0.5 hover:shadow-accent-soft active:translate-y-0"
            >
              Get marketplace alerts by signing up for the academy.
            </Link>
            <Link
              to="/hub"
              className="min-h-[48px] rounded-xl border border-accent/25 bg-black/60 px-6 py-3 font-bold text-accent transition hover:bg-accent/10"
            >
              Visit the Community Hub
            </Link>
            <Link
              to="/marketplace-preview"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-accent/40 bg-accent/10 px-6 py-3 font-bold text-accent transition hover:bg-accent/20"
            >
              Preview Marketplace (Not Active)
            </Link>
          </div>

          <p className="mt-5 text-sm leading-6 text-secondary">
            Feel free to post in the hub in the meantime — the community is open.
          </p>
        </section>
      </main>
    </div>
  );
}
