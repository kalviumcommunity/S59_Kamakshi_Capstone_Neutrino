import React from 'react';
import ReactDOM from 'react-dom';
import Registration from './pages/form/registration.jsx';
import './tailwind.css';
import Login from './pages/form/login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <LandingPage />
  </Router>
);
