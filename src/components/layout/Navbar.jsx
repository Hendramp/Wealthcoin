import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  useAppKit,
  useAppKitAccount,
} from "@reown/appkit/react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { supabase } from "../../lib/supabase";
import AnnouncementBar from "./AnnouncementBar";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Foundation", href: "/#foundation" },
  { label: "Academy", href: "/academy" },
  { label: "Founder", href: "/founder" },
  { label: "Library", href: "/#library" },
  { label: "Tokenomics", href: "/tokenomics" },
  { label: "WTCS", href: "/wtcs" },
  { label: "Privacy", href: "/privacy-notice" },
  { label: "Hub", href: "/hub" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Purchase", href: "/#purchase" }
];

function shortenAddress(address) {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function scrollToHash(hash) {
  if (!hash) return;

  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    // Handle hash navigation on mount (e.g. arriving at /#purchase)
    scrollToHash(location.hash);
  }, [location.pathname, location.hash]);

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

  function handleLogOut() {
    logOut();
    closeMenu();
  }

  function openSignIn() {
    setMobileOpen(false);
    setAuthError("");
    setSignInOpen(true);
  }

  function closeSignIn() {
    setSignInOpen(false);
    setEmail("");
    setPassword("");
    setAuthError("");
  }

  async function handleSignIn(event) {
    event.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setAuthLoading(false);

    if (error) {
      setAuthError("Invalid email or password.");
      return;
    }

    closeSignIn();
  }

  function handleNavClick(link) {
    closeMenu();

    // If we're already on the home page, scroll to the anchor directly
    if (link.href.startsWith("/#") && location.pathname === "/") {
      scrollToHash(link.href);
    }
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[#D4AF37]/20 bg-black/90 backdrop-blur-md">
        <AnnouncementBar />

        <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-8 lg:px-10">
          <Link
            to="/#home"
            onClick={() => {
              closeMenu();
              if (location.pathname === "/") scrollToHash("#home");
            }}
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
          </Link>

          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link)}
                className="text-sm uppercase tracking-wide text-white/70 transition hover:text-[#D4AF37]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/#purchase"
              onClick={() => handleNavClick({ href: "/#purchase" })}
              className="btn-gold hidden min-h-[44px] items-center rounded-xl px-4 py-2.5 text-xs font-bold sm:flex sm:px-4 sm:text-sm"
            >
              Purchase WTC
            </Link>

            {user ? (
              <button
                type="button"
                onClick={handleLogOut}
                className="min-h-[44px] rounded-xl border border-[#D4AF37]/25 bg-black/60 px-3 py-2.5 text-xs font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10 sm:px-4 sm:text-sm"
              >
                {user.username}
                <span className="hidden sm:inline"> · Log out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openSignIn}
                className="flex min-h-[44px] items-center rounded-xl border border-[#D4AF37]/25 bg-black/60 px-3 py-2.5 text-xs font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10 sm:px-4 sm:text-sm"
              >
                Sign in
              </button>
            )}

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
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link)}
                  className="flex min-h-[50px] items-center justify-between rounded-xl border border-transparent px-4 text-sm font-semibold uppercase tracking-wide text-white/75 transition hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>

            <Link
              to="/#purchase"
              onClick={() => handleNavClick({ href: "/#purchase" })}
              className="btn-gold mt-6 flex min-h-[52px] w-full items-center justify-center rounded-xl px-5 py-3 font-bold"
            >
              Purchase WTC
            </Link>

            {user ? (
              <button
                type="button"
                onClick={handleLogOut}
                className="btn-gold mt-3 min-h-[52px] w-full rounded-xl px-5 py-3 font-bold"
              >
                Log out ({user.username})
              </button>
            ) : (
              <button
                type="button"
                onClick={openSignIn}
                className="btn-gold mt-3 flex min-h-[52px] w-full items-center justify-center rounded-xl px-5 py-3 font-bold"
              >
                Sign in
              </button>
            )}

            <button
              type="button"
              onClick={openWalletModal}
              className="btn-gold mt-3 min-h-[52px] w-full rounded-xl px-5 py-3 font-bold"
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

      {createPortal(
        signInOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={closeSignIn}
          >
            <div
              className="w-full max-w-md rounded-2xl border border-[#D4AF37]/20 bg-[#020403] p-6 shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="mb-1 font-display text-xl font-bold text-[#D4AF37]">
                Sign in to WealthCoin
              </h2>
              <p className="mb-6 text-sm text-white/50">
                Sign in to list on the Marketplace, post in the Hub, and more.
              </p>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
                  />
                </div>

                {authError && <p className="text-sm text-red-400">{authError}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="min-h-[48px] flex-1 rounded-xl bg-gradient-to-br from-[#F0D878] to-[#B8860B] px-5 py-3 font-bold text-black transition hover:brightness-110 disabled:opacity-50"
                  >
                    {authLoading ? "Signing in…" : "Sign in"}
                  </button>
                  <button
                    type="button"
                    onClick={closeSignIn}
                    className="min-h-[48px] rounded-xl border border-white/10 bg-black/40 px-5 py-3 font-bold text-white/60 transition hover:text-white/80"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <p className="pt-4 text-center text-xs text-white/40">
                No account yet?{" "}
                <Link
                  to="/hub"
                  onClick={closeSignIn}
                  className="font-semibold text-[#D4AF37] hover:text-[#e6c55a]"
                >
                  Create one on the Hub
                </Link>
              </p>
            </div>
          </div>
        ),
        document.body
      )}
    </>
  );
}
