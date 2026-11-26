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
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40 transition hover:text-[#D4AF37]"
        >
          ← Back to WealthCoin
        </Link>

        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
            THE MARKETPLACE
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Buy, Sell &amp; List{" "}
            <span className="bg-gradient-to-r from-[#F0D878] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
              in WTC
            </span>
          </h1>

          <p className="mt-5 font-display text-xl font-bold text-[#D4AF37]">
            Coming soon.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/60">
            We're building the WealthCoin marketplace — a space for stewards to trade goods and services using WTC. It's not open yet. We'll announce when it is, and we'd rather open it once and open it right than rush it.
          </p>

          <div className="mx-auto mt-8 w-full max-w-[320px] overflow-hidden rounded-3xl border border-[#D4AF37]/20 bg-[#030303] shadow-[0_20px_60px_rgba(212,175,55,0.12)]">
            <img
              src={marketplaceConstruction}
              alt="A cheerful dog in a yellow hard hat and blue overalls holding a red wrench"
              className="block h-auto w-full"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 min-[640px]:flex-row min-[640px]:justify-center">
            <Link
              to="/academy"
              className="min-h-[48px] rounded-xl bg-gradient-to-br from-[#F0D878] to-[#B8860B] px-6 py-3 font-bold text-black shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(212,175,55,0.4)] active:translate-y-0"
            >
              Get marketplace alerts by signing up for the academy.
            </Link>
            <Link
              to="/hub"
              className="min-h-[48px] rounded-xl border border-[#D4AF37]/25 bg-black/60 px-6 py-3 font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              Visit the Community Hub
            </Link>
            <Link
              to="/marketplace-preview"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/20"
            >
              Preview Marketplace (Not Active)
            </Link>
          </div>

          <p className="mt-5 text-sm leading-6 text-white/50">
            Feel free to post in the hub in the meantime — the community is open.
          </p>
        </section>
      </main>
    </div>
  );
}
