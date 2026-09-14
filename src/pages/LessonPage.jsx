// src/pages/LessonPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Lesson1Fork from "../components/academy/Lesson1Fork";
import Lesson1OkxIntro from "../components/academy/Lesson1OkxIntro";
import Lesson1CexIntro from "../components/academy/Lesson1CexIntro";
import Lesson1OkxGuide from "../components/academy/Lesson1OkxGuide";
import Lesson1WrapUp from "../components/academy/Lesson1WrapUp";

export default function LessonPage() {
  const { slug } = useParams();
  const [step, setStep] = useState("fork");

  if (slug === "wallet-safety") {
    if (step === "fork") {
      return (
        <Lesson1Fork
          onNoWallet={() => setStep("okx-intro")}
          onHasWallet={() => setStep("guide-existing")}
        />
      );
    }
    if (step === "okx-intro") {
      return (
        <Lesson1OkxIntro
          onBack={() => setStep("fork")}
          onNext={() => setStep("cex-intro")}
        />
      );
    }
    if (step === "cex-intro") {
      return (
        <Lesson1CexIntro
          onBack={() => setStep("okx-intro")}
          onNext={() => setStep("guide")}
        />
      );
    }
    if (step === "guide") {
      return (
        <Lesson1OkxGuide
          onBack={() => setStep("cex-intro")}
          onComplete={() => setStep("wrap-up")}
        />
      );
    }
    if (step === "guide-existing") {
      return (
        <Lesson1OkxGuide
          initialStep={3}
          onBack={() => setStep("fork")}
          onComplete={() => setStep("wrap-up")}
        />
      );
    }
    if (step === "wrap-up") {
      return (
        <Lesson1WrapUp
          onBack={() => setStep("guide")}
          onComplete={() => {}}
        />
      );
    }
  }


  // Lesson 2 placeholder
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
          Lesson 2 · Blockchain Basics
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          Blockchain Basics
        </h1>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-base leading-8 text-white/70">Coming soon.</p>
        </div>
      </div>
    </main>
  );
}