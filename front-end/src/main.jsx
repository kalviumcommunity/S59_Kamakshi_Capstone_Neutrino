import React from 'react';
import ReactDOM from 'react-dom';
import Registration from './pages/registration.jsx';
import './tailwind.css';
import Login from './pages/login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobeDemo } from './components/ui/globeDemo.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      {/*<Route exact path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
*/}
<GlobeDemo />
  </Router>
);
