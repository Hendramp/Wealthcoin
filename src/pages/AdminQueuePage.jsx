import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

const CATEGORY_LABELS = {
  handmade: "Handmade & Artisan",
  digital: "Digital Products",
  physical: "Physical Goods",
  services: "Services & Labor",
  business: "Business Services",
  local_food: "Local Food & Farm",
  ministry: "Ministry & Nonprofit",
  other: "Other",
};

const DELIVERY_LABELS = {
  ship: "Ships",
  digital: "Digital",
  local_pickup: "Local Pickup",
};

export default function AdminQueuePage() {
  const { user } = useAuth();
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    if (!user) return;
    checkAdmin();
  }, [user]);

  async function checkAdmin() {
    const { data } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .single();
    setIsAdmin(!!data);
  }

  useEffect(() => {
    if (isAdmin) fetchQueue();
  }, [isAdmin]);

  async function fetchQueue() {
    setLoading(true);
    const { data, error } = await supabase
      .from("moderation_queue")
      .select(`
        *,
        marketplace_listings (*)
      `)
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (!error) setQueue(data || []);
    setLoading(false);
  }

  async function handleAction(listingId, queueId, action) {
    setActionMsg("");

    if (action === "approve") {
      const { error: listingErr } = await supabase
        .from("marketplace_listings")
        .update({ status: "active" })
        .eq("id", listingId);

      if (listingErr) {
        setActionMsg(`Error approving: ${listingErr.message}`);
        return;
      }

      const { error: queueErr } = await supabase
        .from("moderation_queue")
        .update({ status: "approved", reviewed_at: new Date().toISOString() })
        .eq("id", queueId);

      if (queueErr) {
        setActionMsg(`Error updating queue: ${queueErr.message}`);
        return;
      }
    } else if (action === "remove") {
      const { error: listingErr } = await supabase
        .from("marketplace_listings")
        .update({ status: "removed" })
        .eq("id", listingId);

      if (listingErr) {
        setActionMsg(`Error removing: ${listingErr.message}`);
        return;
      }

      const { error: queueErr } = await supabase
        .from("moderation_queue")
        .update({ status: "removed", reviewed_at: new Date().toISOString() })
        .eq("id", queueId);

      if (queueErr) {
        setActionMsg(`Error updating queue: ${queueErr.message}`);
        return;
      }
    } else if (action === "ban") {
      const { error: listingErr } = await supabase
        .from("marketplace_listings")
        .update({ status: "banned" })
        .eq("id", listingId);

      if (listingErr) {
        setActionMsg(`Error banning: ${listingErr.message}`);
        return;
      }

      const { error: queueErr } = await supabase
        .from("moderation_queue")
        .update({ status: "banned", reviewed_at: new Date().toISOString() })
        .eq("id", queueId);

      if (queueErr) {
        setActionMsg(`Error updating queue: ${queueErr.message}`);
        return;
      }
    }

    setActionMsg("Action completed.");
    fetchQueue();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07110d] p-8 text-white">
        <p className="text-white/50">Loading moderation queue…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#07110d] p-8 text-white">
        <p className="text-white/70">You don't have access to this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07110d] p-8 text-white">
      <Link
        to="/marketplace"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] transition hover:text-[#e6c55a]"
      >
        ← Back to Marketplace
      </Link>

      <h1 className="mb-6 font-display text-2xl font-bold text-[#D4AF37]">
        Moderation Queue
      </h1>

      {actionMsg && (
        <p className="mb-4 rounded-lg border border-[#D4AF37]/25 bg-black/40 p-3 text-sm text-[#D4AF37]">
          {actionMsg}
        </p>
      )}

      {queue.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-white/70">No pending listings. You're all caught up.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {queue.map((item) => {
            const listing = item.marketplace_listings;
            return (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold">{listing.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">
                      {listing.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold text-[#D4AF37]">
                    {CATEGORY_LABELS[listing.category] ?? listing.category}
                  </span>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2 text-sm text-white/50 sm:grid-cols-4">
                  <span>{listing.price_wtc} WTC</span>
                  <span>{DELIVERY_LABELS[listing.delivery_method] ?? listing.delivery_method}</span>
                  {listing.city && (
                    <span>
                      {[listing.city, listing.state, listing.zip].filter(Boolean).join(", ")}
                    </span>
                  )}
                  <span>Listed {new Date(listing.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(listing.id, item.id, "approve")}
                    className="rounded-xl bg-[#2a6b3f] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#357c4e]"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(listing.id, item.id, "remove")}
                    className="rounded-xl bg-[#6b3f2a] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#7c4e35]"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleAction(listing.id, item.id, "ban")}
                    className="rounded-xl bg-[#6b2a2a] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#7c3535]"
                  >
                    Ban
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
