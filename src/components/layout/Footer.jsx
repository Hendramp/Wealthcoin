import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-black px-4 py-10 text-center sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="navbar-coin-frame">
            <img
              src="/assets/logos/wealthcoin-logo.png"
              alt="WealthCoin"
              className="navbar-coin-image"
            />
          </div>

          <h3 className="mt-3 font-display text-2xl text-[#D4AF37]">
            WealthCoin
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
            Built on Faith. Driven by Integrity. Committed to Stewardship.
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
          <a
            href="#early-access"
            className="btn-gold flex min-h-[48px] items-center justify-center rounded-xl px-5 py-3 text-sm font-bold"
          >
            Join Early Access
          </a>

          <a
            href="mailto:WTCteam@outlook.com"
            className="btn-ghost flex min-h-[48px] items-center justify-center rounded-xl px-5 py-3 text-sm font-bold"
          >
            Contact Support
          </a>
        </div>

        <div className="mx-auto mt-7 max-w-xl border-t border-white/10 pt-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]/75">
            Early Access Support
          </p>

          <a
            href="mailto:WTCteam@outlook.com"
            className="mt-2 inline-flex min-h-[44px] items-center break-all text-sm text-white/70 transition hover:text-[#D4AF37]"
          >
            WTCteam@outlook.com
          </a>
        </div>

        <p className="mt-5 text-xs leading-5 text-white/30">
          © {new Date().getFullYear()} WealthCoin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}