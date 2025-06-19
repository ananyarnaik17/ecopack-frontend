// src/components/CarbonFootprint.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarbonFootprint.css';

function CarbonFootprint() {
    const [submissions, setSubmissions] = useState([]);
    const [totalCarbon, setTotalCarbon] = useState(0);

    // Carbon footprint factors in kg CO₂ per kg shipped
    const emissionFactors = {
        Air: 1.3,   // 1.3 kg CO₂ per kg
        Sea: 0.02,  // 0.02 kg CO₂ per kg
        Land: 0.1   // 0.1 kg CO₂ per kg
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-submissions');
            setSubmissions(response.data);
            calculateCarbonFootprint(response.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    const calculateCarbonFootprint = (data) => {
        let total = 0;

        data.forEach(sub => {
            const weight = parseFloat(sub.formData.weight) || 0;
            const shippingMethod = sub.formData.shipping || 'Land';

            if (emissionFactors[shippingMethod]) {
                total += weight * emissionFactors[shippingMethod];
            }
        });

        setTotalCarbon(total.toFixed(2));
    };

    return (
        <div className="carbon-footprint-container">
            <h2>🌱 Estimated Total Carbon Footprint</h2>
            <p>{totalCarbon} kg CO₂ (based on shipment methods)</p>
        </div>
    );
}

export default CarbonFootprint;
