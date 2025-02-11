import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UrlsPage from "./pages/UrlsPage";
import EmbedCodePage from "./pages/EmbedCodePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urls" element={<UrlsPage />} />
        <Route path="/embed-code" element={<EmbedCodePage />} />
      </Routes>
    </Router>
  );
};

export default App;
