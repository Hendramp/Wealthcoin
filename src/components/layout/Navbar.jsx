import React, { useEffect, useState } from "react";
import {
  useAppKit,
  useAppKitAccount,
} from "@reown/appkit/react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Foundation", href: "#foundation" },
  { label: "Community", href: "#community" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Library", href: "#library" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Early Access", href: "#early-access" },
];

function shortenAddress(address) {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function Navbar() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function closeOnResize() {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("resize", closeOnResize);

    return () => {
      window.removeEventListener("resize", closeOnResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function openWalletModal() {
    setMobileOpen(false);

    open({
      view: isConnected ? "Account" : "Connect",
    });
  }

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#home"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="navbar-coin-frame shrink-0">
            <img
              src="/assets/logos/wealthcoin-logo.png"
              alt="WealthCoin"
              className="navbar-coin-image"
            />
          </div>

          <span className="truncate font-display text-lg font-bold text-[#D4AF37] sm:text-2xl">
            WealthCoin
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-wide text-white/70 transition hover:text-[#D4AF37]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={openWalletModal}
            className="btn-gold min-h-[44px] rounded-xl px-3 py-2.5 text-xs font-bold sm:px-5 sm:text-sm"
          >
            {isConnected
              ? shortenAddress(address)
              : "Connect"}
            <span className="hidden sm:inline">
              {!isConnected ? " Wallet" : ""}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((openState) => !openState)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-black/60 text-[#D4AF37] transition active:scale-95 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 top-20 z-40 h-[calc(100svh-5rem)] bg-black/70 backdrop-blur-sm transition lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden={!mobileOpen}
      >
        <nav
          id="mobile-navigation"
          className={`ml-auto h-full w-[min(86vw,360px)] overflow-y-auto border-l border-[#D4AF37]/20 bg-[#020403] p-5 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/40">
            Navigate
          </p>

          <div className="space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="flex min-h-[50px] items-center justify-between rounded-xl border border-transparent px-4 text-sm font-semibold uppercase tracking-wide text-white/75 transition hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={openWalletModal}
            className="btn-gold mt-6 min-h-[52px] w-full rounded-xl px-5 py-3 font-bold"
          >
            {isConnected
              ? `Manage ${shortenAddress(address)}`
              : "Connect Wallet"}
          </button>

          <p className="mt-6 text-center text-xs leading-5 text-white/35">
            Built on Polygon with stewardship, transparency, and faith.
          </p>
        </nav>
      </div>
    </header>
  );
}