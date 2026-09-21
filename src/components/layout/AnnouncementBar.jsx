import React, { useEffect, useState } from "react";

const ANNOUNCEMENTS = [
  {
    id: "lessons-3-4-live",
    text: "Lessons 3 & 4 are live — Faithful Stewardship and Keys & Transactions are now live in the Academy.",
    href: "/academy",
    cta: "Enter the Academy",
  },
  {
    id: "staking-deferred",
    text: "Staking is deferred until further notice. We'll announce when it's ready.",
  },
];

const STORAGE_KEY = "wealthcoin-dismissed-announcements";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDismissed(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    }
    setVisible(true);
  }, []);

  const active = ANNOUNCEMENTS.find((a) => !dismissed.includes(a.id));

  function dismiss() {
    if (!active) {
      return;
    }
    const next = [...dismissed, active.id];
    setDismissed(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }

  if (!visible || !active) {
    return null;
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-24 z-40 w-[520px] max-w-[calc(100vw-2rem)] rounded-2xl border-2 border-[#D4AF37]/40 bg-[#071009]/95 p-6 pr-12 shadow-2xl backdrop-blur">
        <p className="text-base font-medium leading-7 text-white/90">
          {active.text}
        </p>
        {active.href && (
          <a
            href={active.href}
            className="mt-3 inline-block rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#e8c65a]"
          >
            {active.cta} →
          </a>
        )}

        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/60 transition hover:text-white"
          aria-label="Dismiss announcement"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
