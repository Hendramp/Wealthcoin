import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import FoundationSection from "../components/home/FoundationSection";
import LibrarySection from "../components/home/LibrarySection";
import TokenomicsSection from "../components/home/TokenomicsSection";
import EarlyAccessSection from "../components/home/EarlyAccessSection";
import useWallet from "../hooks/useWallet";
import Footer from "../components/Layout/Footer";

export default function HomePage() {
  const {
    account,
    error,
    isCorrectNetwork,
    connectWallet,
    switchNetwork,
  } = useWallet();

  return (
    <>
      <Navbar
        account={account}
        connectWallet={connectWallet}
      />

      <main>
        <Hero />

<FoundationSection />

<LibrarySection />

<TokenomicsSection />

<EarlyAccessSection
  account={account}
  error={error}
  isPolygon={isCorrectNetwork}
  connectWallet={connectWallet}
  switchToPolygon={switchNetwork}
/>
      </main>

      <Footer />
    </>
  );
}