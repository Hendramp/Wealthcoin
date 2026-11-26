import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle/30 bg-surface px-6 py-12">
      <div className="mx-auto grid max-w-content gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/assets/logos/wealthcoin-logo.png"
              alt="WealthCoin emblem"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-xl text-primary">WealthCoin</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-secondary">
                WealthCoin Solutions
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-secondary">
            Built on faith. Driven by integrity. Committed to stewardship.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-secondary">
            <li><Link className="transition hover:text-accent-hover" to="/">Home</Link></li>
            <li><Link className="transition hover:text-accent-hover" to="/academy">Academy</Link></li>
            <li><Link className="transition hover:text-accent-hover" to="/founder">Founder&apos;s Story</Link></li>
            <li><Link className="transition hover:text-accent-hover" to="/wtcs">WTCS</Link></li>
            <li><Link className="transition hover:text-accent-hover" to="/tokenomics">Tokenomics</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            WTCS Contact
          </h2>
          <a
            href="mailto:WTCteam@outlook.com"
            className="mt-4 inline-flex min-h-11 items-center break-all text-sm text-secondary transition hover:text-accent-hover"
          >
            WTCteam@outlook.com
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-content border-t border-border-subtle/20 pt-5 text-xs text-secondary">
        © {new Date().getFullYear()} WealthCoin. All rights reserved.
      </div>
    </footer>
  );
}
