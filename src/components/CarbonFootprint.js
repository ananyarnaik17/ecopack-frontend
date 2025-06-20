import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CarbonFootprint.css';

function CarbonFootprint() {
    const [submissions, setSubmissions] = useState([]);
    const [totalCarbon, setTotalCarbon] = useState(0);

    const emissionFactors = {
        air: 0.5,
        sea: 0.2,
        land: 0.1,
        local: 0.05,
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get-submissions`);
            setSubmissions(response.data);
            calculateCarbonFootprint(response.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    const calculateCarbonFootprint = (data) => {
        let total = 0;

        data.forEach(sub => {
            const weight = parseFloat(sub.formData?.weight || '0');
            const method = sub.formData?.shippingMethod?.toLowerCase() || 'land';

            if (emissionFactors[method]) {
                total += weight * emissionFactors[method];
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
