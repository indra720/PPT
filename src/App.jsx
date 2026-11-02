import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ExplorerPage from './pages/ExplorerPage';
import TopicsPage from './pages/TopicsPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import NotFound from './pages/NotFound';

// App component: renders fixed Header and connects client-side routes with top offset
export default function App() {
  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        fontFamily: "system-ui, 'Segoe UI', Arial, sans-serif",
      }}
      className="min-h-screen flex flex-col"
    >
      {/* Top Navigation Bar: Fixed to the top */}
      <Header />

      {/* Page Routing: with padding-top offset matching the fixed header height on all screens */}
      <div className="flex-1 pt-[108px] sm:pt-[94px] lg:pt-[70px]">
        <Routes>
          <Route path="/" element={<ExplorerPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
