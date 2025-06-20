// src/pages/MaterialUsagePage.js
import React from 'react';
import MaterialUsage from '../components/MaterialUsage'; // ✅ correct path

function MaterialUsagePage() {
    return (
        <div className="page-container">
            <h1>Material Usage</h1>
            <MaterialUsage />
        </div>
    );
}

export default MaterialUsagePage;
