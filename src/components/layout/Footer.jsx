import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-black px-5 py-8 text-center">
      <h3 className="font-display text-xl text-[#D4AF37] sm:text-2xl">
        WealthCoin
      </h3>

      <p className="mt-2 text-sm text-white/55">
        Built on Faith. Driven by Integrity. Committed to Stewardship.
      </p>

      <div className="mx-auto mt-5 max-w-sm border-t border-white/10 pt-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]/75">
          Early Access Support
        </p>

        <a
          href="mailto:WTCteam@outlook.com"
          className="mt-1.5 inline-block text-sm text-white/70 transition hover:text-[#D4AF37]"
        >
          WTCteam@outlook.com
        </a>
      </div>

      <p className="mt-4 text-xs text-white/30">
        © {new Date().getFullYear()} WealthCoin. All rights reserved.
      </p>
    </footer>
  );
}