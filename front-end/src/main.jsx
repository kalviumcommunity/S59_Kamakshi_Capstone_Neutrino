import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AppRoutes />
  </Router>
);
