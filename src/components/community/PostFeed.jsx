import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import { useAuth } from "../../lib/auth";

const CATEGORIES = [
  { id: "prayer", label: "Prayer Requests", emoji: "🙏", color: "text-sky-300 border-sky-300/40 bg-sky-300/10" },
  { id: "scam", label: "Scam Alerts", emoji: "🛡️", color: "text-accent-hover border-danger/40 bg-danger/10" },
  { id: "question", label: "Questions & Learning", emoji: "💡", color: "text-accent-hover border-accent-hover/40 bg-accent-hover/10" },
  { id: "general", label: "General / Fellowship", emoji: "💬", color: "text-secondary border-white/15 bg-white/5" },
];

const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

export default function PostFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [isAdmin, setIsAdmin] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(true);
  const [minorsOpen, setMinorsOpen] = useState(true);
  const [generalRulesOpen, setGeneralRulesOpen] = useState(true);

  const loadPosts = useCallback(async () => {
    setLoading(true);

    const { data: postData, error: postErr } = await supabase
      .from("hub_posts")
      .select("post, content, created_at, user_id, category")
      .order("created_at", { ascending: false });

    if (postErr) {
      setError("Couldn't load posts.");
      setLoading(false);
      return;
    }

    const { data: heartData } = await supabase
      .from("hub_hearts")
      .select("post_id");

    const heartCounts = {};
    (heartData || []).forEach((h) => {
      heartCounts[h.post_id] = (heartCounts[h.post_id] || 0) + 1;
    });

    const { data: profiles } = await supabase
      .from("hub_profiles")
      .select("user_id, username");

    const profileMap = {};
    (profiles || []).forEach((p) => {
      profileMap[p.user_id] = p.username;
    });

    const enriched = (postData || []).map((post) => ({
      ...post,
      username: profileMap[post.user_id] || "unknown",
      hearts_count: heartCounts[post.post] || 0,
    }));

    setPosts(enriched);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    if (!user) return;
    async function checkAdmin() {
      const { data } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", user.id);
      if (data && data.length > 0) setIsAdmin(true);
    }
    checkAdmin();
  }, [user]);

  async function addPost() {
    await loadPosts();
  }

  function handleReported(postId) {
    setPosts((prev) => prev.filter((p) => p.post !== postId));
  }

  const filtered = activeCategory === "all"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "hearts") {
      return (b.hearts_count || 0) - (a.hearts_count || 0);
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const rulesPanel = (
    <aside className="sticky top-8 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl">
      {/* Gold top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-lg">🛡️</span>
            <h3 className="font-display text-base font-bold tracking-wide text-accent">The Circle Rules</h3>
          </div>
          <button
            type="button"
            onClick={() => setRulesOpen((v) => !v)}
            className="text-secondary transition hover:text-accent"
            aria-label={rulesOpen ? "Collapse rules" : "Expand rules"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${rulesOpen ? "rotate-180" : ""}`}>
              <path d="M3 6l5 5 5-5" />
            </svg>
          </button>
        </div>

        {rulesOpen && (
          <div className="mt-5 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <button
                type="button"
                onClick={() => setMinorsOpen((v) => !v)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5"
              >
                <span className="text-sm font-semibold text-primary">For our users under 18</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={`text-secondary transition-transform duration-200 ${minorsOpen ? "rotate-180" : ""}`}>
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </button>
              {minorsOpen && (
                <div className="border-t border-white/10 px-5 py-4 text-[13px] leading-6 text-secondary">
                  <ul className="list-disc space-y-2 pl-4">
                    <li>Never share your real name, school, or city with anyone here.</li>
                    <li>Never move off this site to talk — no DMs, Discord, WhatsApp, nothing.</li>
                    <li>Even if someone seems friendly, never share your info or accept anything from them.</li>
                    <li>If anyone makes you uncomfortable or asks for your info — tell a trusted adult, and report it here.</li>
                  </ul>
                  <blockquote className="mt-4 border-l-2 border-accent/60 pl-3.5 italic text-secondary">
                    "But whoso shall offend one of these little ones who believe in me, it would be better for him that a millstone were hanged about his neck, and that he were drowned in the depth of the sea."
                    <span className="mt-1.5 block not-italic text-xs text-secondary">— Matthew 18:6 (JUB)</span>
                  </blockquote>
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <button
                type="button"
                onClick={() => setGeneralRulesOpen((v) => !v)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5"
              >
                <span className="text-sm font-semibold text-primary">Community Hub Rules</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={`text-secondary transition-transform duration-200 ${generalRulesOpen ? "rotate-180" : ""}`}>
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </button>
              {generalRulesOpen && (
                <ul className="border-t border-white/10 px-5 py-4 text-[13px] leading-6 text-secondary list-disc space-y-2 pl-4">
                  <li>No wallet addresses, seed phrases, or private keys — ever.</li>
                  <li>No scams, shilling, or sketchy links.</li>
                  <li>No personal attacks — disagree with the idea, not the person.</li>
                  <li>No spam or self-promo spam.</li>
                  <li>Keep it clean — no NSFW, no hate, no slurs.</li>
                  <li>No doxxing or sharing anyone's personal info.</li>
                  <li>No pump talk or price-coordinating.</li>
                  <li>No sharing minors' info or DMing them off the Hub.</li>
                </ul>
              )}
            </div>

            <p className="px-1 text-xs leading-5 text-secondary">
              Report bad behavior to <a href="mailto:WTCteam@outlook.com" className="font-semibold text-accent transition hover:text-accent-hover">WTCteam@outlook.com</a>. We don't play that.
            </p>
          </div>
        )}
      </div>
    </aside>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-24">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        <span className="text-sm text-secondary">Gathering the Circle…</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-accent-hover py-8">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Wordmark with the real WealthCoin logo */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-accent/30 bg-gradient-to-b from-accent/15 to-transparent shadow-accent-soft">
          <img
            src="/assets/logos/wealthcoin-logo.png"
            alt="WealthCoin"
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white">
          The WealthCoin <span className="text-accent">Circle</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-secondary">
          Encouragement, warnings, and questions among God's people. Share something good.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-72 shrink-0">{rulesPanel}</div>

        <div className="flex-1 min-w-0 space-y-6">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                activeCategory === "all"
                  ? "border-accent bg-accent/15 text-accent shadow-accent-soft"
                  : "border-white/15 bg-white/5 text-secondary hover:border-white/30 hover:text-primary"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "border-accent bg-accent/15 text-accent shadow-accent-soft"
                    : "border-white/15 bg-white/5 text-secondary hover:border-white/30 hover:text-primary"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Sort + compose */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1 w-fit backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setSortBy("latest")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                  sortBy === "latest" ? "bg-accent text-black shadow-accent-soft" : "text-secondary hover:text-primary"
                }`}
              >
                Latest
              </button>
              <button
                type="button"
                onClick={() => setSortBy("hearts")}
                className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                  sortBy === "hearts" ? "bg-accent text-black shadow-accent-soft" : "text-secondary hover:text-primary"
                }`}
              >
                ♥ Most hearted
              </button>
            </div>
            <PostForm onPosted={addPost} />
          </div>

          {sorted.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-12 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-2xl">
                {activeCategory === "all" ? "🌱" : CATEGORY_MAP[activeCategory]?.emoji || "💬"}
              </div>
              <p className="text-secondary">
                {activeCategory === "all"
                  ? "No posts yet — be the first to share something good."
                  : `Be the first to share a ${CATEGORY_MAP[activeCategory]?.label.toLowerCase() || "post"}…`}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {sorted.map((post) => (
                <PostCard
                  key={post.post}
                  post={post}
                  categoryMeta={CATEGORY_MAP[post.category]}
                  isAdmin={isAdmin}
                  onDeleted={loadPosts}
                  onReported={handleReported}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
