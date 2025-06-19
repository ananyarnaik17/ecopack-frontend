// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar({ setView }) {
    return (
        <div className="sidebar">
            <h2>📦 Supply Chain Dashboard</h2>
            <button onClick={() => setView('submissions')}>Customer Submissions</button>
            <button onClick={() => setView('material')}>Material Usage</button>
            <button onClick={() => setView('feedback')}>Customer Feedback</button>
            <button onClick={() => window.history.back()}>⬅️ Go Back</button>
        </div>
    );
}

export default Sidebar;
