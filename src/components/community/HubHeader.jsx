import React from "react";

export default function HubHeader() {
  return (
    <header className="border-b border-white/10 bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Community hub
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white">WealthCoin Circle</h1>
        </div>
      </div>
    </header>
  );
}
