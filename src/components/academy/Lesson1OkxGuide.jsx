// src/components/academy/Lesson1OkxGuide.jsx
import React, { useState } from "react";

const TOTAL_STEPS = 3;

export default function Lesson1OkxGuide({ onBack, onComplete, initialStep = 1 }) {
  const [step, setStep] = useState(initialStep);

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <button onClick={step === 1 ? onBack : prev} className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#D4AF37]">
          <span aria-hidden="true">←</span>
          {step === 1 ? "Back" : "Previous step"}
        </button>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="font-semibold uppercase tracking-wider text-[#D4AF37]">
              OKX Wallet Setup
            </span>
            <span>Step {step} of {TOTAL_STEPS}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#D4AF37] transition-all"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          {step === 1 && (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Step 1</p>
              <h1 className="mt-2 font-display text-2xl text-white sm:text-3xl">Choose Your Wallet</h1>
              <p className="mt-3 text-sm leading-7 text-white/60">
                OKX offers two wallet options. For this lesson, we'll use the self-custodial Web3 wallet app. (wallet with the green logo).
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-5">
                  <p className="font-semibold text-white">OKX Wallet (Web3 Wallet)</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">
                    Self-custodial — you control your assets. This is what we'll set up.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold text-white">OKX App Wallet (Hybrid)</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">
                    Includes exchange features like buying & selling. Be advised it places holds on funds.This is the black logo wallet
                  </p> Not needed for this lesson. 
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Step 2</p>
              <h1 className="mt-2 font-display text-2xl text-white sm:text-3xl">Create or Import</h1>
              <p className="mt-3 text-sm leading-7 text-white/60">
                Open the OKX Wallet app and choose to create a new wallet. You can also import an existing one using your recovery phrase.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-7 text-white/70">
                  Tap <span className="text-white">Create new wallet</span> to start fresh. If you already have a recovery phrase from another wallet, you can use <span className="text-white">Import wallet</span> instead.
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">Step 3</p>
              <h1 className="mt-2 font-display text-2xl text-white sm:text-3xl">Secure Your Wallet</h1>
              <p className="mt-3 text-sm leading-7 text-white/60">
                This is the most important step. Your recovery phrase is the master key to your wallet.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
                  <p className="text-sm leading-7 text-white/70">
                    <span className="text-white">Write it down on paper.</span> Never store it digitally — no screenshots, no notes apps.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
                  <p className="text-sm leading-7 text-white/70">
                    <span className="text-white">Keep it offline</span> in a safe place only you can access.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
                  <p className="text-sm leading-7 text-white/70">
                    <span className="text-white">Never share it.</span> Not with support, not with anyone. Anyone with your phrase controls your assets.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5">
                  <p className="text-sm leading-7 text-white/70">
                    <span className="text-white">Never enter it into a website or app</span> that asks for it — that's how wallets get drained.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button
              onClick={prev}
              className="rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Back
            </button>
          )}
          <button
            onClick={step === TOTAL_STEPS ? onComplete : next}
            className="flex-1 rounded-full bg-[#D4AF37] py-3.5 font-semibold text-black transition hover:bg-[#e0c04d]"
          >
            {step === TOTAL_STEPS ? "Finish →" : "Next →"}
          </button>
        </div>
      </div>
    </main>
  );
}
