import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import FoundationSection from "../components/home/FoundationSection";
import LibrarySection from "../components/home/LibrarySection";
import TokenomicsSection from "../components/home/TokenomicsSection";
import EarlyAccessSection from "../components/home/EarlyAccessSection";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <FoundationSection />
        <LibrarySection />
        <TokenomicsSection />
        <EarlyAccessSection />
      </main>

      <Footer />
    </>
  );
}