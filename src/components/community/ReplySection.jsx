import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

function timeAgo(ts) {
  const seconds = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(ts).toLocaleDateString();
}

// One reply + its children + a reply box under it
function ReplyNode({ reply, profiles, onPosted, depth }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const children = reply.children || [];

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    setPosting(true);
    setError("");

    const { error: err } = await supabase
      .from("hub_replies")
      .insert({
        content: trimmed,
        user_id: user.id,
        post_id: reply.post_id,
        parent_id: reply.replies,
      });

    setPosting(false);
    if (err) {
      setError("Couldn't post reply.");
      return;
    }
    setContent("");
    setOpen(false);
    onPosted();
  }

  return (
    <div className={depth > 0 ? "ml-6 border-l border-white/10 pl-4" : ""}>
      <div className="rounded-2xl bg-black/20 p-3">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-primary">
            {profiles[reply.user_id] || "unknown"}
          </p>
          <p className="text-[10px] text-secondary">{timeAgo(reply.created_at)}</p>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm text-secondary">{reply.content}</p>

        {user && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-[11px] font-semibold text-accent hover:text-accent-hover"
          >
            {open ? "Cancel" : "Reply"}
          </button>
        )}

        {open && (
          <form onSubmit={handleSubmit} className="mt-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Reply to this…"
              maxLength={300}
              rows={2}
              className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 p-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-accent/60"
            />
            {error && <p className="mt-1 text-xs text-accent-hover">{error}</p>}
            <div className="mt-2 flex items-center justify-end gap-2">
              <span className="text-[10px] text-secondary">{content.length}/300</span>
              <button
                type="submit"
                disabled={posting || !content.trim()}
                className="rounded-2xl bg-accent px-3 py-1 text-xs font-bold text-black transition hover:bg-accent-hover disabled:opacity-50"
              >
                {posting ? "Posting…" : "Post"}
              </button>
            </div>
          </form>
        )}
      </div>

      {children.length > 0 && (
        <div className="mt-3 space-y-3">
          {children.map((child) => (
            <ReplyNode
              key={child.replies}
              reply={child}
              profiles={profiles}
              onPosted={onPosted}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReplySection({ postId }) {
  const { user } = useAuth();
  const [replies, setReplies] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  async function loadReplies() {
    const { data, error: err } = await supabase
      .from("hub_replies")
      .select("replies, content, created_at, user_id, post_id, parent_id")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (err) {
      setLoading(false);
      return;
    }

    const { data: profiles } = await supabase
      .from("hub_profiles")
      .select("user_id, username");
    const profileMap = {};
    (profiles || []).forEach((p) => {
      profileMap[p.user_id] = p.username;
    });

    // Build the thread tree from flat rows
    const byId = {};
    (data || []).forEach((r) => {
      byId[r.replies] = { ...r, children: [] };
    });
    const roots = [];
    (data || []).forEach((r) => {
      if (r.parent_id && byId[r.parent_id]) {
        byId[r.parent_id].children.push(byId[r.replies]);
      } else {
        roots.push(byId[r.replies]);
      }
    });

    setReplies(roots);
    setLoading(false);
  }

  useEffect(() => {
    loadReplies();
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    setPosting(true);
    setError("");

    const { error: err } = await supabase
      .from("hub_replies")
      .insert({
        content: trimmed,
        user_id: user.id,
        post_id: postId,
        parent_id: null,
      });

    setPosting(false);
    if (err) {
      setError("Couldn't post reply.");
      return;
    }
    setContent("");
    loadReplies();
  }

  if (!user) return null;

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Reply to this post…"
          maxLength={300}
          rows={2}
          className="w-full resize-none rounded-2xl border border-white/15 bg-white/5 p-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-accent/60"
        />
        {error && <p className="mt-1 text-xs text-accent-hover">{error}</p>}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-secondary">{content.length}/300</span>
          <button
            type="submit"
            disabled={posting || !content.trim()}
            className="rounded-2xl bg-accent px-4 py-1.5 text-xs font-bold text-black transition hover:bg-accent-hover disabled:opacity-50"
          >
            {posting ? "Posting…" : "Reply"}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-xs text-secondary">Loading replies…</p>
      ) : replies.length === 0 ? (
        <p className="text-xs text-secondary">No replies yet.</p>
      ) : (
        <div className="space-y-3">
          {replies.map((reply) => (
            <ReplyNode
              key={reply.replies}
              reply={reply}
              profiles={{}}
              onPosted={loadReplies}
              depth={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
