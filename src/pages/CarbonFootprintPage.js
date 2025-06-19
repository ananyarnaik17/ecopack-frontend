// src/pages/CarbonFootprintPage.js
import React from 'react';
import CustomerSubmissions from '../components/CustomerSubmissions';
import './PageStyles.css';

function CarbonFootprintPage() {
    return (
        <div className="page-container">
            <h1>Carbon Footprint</h1>
            <CustomerSubmissions />
        </div>
    );
}

export default CarbonFootprintPage;
