import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import HubHeader from "../components/community/HubHeader";
import PostFeed from "../components/community/PostFeed";
import SignInGate from "./SignInGate";
import Navbar from "../components/layout/Navbar";


export default function CommunityHubPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="p-10 text-center text-white/50">Loading community…</p>;
  }

  return (
    <div className="min-h-screen bg-[#07110d] text-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8 pt-36 sm:pt-40">
        {!user ? (
          <SignInGate />
        ) : (
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] transition hover:text-[#e6c55a]"
            >
              ← Back to WealthCoin
            </Link>

            <div className="text-center">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                The WealthCoin Circle
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/60">
                A place for God's people to share, encourage, and learn together. Be kind, be
                wise, and build one another up — this is a house, not a marketplace of noise.
              </p>
            </div>

            <PostFeed />
          </div>
        )}
      </main>
    </div>
  );
}
