import React from "react";
import Navbar from "../components/Layout/Navbar";
import Hero from "../components/home/Hero";
import FoundationSection from "../components/home/FoundationSection";
import EarlyAccessSection from "../components/home/EarlyAccessSection";
import useWallet from "../hooks/useWallet";

export default function HomePage() {
  const {
    account,
    error,
    isPolygon,
    connectWallet,
    switchToPolygon,
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

        <EarlyAccessSection
          account={account}
          error={error}
          isPolygon={isPolygon}
          connectWallet={connectWallet}
          switchToPolygon={switchToPolygon}
        />
      </main>
    </>
  );
}