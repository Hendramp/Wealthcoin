// src/pages/LessonPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lesson1Fork from "../components/academy/Lesson1Fork";
import Lesson1OkxIntro from "../components/academy/Lesson1OkxIntro";
import Lesson1CexIntro from "../components/academy/Lesson1CexIntro";
import Lesson1OkxGuide from "../components/academy/Lesson1OkxGuide";
import Lesson1WrapUp from "../components/academy/Lesson1WrapUp";
import Lesson2BlockchainBasics from "../components/academy/Lesson2BlockchainBasics";
import Lesson3Stewardship from "../components/academy/Lesson3Stewardship";
import Lesson4Transactions from "../components/academy/Lesson4Transactions";
import BuyingSellingOpener from "../components/academy/BuyingSellingOpener";
import BuyingSellingExchange from "../components/academy/BuyingSellingExchange";
import BuyingSellingPhantom from "../components/academy/BuyingSellingPhantom";
import BuyingSellingCore from "../components/academy/BuyingSellingCore";
import BuyingSellingSelling from "../components/academy/BuyingSellingSelling";
import Lesson6 from "../components/academy/Lesson6";

export default function LessonPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
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
          onComplete={() => navigate("/academy/lesson/blockchain-basics")}
        />
      );
    }
  }

  if (slug === "blockchain-basics") {
    return <Lesson2BlockchainBasics />;
  }

  if (slug === "faithful-stewardship") {
    return <Lesson3Stewardship />;
  }

  if (slug === "keys-and-transactions") {
    return <Lesson4Transactions />;
  }

  if (slug === "buying-selling") {
    return <BuyingSellingOpener />;
  }

  if (slug === "buying-selling-exchange") {
    return <BuyingSellingExchange />;
  }

  if (slug === "buying-selling-phantom") {
    return <BuyingSellingPhantom />;
  }

  if (slug === "buying-selling-core") {
    return <BuyingSellingCore />;
  }

  if (slug === "buying-selling-selling") {
    return <BuyingSellingSelling />;
  }

  if (slug === "stablecoins-volatile") {
    return <Lesson6 />;
  }

  // Fallback
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020302] px-4 pb-20 pt-8 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_40%),linear-gradient(180deg,#020302_0%,#061008_60%,#020202_100%)]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
          Lesson 5 · Buying & Selling
        </p>
        <h1 className="mt-2 font-display text-3xl text-white sm:text-4xl">
          Lesson Coming Soon
        </h1>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-base leading-8 text-white/70">Coming soon.</p>
        </div>
      </div>
    </main>
  );
}
