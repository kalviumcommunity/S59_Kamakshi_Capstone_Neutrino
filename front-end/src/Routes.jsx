import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Registration from './pages/form/registration.jsx'; 

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default AppRoutes;
