import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WTCSPage from "./pages/WTCSPage";
import AcademyPage from "./pages/AcademyPage";
import LessonPage from "./pages/LessonPage";
import TokenomicsPage from "./pages/TokenomicsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wtcs" element={<WTCSPage />} />
        <Route path="/academy" element={<AcademyPage />} />
        <Route path="/academy/lesson/:slug" element={<LessonPage />} />
        <Route path="/tokenomics" element={<TokenomicsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
