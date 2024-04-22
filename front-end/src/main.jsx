import React from 'react';
import ReactDOM from 'react-dom';
import Registration from './pages/registration.jsx';
import './tailwind.css';
import Login from './pages/login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);
