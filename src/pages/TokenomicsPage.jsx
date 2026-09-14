import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TokenomicsSection from "../components/home/TokenomicsSection";

export default function TokenomicsPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <TokenomicsSection />
      </main>
      <Footer />
    </>
  );
}
