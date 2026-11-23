import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import Navbar from "../components/layout/Navbar";
import ListingForm from "./ListingForm";

const CATEGORIES = [
  { value: "handmade", label: "Handmade & Artisan" },
  { value: "digital", label: "Digital Products" },
  { value: "physical", label: "Physical Goods" },
  { value: "services", label: "Services & Labor" },
  { value: "business", label: "Business Services" },
  { value: "local_food", label: "Local Food & Farm" },
  { value: "ministry", label: "Ministry & Nonprofit" },
  { value: "other", label: "Other" },
];

// Mirrors the DB hard-ban list — catches the obvious stuff instantly, client-side
const HARD_BAN_TERMS = [
  "weed","marijuana","cannabis","cocaine","heroin","fentanyl","mdma","molly",
  "ecstasy","lsd","acid","shrooms","psilocybin","dmt","ketamine","meth",
  "oxycodone","xanax","adderall","gun","firearm","pistol","rifle","shotgun",
  "ammunition","explosive","bomb","grenade","switchblade","brass knuckles",
  "taser","trafficking","escort","livestock","cattle","counterfeit","stolen",
  "fake id","social security",
];

const LISTING_FEE_USD = 0.38;
const POOL_ADDRESS = "0x9feffb07add2daa2a19a78ea0aa1e5bbdbeaa57753151146a83fe91ccb306c7e";
const FALLBACK_PRICE_USD = 0.00025;

const MARKETPLACE_RULES = [
  "No illegal goods or services — including drugs, weapons, stolen property, or anything prohibited by law.",
  "No religious services for sale — ministry, prayer, or spiritual services may not be listed or priced.",
  "No livestock, animals, or people — no buying or selling of any kind.",
  "No counterfeit, fraudulent, or misleading items — everything must be accurately described.",
  "Listings must be priced and transacted in WTC.",
  "No personal information in listings — no wallet addresses, seed phrases, phone numbers, or emails.",
  "Be honest and respectful — scams, spam, and deceptive listings are permanently banned.",
  "You are responsible for fulfilling what you list. Honor your commitments.",
];

function shortenAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function MarketplacePage() {
  const { user } = useAuth();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [rulesAcked, setRulesAcked] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Price tracker + filters
  const [wtcPrice, setWtcPrice] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");

  async function fetchListings() {
    let query = supabase
      .from("marketplace_listings")
      .select("*, hub_profiles(username)")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (categoryFilter) query = query.eq("category", categoryFilter);
    if (deliveryFilter) query = query.eq("delivery_method", deliveryFilter);
    if (locationFilter) {
      const term = locationFilter.trim().toLowerCase();
      query = query.or(`city.ilike.%${term}%,state.ilike.%${term}%,zip.ilike.%${term}%`);
    }

    const { data, error } = await query;
    if (!error) setListings(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchListings();
  }, [locationFilter, categoryFilter, deliveryFilter]);

  // Live WTC price — same GeckoTerminal pool as PurchaseSection
  useEffect(() => {
    async function fetchPrice() {
      try {
        const gt = await fetch(
          `https://api.geckoterminal.com/api/v2/networks/polygon_pos/pools/${POOL_ADDRESS}`
        );
        const gtData = await gt.json();
        const gtPrice = gtData?.data?.attributes?.base_token_price_usd;
        if (gtPrice) {
          setWtcPrice(parseFloat(gtPrice));
          return;
        }
        throw new Error("no indexed price");
      } catch (err) {
        console.error("Price fetch failed:", err);
        setWtcPrice(FALLBACK_PRICE_USD);
      }
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const feeWtc = wtcPrice ? (LISTING_FEE_USD / wtcPrice).toFixed(4) : null;

  function checkHardBans(text) {
    const lower = text.toLowerCase();
    return HARD_BAN_TERMS.some((term) => lower.includes(term));
  }

  // Open the rules gate first — form only unlocks after acknowledgment
  function handleOpenList() {
    if (!user) {
      setShowSignIn(true);
      return;
    }
    // Wallet first — that's how you get paid in WTC
    if (!isConnected || !address) {
      open({ view: "Connect" });
      return;
    }
    setShowRules(true);
    setRulesAcked(false);
  }

  function handleRulesAck() {
    setRulesAcked(true);
    setShowRules(false);
    setShowForm(true);
  }

  async function handleListed() {
    setShowForm(false);
    await fetchListings();
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
    setShowSignIn(false);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07110d] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.07] blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-[420px] w-[560px] rounded-full bg-emerald-500/[0.05] blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[380px] w-[520px] rounded-full bg-[#D4AF37]/[0.04] blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-36 sm:px-6 sm:pt-40">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40 transition hover:text-[#D4AF37]"
        >
          ← Back to WealthCoin
        </Link>

        {/* Hero */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#D4AF37]">
              The Marketplace
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Buy, Sell &amp; List{" "}
              <span className="bg-gradient-to-r from-[#F0D878] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                in WTC
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/60">
              A space for stewards to trade goods and services using WealthCoin. Every listing is priced in WTC — the currency of the ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {user ? (
              <button
                type="button"
                onClick={handleOpenList}
                className="min-h-[48px] rounded-xl bg-gradient-to-br from-[#F0D878] to-[#B8860B] px-6 py-3 font-bold text-black shadow-[0_8px_30px_rgba(212,175,55,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(212,175,55,0.4)] active:translate-y-0"
              >
                {showForm ? "Close" : "+ List an item"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSignIn(true)}
                className="min-h-[48px] rounded-xl border border-[#D4AF37]/25 bg-black/60 px-6 py-3 font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
              >
                Sign in to list
              </button>
            )}
            <Link
              to="/marketplace/rules"
              className="min-h-[48px] rounded-xl border border-[#D4AF37]/25 bg-black/60 px-6 py-3 font-bold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
            >
              Rules &amp; Regulations
            </Link>
          </div>
        </div>

        {/* Live market bar: price, fee, wallet */}
        <div className="mb-10 grid gap-6 rounded-2xl border border-[#D4AF37]/15 bg-white/[0.03] p-5 backdrop-blur-xl sm:grid-cols-3 sm:gap-0 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              <span className="font-display text-sm font-bold text-[#D4AF37]">W</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/40">Live price</p>
              {wtcPrice ? (
                <p className="font-mono text-lg font-bold text-emerald-400">
                  1 WTC = ${wtcPrice.toFixed(5)}
                </p>
              ) : (
                <p className="text-lg text-white/40">Loading…</p>
              )}
            </div>
          </div>

          <div className="sm:border-l sm:border-white/10 sm:pl-6">
            <p className="text-xs uppercase tracking-wider text-white/40">Listing fee</p>
            {feeWtc ? (
              <>
                <p className="font-mono text-lg font-bold text-white">
                  $0.38 <span className="text-emerald-400">≈ {feeWtc} WTC</span>
                </p>
                <p className="mt-0.5 text-xs text-white/40">Subject to change over time.</p>
              </>
            ) : (
              <p className="text-lg text-white/40">Loading…</p>
            )}
          </div>

          <div className="sm:border-l sm:border-white/10 sm:pl-6">
            <p className="text-xs uppercase tracking-wider text-white/40">Wallet</p>
            {isConnected && address ? (
              <p className="font-mono text-lg font-bold text-emerald-400">
                {shortenAddress(address)}
              </p>
            ) : (
              <p className="text-lg text-white/40">Not connected</p>
            )}
          </div>
        </div>

        {/* Sign-in gate */}
        {showSignIn && !user && (
          <div className="mb-8 rounded-2xl border border-[#D4AF37]/20 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <h2 className="mb-1 font-display text-xl font-bold text-[#D4AF37]">
              Sign in to the Marketplace
            </h2>
            <p className="mb-6 text-sm text-white/50">
              Sign in to list goods and services in WTC. You'll stay right here after.
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
                  onClick={() => setShowSignIn(false)}
                  className="min-h-[48px] rounded-xl border border-white/10 bg-black/40 px-5 py-3 font-bold text-white/60 transition hover:text-white/80"
                >
                  Cancel
                </button>
              </div>
              <p className="pt-1 text-center text-xs text-white/40">
                No account yet?{" "}
                <Link to="/hub" className="font-semibold text-[#D4AF37] hover:text-[#e6c55a]">
                  Create one on the Hub
                </Link>
              </p>
            </form>
          </div>
        )}

        {/* Rules & Regulations acknowledgment gate */}
        {showRules && !showForm && (
          <div className="mb-8 rounded-2xl border border-[#D4AF37]/25 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <h2 className="mb-1 font-display text-xl font-bold text-[#D4AF37]">
              Marketplace Rules &amp; Regulations
            </h2>
            <p className="mb-6 text-sm text-white/50">
              Please review the rules before listing an item. You must acknowledge them to continue.
            </p>

            <div className="mb-6 space-y-3">
              {MARKETPLACE_RULES.map((rule, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition hover:border-[#D4AF37]/20"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37]">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/70">{rule}</p>
                </div>
              ))}
            </div>

            <label className="mb-6 flex items-start gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={rulesAcked}
                onChange={(e) => setRulesAcked(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#D4AF37]"
              />
              <span>
                I have read and agree to the Marketplace Rules &amp; Regulations above.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleRulesAck}
                disabled={!rulesAcked}
                className="min-h-[48px] flex-1 rounded-xl bg-gradient-to-br from-[#F0D878] to-[#B8860B] px-5 py-3 font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue to Listing
              </button>
              <button
                type="button"
                onClick={() => setShowRules(false)}
                className="min-h-[48px] rounded-xl border border-white/10 bg-black/40 px-5 py-3 font-bold text-white/60 transition hover:text-white/80"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showForm && user && (
          <div className="mb-8">
            <ListingForm onListed={handleListed} />
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="Filter by city, state, or ZIP..."
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <select
            value={deliveryFilter}
            onChange={(e) => setDeliveryFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white transition focus:border-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20"
          >
            <option value="">All Delivery Methods</option>
            <option value="ship">Ships</option>
            <option value="digital">Digital</option>
            <option value="local_pickup">Local Pickup</option>
          </select>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37]" />
            <p className="mt-4 text-sm text-white/40">Loading listings…</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-16 text-center backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5">
              <span className="text-xl">🛒</span>
            </div>
            <p className="font-display text-lg font-bold text-white/80">
              No active listings yet.
            </p>
            {user && (
              <p className="mt-2 text-sm text-white/50">
                Be the first to list something in WTC.
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => {
              const usdValue = wtcPrice ? listing.price_wtc * wtcPrice : null;
              return (
                <div
                  key={listing.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/30 hover:bg-white/[0.05] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                >
                  {listing.images && listing.images.length > 0 && (
                    <div className="relative -mx-6 -mt-6 mb-4 aspect-[4/3] w-[calc(100%+3rem)] overflow-hidden">
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      {listing.images.length > 1 && (
                        <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white/80">
                          +{listing.images.length - 1}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-1 flex-col">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold text-[#D4AF37]">
                          {listing.price_wtc} WTC
                        </span>
                        {usdValue && (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-400">
                            ≈ ${usdValue.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-white/40">
                        {listing.hub_profiles?.username ?? "Steward"}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white transition group-hover:text-[#F0D878]">
                      {listing.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-white/60">
                      {listing.description}
                    </p>

                    {listing.city && (
                      <p className="mt-2 text-xs text-white/40">
                        {[listing.city, listing.state, listing.zip].filter(Boolean).join(", ")}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-xs text-white/40">
                        {new Date(listing.created_at).toLocaleDateString()}
                      </span>
                      {user && user.id === listing.user_id ? (
                        <button
                          type="button"
                          onClick={async () => {
                            await supabase
                              .from("marketplace_listings")
                              .update({ status: "closed" })
                              .eq("id", listing.id);
                            fetchListings();
                          }}
                          className="text-xs font-bold text-white/50 transition hover:text-red-400"
                        >
                          Mark sold
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[#D4AF37]">
                          Contact on Hub
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
