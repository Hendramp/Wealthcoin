import React from "react";
import {
  useAppKit,
  useAppKitAccount,
} from "@reown/appkit/react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Foundation", href: "#foundation" },
  { label: "Community", href: "#community" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Library", href: "#foundation" },
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

  function openWalletModal() {
    open({
      view: isConnected ? "Account" : "Connect",
    });
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">
        <a href="#home" className="flex items-center gap-3">
          {/* Same cropped logo treatment as the Hero */}
          <div className="navbar-coin-frame">
            <img
              src="/assets/logos/wealthcoin-logo.png"
              alt="WealthCoin"
              className="navbar-coin-image"
            />
          </div>

          <span className="font-display text-xl font-bold text-[#D4AF37] sm:text-2xl">
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

        <button
          type="button"
          onClick={openWalletModal}
          className="btn-gold rounded-xl px-4 py-3 text-sm font-bold sm:px-5"
        >
          {isConnected
            ? shortenAddress(address)
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
}