import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Registration from './pages/form/registration.jsx'; 
import NewsPage from './components/main/NewPage.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/news/:category" element={<NewsPage />} />
    </Routes>
  );
}

export default AppRoutes;
