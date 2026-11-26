import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";

const CATEGORIES = [
  { id: "prayer", label: "Prayer Requests", emoji: "🙏" },
  { id: "scam", label: "Scam Alerts", emoji: "🛡️" },
  { id: "question", label: "Questions & Learning", emoji: "💡" },
  { id: "general", label: "General / Fellowship", emoji: "💬" },
];

export default function PostForm({ onPosted }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    if (!user) return;

    setPosting(true);
    setError("");

    const { error: insertErr } = await supabase.from("hub_posts").insert({
      user_id: user.id,
      content: content.trim(),
      category,
    });

    setPosting(false);

    if (insertErr) {
      setError("Couldn't post. Try again.");
      return;
    }

    setContent("");
    if (onPosted) onPosted();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              category === cat.id
                ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]"
                : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white/80"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={500}
        rows={3}
        placeholder="Share something..."
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white placeholder-white/35 outline-none focus:border-[#D4AF37]/60"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">{content.length}/500</span>
        <button
          type="submit"
          disabled={posting || !content.trim()}
          className="rounded-full bg-[#D4AF37] px-5 py-2 text-sm font-bold text-black transition hover:bg-[#e6c55a] disabled:opacity-40"
        >
          {posting ? "Posting…" : "Post"}
        </button>
      </div>

      <p className="text-[11px] text-white/35">
        No wallet addresses, seed phrases, or private keys — ever.
      </p>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
