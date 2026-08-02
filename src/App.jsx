import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import WTCSPage from "./pages/WTCSPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wtcs" element={<WTCSPage />} />
      </Routes>
    </BrowserRouter>
  );
}