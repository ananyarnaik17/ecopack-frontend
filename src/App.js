// src/App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import ThreeDView from './pages/ThreeDView';
import FeedbackForm from './pages/FeedbackForm';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/three-d-view" element={<ThreeDView />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
*/

// src/App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import ThreeDView from './pages/ThreeDView';
import FeedbackForm from './pages/FeedbackForm';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/three-d-view" element={<ThreeDView />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;*/
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SupplyChainLogin from './pages/SupplyChainLogin';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import ThreeDView from './pages/ThreeDView';
import FeedbackForm from './pages/FeedbackForm';
import MaterialUsage from './pages/MaterialUsagePage';
import CarbonFootprint from './pages/CarbonFootprintPage';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/supply-login" />} />

        {/* Supply Chain Login */}
        <Route path="/supply-login" element={<SupplyChainLogin />} />

        {/* Landing Page after login */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Customer Routes */}
        <Route path="/form" element={<FormPage />} />
        <Route path="/three-d-view" element={<ThreeDView />} />
        <Route path="/feedback" element={<FeedbackForm />} />

        {/* Supply Chain Routes */}
        <Route path="/material-usage" element={<MaterialUsage />} />
        <Route path="/carbon-footprint" element={<CarbonFootprint />} />
        <Route path="/supply-feedback" element={<FeedbackForm />} /> {/* Reuse FeedbackForm here */}
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;

