import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./lib/auth";

import HomePage from "./pages/HomePage";
import WTCSPage from "./pages/WTCSPage";
import AcademyPage from "./pages/AcademyPage";
import LessonPage from "./pages/LessonPage";
import TokenomicsPage from "./pages/TokenomicsPage";
import PrivacyNotice from "./pages/PrivacyNotice";
import CommunityHubPage from "./pages/Communityhub";
import MarketplacePage from "./pages/MarketplacePage";
import MarketplaceComingSoon from "./pages/MarketplaceComingSoon";
import RulesPage from "./pages/RulesPage";
import AdminQueuePage from "./pages/AdminQueuePage";
import OrdersPage from "./pages/OrdersPage";

function SectionReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const targets = document.querySelectorAll("main section, main article");
    if (!("IntersectionObserver" in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((target) => {
      target.classList.add("section-reveal");
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SectionReveal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wtcs" element={<WTCSPage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/academy/lesson/:slug" element={<LessonPage />} />
          <Route path="/tokenomics" element={<TokenomicsPage />} />
          <Route path="/privacy-notice" element={<PrivacyNotice />} />
          <Route path="/hub" element={<CommunityHubPage />} />
          {/* MarketplacePage temporarily swapped out; restore this route to MarketplacePage later. */}
          <Route path="/marketplace" element={<MarketplaceComingSoon />} />
          {/* Admin-only marketplace preview route; remove after the public launch. */}
          <Route path="/marketplace-preview" element={<MarketplacePage />} />
          <Route path="/marketplace/rules" element={<RulesPage />} />
          <Route path="/admin/queue" element={<AdminQueuePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
