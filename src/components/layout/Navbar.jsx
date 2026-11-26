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
  const activeHref = location.pathname === "/"
    ? `/#${location.hash.replace("#", "") || "home"}`
    : location.pathname;

  useEffect(() => {
    // Handle hash navigation on mount (e.g. arriving at /#purchase)
    scrollToHash(location.hash);
    setMobileOpen(false);
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
    document.body.classList.toggle("scroll-locked", mobileOpen);

    return () => {
      document.body.classList.remove("scroll-locked");
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
      <header className="sticky top-0 z-50 w-full border-b border-border-subtle/30 bg-base/80 backdrop-blur-md">
        <AnnouncementBar />

        <div className="flex h-16 items-center justify-between gap-2 px-3 sm:h-20 sm:gap-4 sm:px-8 lg:px-10">
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

            <span className="truncate font-display text-lg font-bold text-accent sm:text-2xl">
              WealthCoin
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link)}
                className={`relative py-2 text-sm uppercase tracking-wide transition hover:text-accent ${
                  activeHref === link.href
                    ? "text-accent after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-accent"
                    : "text-secondary"
                }`}
                aria-current={activeHref === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/#purchase"
              onClick={() => handleNavClick({ href: "/#purchase" })}
              className="btn-gold hidden min-h-[44px] items-center rounded-xl px-4 py-2.5 text-xs font-bold lg:flex lg:px-4 lg:text-sm"
            >
              Purchase WTC
            </Link>

            {user ? (
              <button
                type="button"
                onClick={handleLogOut}
                className="hidden min-h-[44px] rounded-button border border-border-subtle/40 bg-surface px-3 py-2.5 text-xs font-bold text-accent transition hover:bg-accent/10 lg:block lg:px-4 lg:text-sm"
              >
                {user.username}
                <span className="hidden sm:inline"> · Log out</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={openSignIn}
                className="hidden min-h-[44px] items-center rounded-button border border-border-subtle/40 bg-surface px-3 py-2.5 text-xs font-bold text-accent transition hover:bg-accent/10 lg:flex lg:px-4 lg:text-sm"
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
                : <><span className="sm:hidden">Connect</span><span className="hidden sm:inline">{!isConnected ? "Connect Wallet" : ""}</span></>}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((openState) => !openState)}
              className="flex h-11 w-11 items-center justify-center rounded-button border border-border-subtle/40 bg-surface text-accent transition active:scale-95 lg:hidden"
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
          className={`fixed inset-0 z-40 bg-base/95 backdrop-blur-md transition lg:hidden ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={closeMenu}
          aria-hidden={!mobileOpen}
        >
          <nav
            id="mobile-navigation"
            className={`h-full w-full overflow-y-auto bg-base px-6 pb-8 pt-24 shadow-2xl transition-transform duration-200 ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-secondary">
              Navigate
            </p>

            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link)}
                  className="flex min-h-[50px] items-center justify-between rounded-button border border-transparent px-4 text-sm font-semibold uppercase tracking-wide text-secondary transition hover:border-border-subtle/40 hover:bg-accent/5 hover:text-accent"
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

            <p className="mt-6 text-center text-xs leading-5 text-secondary">
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
              className="max-h-[calc(100svh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-accent/20 bg-base p-5 shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="mb-1 font-display text-xl font-bold text-accent">
                Sign in to WealthCoin
              </h2>
              <p className="mb-6 text-sm text-secondary">
                Sign in to list on the Marketplace, post in the Hub, and more.
              </p>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="min-h-[48px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white placeholder:text-secondary transition focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-secondary">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="min-h-[48px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-base text-white placeholder:text-secondary transition focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>

                {authError && <p className="text-sm text-accent-hover">{authError}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="min-h-[48px] flex-1 rounded-xl bg-gradient-to-br from-accent-hover to-accent px-5 py-3 font-bold text-black transition hover:brightness-110 disabled:opacity-50"
                  >
                    {authLoading ? "Signing in…" : "Sign in"}
                  </button>
                  <button
                    type="button"
                    onClick={closeSignIn}
                    className="min-h-[48px] rounded-xl border border-white/10 bg-black/40 px-5 py-3 font-bold text-secondary transition hover:text-primary"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <p className="pt-4 text-center text-xs text-secondary">
                No account yet?{" "}
                <Link
                  to="/hub"
                  onClick={closeSignIn}
                  className="font-semibold text-accent hover:text-accent-hover"
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
