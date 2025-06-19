// src/pages/SupplyChainDashboard.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CustomerSubmissions from '../components/CustomerSubmissions';
import MaterialUsage from '../components/MaterialUsage';
import CarbonFootprint from '../components/CarbonFootprint';
import Feedback from '../components/Feedback';
import './SupplyChainDashboard.css';

function SupplyChainDashboard() {
    const [view, setView] = useState('submissions');

    const renderView = () => {
        switch (view) {
            case 'submissions':
                return <CustomerSubmissions />;
            case 'material':
                return <MaterialUsage />;
            case 'carbon':
                return <CarbonFootprint />;
            case 'feedback':
                return <Feedback />;
            default:
                return <CustomerSubmissions />;
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar Section */}
            <Sidebar setView={setView} />

            {/* Main Dashboard Content Section */}
            <div className="dashboard-content">
                {renderView()}
            </div>
        </div>
    );
}

export default SupplyChainDashboard;
