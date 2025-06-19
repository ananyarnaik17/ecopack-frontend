/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ For navigation
import FormPage from './FormPage';
import ThreeDView from './ThreeDView';
import FeedbackForm from './FeedbackForm';
import './Dashboard.css';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('form');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('supplyChainUser'); // ✅ Clear stored login info
    navigate('/supply-chain-login'); // ✅ Redirect to login page
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to EcoPack AI</h1>
        <p>Your Sustainable Packaging Manager Tool</p>
        <p className="tagline">Get intelligent, eco-friendly packaging recommendations in just a few clicks!</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <nav className="dashboard-nav">
        <button
          className={activeComponent === 'form' ? 'active' : ''}
          onClick={() => setActiveComponent('form')}
        >
          Get Recommendations
        </button>
        <button
          className={activeComponent === 'threeD' ? 'active' : ''}
          onClick={() => setActiveComponent('threeD')}
        >
          3D View
        </button>
        <button
          className={activeComponent === 'feedback' ? 'active' : ''}
          onClick={() => setActiveComponent('feedback')}
        >
          Feedback
        </button>
      </nav>

      <main className="dashboard-content">
        {activeComponent === 'form' && <FormPage />}
        {activeComponent === 'threeD' && <ThreeDView />}
        {activeComponent === 'feedback' && <FeedbackForm />}
      </main>
    </div>
  );
}

export default Dashboard;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ For navigation
import FormPage from './FormPage';
import ThreeDView from './ThreeDView';
import FeedbackForm from './FeedbackForm';
import './Dashboard.css';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('form');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('supplyChainUser'); // ✅ Clear stored login info
    navigate('/supply-chain-login'); // ✅ Redirect to login page
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to EcoPack AI</h1>
        <p>Your Sustainable Packaging Manager Tool</p>
        <p className="tagline">Get intelligent, eco-friendly packaging recommendations in just a few clicks!</p>
      </header>

      <nav className="dashboard-nav">
        <button
          className={activeComponent === 'form' ? 'active' : ''}
          onClick={() => setActiveComponent('form')}
        >
          Get Recommendations
        </button>
        <button
          className={activeComponent === 'threeD' ? 'active' : ''}
          onClick={() => setActiveComponent('threeD')}
        >
          3D View
        </button>
        <button
          className={activeComponent === 'feedback' ? 'active' : ''}
          onClick={() => setActiveComponent('feedback')}
        >
          Feedback
        </button>
      </nav>

      <main className="dashboard-content">
        {activeComponent === 'form' && <FormPage />}
        {activeComponent === 'threeD' && <ThreeDView />}
        {activeComponent === 'feedback' && <FeedbackForm />}
      </main>
    </div>
  );
}

export default Dashboard;

