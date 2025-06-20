import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './CustomerSubmissions.css';

function CustomerSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [productTypeFilter, setProductTypeFilter] = useState('');
    const [durabilityFilter, setDurabilityFilter] = useState('');
    const [shippingMethodFilter, setShippingMethodFilter] = useState('');

    const emissionFactors = {
        air: 0.5,
        sea: 0.2,
        land: 0.1,
        local: 0.05,
    };

    const getEmissionFactor = (method) => {
        if (typeof method !== 'string') return 0.3;
        const normalized = method.trim().toLowerCase();
        return emissionFactors[normalized] || 0.3;
    };

    const calculateCarbonFootprint = (submission) => {
        const weightRaw = submission.formData?.weight;
        const weight = parseFloat(weightRaw?.toString().trim() || '0');
        const method = submission.formData?.shippingMethod;
        if (isNaN(weight) || weight <= 0) return 0;
        return weight * getEmissionFactor(method);
    };

    const getEcoScore = (carbon) => {
        if (carbon <= 0) return '⚪ Not Calculated';
        if (carbon <= 5) return '🌱 Excellent';
        if (carbon <= 15) return '🌿 Good';
        if (carbon <= 30) return '🍂 Moderate';
        return '🔥 Poor';
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recommendations`);
                setSubmissions(res.data);
                setFilteredSubmissions(res.data);
            } catch (err) {
                console.error('Error fetching submissions:', err.message);
            }
        };
        fetchSubmissions();
    }, []);

    useEffect(() => {
        let filtered = submissions;

        if (productTypeFilter !== '') {
            filtered = filtered.filter((sub) =>
                sub.formData?.productType?.toLowerCase() === productTypeFilter.toLowerCase()
            );
        }

        if (durabilityFilter !== '') {
            filtered = filtered.filter((sub) =>
                sub.formData?.durability?.toLowerCase() === durabilityFilter.toLowerCase()
            );
        }

        if (shippingMethodFilter !== '') {
            filtered = filtered.filter((sub) =>
                sub.formData?.shippingMethod?.toLowerCase() === shippingMethodFilter.toLowerCase()
            );
        }

        setFilteredSubmissions(filtered);
    }, [productTypeFilter, durabilityFilter, shippingMethodFilter, submissions]);

    const uniqueValues = (field) => {
        const valueSet = new Set();
        submissions.forEach((sub) => {
            const value = sub.formData?.[field];
            if (typeof value === 'string' && value.trim() !== '') {
                valueSet.add(value.toLowerCase());
            }
        });
        return Array.from(valueSet);
    };

    const resetFilters = () => {
        setProductTypeFilter('');
        setDurabilityFilter('');
        setShippingMethodFilter('');
    };

    const exportToExcel = () => {
        const exportData = filteredSubmissions.map((sub) => {
            const formData = sub.formData || {};
            const dimensions = formData.dimensions || {};
            const carbon = calculateCarbonFootprint(sub);

            return {
                'Product Name': formData.productName || 'N/A',
                'Product Type': formData.productType || 'N/A',
                'Dimensions': dimensions.length && dimensions.width && dimensions.height
                    ? `${dimensions.length} × ${dimensions.width} × ${dimensions.height} cm`
                    : 'N/A',
                'Weight (kg)': formData.weight || 'N/A',
                'Durability': formData.durability || 'N/A',
                'Shipping Method': formData.shippingMethod || 'N/A',
                'Recommended Package': sub.recommendation || 'N/A',
                'Carbon Footprint (kg CO₂)': carbon.toFixed(2),
                'Eco Score': getEcoScore(carbon)
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');
        XLSX.writeFile(workbook, 'Submissions.xlsx');
    };

    return (
        <div className="submissions-wrapper">
            <div className="header-with-export">
                <button onClick={exportToExcel} className="export-button">Export to Excel</button>
            </div>

            <div className="filters-container">
                <select value={productTypeFilter} onChange={(e) => setProductTypeFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Product Types</option>
                    {[ 'Mug', 'Bottle', 'Flask', 'Plate', 'Cutlery', 'Vase', 'Book', 'Glassware',
                       'Laptop', 'Smartphone', 'Camera', 'Shoes', 'Lamp', 'Speaker', 'Helmet',
                       'Mirror', 'Tablet', 'Headphones', 'Toy', 'Jewelry'].map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                    ))}
                </select>

                <select value={durabilityFilter} onChange={(e) => setDurabilityFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Durability Levels</option>
                    {['fragile', 'medium', 'strong'].map((level, idx) => (
                        <option key={idx} value={level}>{level}</option>
                    ))}
                </select>

                <select value={shippingMethodFilter} onChange={(e) => setShippingMethodFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Shipping Methods</option>
                    {['air', 'sea', 'land', 'local'].map((method, idx) => (
                        <option key={idx} value={method}>{method}</option>
                    ))}
                </select>

                <button onClick={resetFilters} className="reset-button">Reset Filters</button>
            </div>

            {filteredSubmissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <table className="submissions-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Dimensions (L×W×H cm)</th>
                            <th>Weight (kg)</th>
                            <th>Durability</th>
                            <th>Shipping Method</th>
                            <th>Recommended Package</th>
                            <th>Carbon Footprint</th>
                            <th>Eco Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((sub, index) => {
                            const carbon = calculateCarbonFootprint(sub);
                            const dimensions = sub.formData?.dimensions;
                            return (
                                <tr key={index}>
                                    <td>{sub.formData?.productName || 'N/A'}</td>
                                    <td>{sub.formData?.productType || 'N/A'}</td>
                                    <td>
                                        {dimensions?.length && dimensions?.width && dimensions?.height
                                            ? `${dimensions.length} × ${dimensions.width} × ${dimensions.height} cm`
                                            : 'N/A'}
                                    </td>
                                    <td>{sub.formData?.weight || 'N/A'}</td>
                                    <td>{sub.formData?.durability || 'N/A'}</td>
                                    <td>{sub.formData?.shippingMethod || 'N/A'}</td>
                                    <td>{sub.recommendation || 'N/A'}</td>
                                    <td>{carbon.toFixed(2)} kg CO₂</td>
                                    <td>{getEcoScore(carbon)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CustomerSubmissions;
