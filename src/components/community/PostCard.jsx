import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import ReplySection from "./ReplySection";

function timeAgo(ts) {
  const seconds = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

export default function PostCard({ post, categoryMeta, isAdmin, onDeleted, onReported }) {
  const { user } = useAuth();
  const [hearted, setHearted] = useState(false);
  const [hearts, setHearts] = useState(post.hearts_count || 0);
  const [reportedByMe, setReportedByMe] = useState(false);
  const [hasReports, setHasReports] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    let active = true;

    async function load() {
      const { data: heartRows } = await supabase
        .from("hub_hearts")
        .select("post_id")
        .eq("post_id", post.post)
        .eq("user_id", user.id);
      if (active && heartRows && heartRows.length > 0) setHearted(true);

      const { data: myReports } = await supabase
        .from("hub_reports")
        .select("post_id")
        .eq("post_id", post.post)
        .eq("user_id", user.id);
      if (active && myReports && myReports.length > 0) setReportedByMe(true);

      const { data: allReports } = await supabase
        .from("hub_reports")
        .select("post_id")
        .eq("post_id", post.post);
      if (active && allReports && allReports.length > 0) setHasReports(true);
    }

    load();
    return () => { active = false; };
  }, [user, post.post]);

  async function toggleHeart() {
    if (!user || busy) return;
    setBusy(true);
    if (hearted) {
      const { error: delErr } = await supabase
        .from("hub_hearts")
        .delete()
        .eq("post_id", post.post)
        .eq("user_id", user.id);
      if (!delErr) {
        setHearted(false);
        setHearts((h) => Math.max(0, h - 1));
      }
    } else {
      const { error: insErr } = await supabase
        .from("hub_hearts")
        .insert({ post_id: post.post, user_id: user.id });
      if (!insErr) {
        setHearted(true);
        setHearts((h) => h + 1);
      }
    }
    setBusy(false);
  }

  async function handleReport() {
    if (!user || busy || reportedByMe) return;
    setBusy(true);
    const { error: insErr } = await supabase
      .from("hub_reports")
      .upsert(
        { post_id: post.post, user_id: user.id, reason: "reported by user" },
        { onConflict: "post_id,user_id", ignoreDuplicates: true }
      );
    setBusy(false);
    if (insErr) {
      setError("Couldn't report.");
      return;
    }
    setReportedByMe(true);
    setHasReports(true);
    // Hide it from this user's feed immediately
    if (onReported) onReported(post.post);
  }

  async function handleDelete() {
    if (!user || busy) return;
    const allowed = isAdmin || post.user_id === user.id;
    if (!allowed) return;
    if (!window.confirm("Remove this post?")) return;
    setBusy(true);
    const { error: delErr } = await supabase
      .from("hub_posts")
      .delete()
      .eq("post", post.post);
    setBusy(false);
    if (delErr) {
      setError("Couldn't delete.");
      return;
    }
    if (onDeleted) onDeleted();
  }

  const meta = categoryMeta || { label: "General / Fellowship", emoji: "💬" };
  const initial = (post.username || "?").charAt(0).toUpperCase();
  const showReported = reportedByMe || (isAdmin && hasReports);
  const isOwnPost = user && post.user_id === user.id;

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8a6d1f] text-sm font-bold text-black">
            {initial}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{post.username}</span>
              <span className="text-xs text-white/35">{timeAgo(post.created_at)}</span>
            </div>
            <span className="text-xs text-white/50">{meta.emoji} {meta.label}</span>
          </div>
        </div>

        {(isAdmin || isOwnPost) && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-400/20"
            title="Remove post"
          >
            Remove
          </button>
        )}
      </div>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/85">{post.content}</p>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={toggleHeart}
          disabled={!user || busy}
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            hearted
              ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]"
              : "border-white/10 bg-black/20 text-white/60 hover:text-white/85"
          }`}
        >
          <span>{hearted ? "♥" : "♡"}</span>
          <span>{hearts > 0 ? hearts : "Heart"}</span>
        </button>

        <button
          type="button"
          onClick={handleReport}
          disabled={!user || busy || reportedByMe}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
            showReported
              ? "border-red-500 bg-red-500 text-white"
              : "border-white/10 bg-black/20 text-white/60 hover:text-white/85"
          }`}
        >
          {showReported ? "Reported" : "⚠ Report"}
        </button>

        <button
          type="button"
          onClick={() => setRepliesOpen((v) => !v)}
          className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white/60 transition hover:text-white/85"
        >
          {repliesOpen ? "Hide replies" : "💬 Reply"}
        </button>
      </div>

      {repliesOpen && <ReplySection postId={post.post} />}

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </article>
  );
}
