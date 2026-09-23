import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WTCSPage from "./pages/WTCSPage";
import AcademyPage from "./pages/AcademyPage";
import LessonPage from "./pages/LessonPage";
import TokenomicsPage from "./pages/TokenomicsPage";
import PrivacyNotice from "./pages/PrivacyNotice";
import FounderPage from "./pages/FounderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wtcs" element={<WTCSPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/academy/lesson/:slug" element={<LessonPage />} />
        <Route path="/tokenomics" element={<TokenomicsPage />} />
        <Route path="/privacy-notice" element={<PrivacyNotice />} />
        <Route path="/founder" element={<FounderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
