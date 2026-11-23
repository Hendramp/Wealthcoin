import React from "react";
import { Link } from "react-router-dom";

export default function MarketplaceSection() {
  return (
    <section
      id="marketplace"
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            The Marketplace
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Buy, Sell & List in WTC
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            A space for stewards to trade goods and services using WealthCoin —
            the currency of the ecosystem.
          </p>
          <Link
            to="/marketplace"
            className="btn-gold mt-8 inline-flex min-h-[48px] items-center rounded-xl px-6 py-3 font-bold"
          >
            Explore the Marketplace →
          </Link>
        </div>
      </div>
    </section>
  );
}
