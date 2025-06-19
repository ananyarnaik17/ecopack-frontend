/* /* // src/components/CustomerSubmissions.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerSubmissions.css';

function CustomerSubmissions() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/recommendations/'); // or 8000 if that's correct
                console.log('Fetched Submissions:', res.data);
                setSubmissions(res.data);
            } catch (err) {
                console.error('Error fetching submissions:', err.message);
            }
        };

        fetchSubmissions();
    }, []);

    return (
        <div className="submissions-wrapper">
            <h2 className="submissions-title">Customer Submissions</h2>

            {submissions.length === 0 ? (
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
                            <th>Additional Requirements</th>
                            <th>Recommended Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub, index) => (
                            <tr key={index}>
                                <td>{sub.formData?.productName || 'N/A'}</td>
                                <td>{sub.formData?.productType || 'N/A'}</td>
                                <td>
                                    {sub.formData?.dimensions?.length && sub.formData?.dimensions?.width && sub.formData?.dimensions?.height
                                        ? `${sub.formData.dimensions.length} × ${sub.formData.dimensions.width} × ${sub.formData.dimensions.height} cm`
                                        : 'N/A'}
                                </td>
                                <td>{sub.formData?.weight || 'N/A'}</td>
                                <td>{sub.formData?.durability || 'N/A'}</td>
                                <td>{sub.formData?.shippingMethod || 'N/A'}</td>
                                <td>{sub.formData?.additionalRequirements || 'None'}</td>
                                <td>{sub.recommendation || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CustomerSubmissions;
 */
// src/components/CustomerSubmissions.js
// src/components/CustomerSubmissions.js

/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './CustomerSubmissions.css';

function CustomerSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);

    const [productTypeFilter, setProductTypeFilter] = useState('');
    const [durabilityFilter, setDurabilityFilter] = useState('');
    const [shippingMethodFilter, setShippingMethodFilter] = useState('');

    const getSafeString = (value) => {
        return typeof value === 'string' ? value.toLowerCase() : '';
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/recommendations/');
                console.log('Fetched Submissions:', res.data);
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
                getSafeString(sub.formData?.productType) === productTypeFilter.toLowerCase()
            );
        }

        if (durabilityFilter !== '') {
            filtered = filtered.filter((sub) =>
                getSafeString(sub.formData?.durability) === durabilityFilter.toLowerCase()
            );
        }

        if (shippingMethodFilter !== '') {
            filtered = filtered.filter((sub) =>
                getSafeString(sub.formData?.shippingMethod) === shippingMethodFilter.toLowerCase()
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

    // 🔥 Export to Excel function
    const exportToExcel = () => {
        const exportData = filteredSubmissions.map((sub) => ({
            'Product Name': sub.formData?.productName || 'N/A',
            'Product Type': sub.formData?.productType || 'N/A',
            'Dimensions': sub.formData?.dimensions?.length && sub.formData?.dimensions?.width && sub.formData?.dimensions?.height
                ? `${sub.formData.dimensions.length} × ${sub.formData.dimensions.width} × ${sub.formData.dimensions.height} cm`
                : 'N/A',
            'Weight (kg)': sub.formData?.weight || 'N/A',
            'Durability': sub.formData?.durability || 'N/A',
            'Shipping Method': sub.formData?.shippingMethod || 'N/A',
            'Additional Requirements': sub.formData?.additionalRequirements || 'None',
            'Recommended Package': sub.recommendation || 'N/A',
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Submissions');
        XLSX.writeFile(workbook, 'Customer_Submissions.xlsx');
    };

    return (
        <div className="submissions-wrapper">
            <div className="header-with-export">
                <h2 className="submissions-title">Customer Submissions</h2>
                <button onClick={exportToExcel} className="export-button">Export to Excel</button>
            </div>

            <div className="filters-container">
                <select value={productTypeFilter} onChange={(e) => setProductTypeFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Product Types</option>
                    {uniqueValues('productType').map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                    ))}
                </select>

                <select value={durabilityFilter} onChange={(e) => setDurabilityFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Durability Levels</option>
                    {uniqueValues('durability').map((level, idx) => (
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
                            <th>Additional Requirements</th>
                            <th>Recommended Package</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((sub, index) => (
                            <tr key={index}>
                                <td>{sub.formData?.productName || 'N/A'}</td>
                                <td>{sub.formData?.productType || 'N/A'}</td>
                                <td>
                                    {sub.formData?.dimensions?.length && sub.formData?.dimensions?.width && sub.formData?.dimensions?.height
                                        ? `${sub.formData.dimensions.length} × ${sub.formData.dimensions.width} × ${sub.formData.dimensions.height} cm`
                                        : 'N/A'}
                                </td>
                                <td>{sub.formData?.weight || 'N/A'}</td>
                                <td>{sub.formData?.durability || 'N/A'}</td>
                                <td>{sub.formData?.shippingMethod || 'N/A'}</td>
                                <td>{sub.formData?.additionalRequirements || 'None'}</td>
                                <td>{sub.recommendation || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CustomerSubmissions;


 */
// src/components/CustomerSubmissions.js

/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './CustomerSubmissions.css';

function CustomerSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);

    const [productTypeFilter, setProductTypeFilter] = useState('');
    const [durabilityFilter, setDurabilityFilter] = useState('');
    const [shippingMethodFilter, setShippingMethodFilter] = useState('');

    // Shipping method emission factors
    const emissionFactors = {
        air: 0.5,
        sea: 0.2,
        land: 0.1,
        local: 0.05,
    };

    // Defensive emission factor fetcher
    const getEmissionFactor = (method) => {
        if (typeof method !== 'string') return 0.3;
        return emissionFactors[method.toLowerCase()] || 0.3;
    };

    // Carbon footprint calculation for a submission
    const calculateCarbonFootprint = (submission) => {
        const weight = parseFloat(submission.formData?.weight) || 0;
        const method = submission.formData?.shippingMethod || '';
        const factor = getEmissionFactor(method);
        return weight * factor;
    };

    // Eco-score based on carbon footprint
    const getEcoScore = (carbonFootprint) => {
        if (carbonFootprint <= 5) return '🌱 Excellent';
        if (carbonFootprint <= 15) return '🌿 Good';
        if (carbonFootprint <= 30) return '🍂 Moderate';
        return '🔥 Poor';
    };

    // Fetch data
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/recommendations/');
                console.log('Fetched Submissions:', res.data);
                setSubmissions(res.data);
                setFilteredSubmissions(res.data);
            } catch (err) {
                console.error('Error fetching submissions:', err.message);
            }
        };

        fetchSubmissions();
    }, []);

    // Filter logic
    useEffect(() => {
        let filtered = submissions;

        if (productTypeFilter !== '') {
            filtered = filtered.filter((sub) =>
                (sub.formData?.productType || '').toLowerCase() === productTypeFilter.toLowerCase()
            );
        }

        if (durabilityFilter !== '') {
            filtered = filtered.filter((sub) =>
                (sub.formData?.durability || '').toLowerCase() === durabilityFilter.toLowerCase()
            );
        }

        if (shippingMethodFilter !== '') {
            filtered = filtered.filter((sub) =>
                (sub.formData?.shippingMethod || '').toLowerCase() === shippingMethodFilter.toLowerCase()
            );
        }

        setFilteredSubmissions(filtered);
    }, [productTypeFilter, durabilityFilter, shippingMethodFilter, submissions]);

    // Unique dropdown values
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

    // Export to Excel
    const exportToExcel = () => {
        const exportData = filteredSubmissions.map((sub) => {
            const carbonFootprint = calculateCarbonFootprint(sub);
            return {
                'Product Name': sub.formData?.productName || 'N/A',
                'Product Type': sub.formData?.productType || 'N/A',
                'Dimensions': sub.formData?.dimensions?.length && sub.formData?.dimensions?.width && sub.formData?.dimensions?.height
                    ? `${sub.formData.dimensions.length} × ${sub.formData.dimensions.width} × ${sub.formData.dimensions.height} cm`
                    : 'N/A',
                'Weight (kg)': sub.formData?.weight || 'N/A',
                'Durability': sub.formData?.durability || 'N/A',
                'Shipping Method': sub.formData?.shippingMethod || 'N/A',
                'Additional Requirements': sub.formData?.additionalRequirements || 'None',
                'Recommended Package': sub.recommendation || 'N/A',
                'Estimated Carbon Footprint (kg CO₂)': carbonFootprint.toFixed(2),
                'Eco Score': getEcoScore(carbonFootprint)
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Customer Submissions');
        XLSX.writeFile(workbook, 'Customer_Submissions.xlsx');
    };

    return (
        <div className="submissions-wrapper">
            <div className="header-with-export">
                <h2 className="submissions-title">Customer Submissions</h2>
                <button onClick={exportToExcel} className="export-button">Export to Excel</button>
            </div>

            <div className="filters-container">
                <select value={productTypeFilter} onChange={(e) => setProductTypeFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Product Types</option>
                    {uniqueValues('productType').map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                    ))}
                </select>

                <select value={durabilityFilter} onChange={(e) => setDurabilityFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Durability Levels</option>
                    {uniqueValues('durability').map((level, idx) => (
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
                            <th>Additional Requirements</th>
                            <th>Recommended Package</th>
                            <th>Carbon Footprint (kg CO₂)</th>
                            <th>Eco Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map((sub, index) => {
                            const carbonFootprint = calculateCarbonFootprint(sub);
                            return (
                                <tr key={index}>
                                    <td>{sub.formData?.productName || 'N/A'}</td>
                                    <td>{sub.formData?.productType || 'N/A'}</td>
                                    <td>
                                        {sub.formData?.dimensions?.length && sub.formData?.dimensions?.width && sub.formData?.dimensions?.height
                                            ? `${sub.formData.dimensions.length} × ${sub.formData.dimensions.width} × ${sub.formData.dimensions.height} cm`
                                            : 'N/A'}
                                    </td>
                                    <td>{sub.formData?.weight || 'N/A'}</td>
                                    <td>{sub.formData?.durability || 'N/A'}</td>
                                    <td>{sub.formData?.shippingMethod || 'N/A'}</td>
                                    <td>{sub.formData?.additionalRequirements || 'None'}</td>
                                    <td>{sub.recommendation || 'N/A'}</td>
                                    <td>{carbonFootprint.toFixed(2)} kg CO₂</td>
                                    <td>{getEcoScore(carbonFootprint)}</td>
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
 
 */
// src/components/CustomerSubmissions.js


// src/components/CustomerSubmissions.js

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

    // ✅ Fixed Emission Factor Logic
    const getEmissionFactor = (method) => {
        if (typeof method !== 'string') return 0.3;

        const normalizedMethod = method.trim().toLowerCase();
        return emissionFactors[normalizedMethod] || 0.3;
    };

    // ✅ Improved Carbon Footprint Calculation
    const calculateCarbonFootprint = (submission) => {
        const weightRaw = submission.formData?.weight;
        const weight = parseFloat(weightRaw?.toString().trim() || '0');
        const method = submission.formData?.shippingMethod;

        if (isNaN(weight) || weight <= 0) return 0;

        const factor = getEmissionFactor(method);
        return weight * factor;
    };

    // ✅ Refined Eco Score
    const getEcoScore = (carbonFootprint) => {
        if (carbonFootprint <= 0) return '⚪ Not Calculated';
        if (carbonFootprint <= 5) return '🌱 Excellent';
        if (carbonFootprint <= 15) return '🌿 Good';
        if (carbonFootprint <= 30) return '🍂 Moderate';
        return '🔥 Poor';
    };

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/recommendations/');
                console.log('Fetched Submissions:', res.data);
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
                (typeof sub.formData?.productType === 'string' ? sub.formData.productType : '').toLowerCase() === productTypeFilter.toLowerCase()
            );
        }

        if (durabilityFilter !== '') {
            filtered = filtered.filter((sub) =>
                (typeof sub.formData?.durability === 'string' ? sub.formData.durability : '').toLowerCase() === durabilityFilter.toLowerCase()
            );
        }

        if (shippingMethodFilter !== '') {
            filtered = filtered.filter((sub) =>
                (typeof sub.formData?.shippingMethod === 'string' ? sub.formData.shippingMethod : '').toLowerCase() === shippingMethodFilter.toLowerCase()
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

    const dataToDisplay = (productTypeFilter || durabilityFilter || shippingMethodFilter)
        ? filteredSubmissions
        : submissions;

    const exportToExcel = () => {
        const exportData = dataToDisplay.map((sub) => {
            const formData = sub.formData || {};
            const dimensions = formData.dimensions || {};
            const carbonFootprint = calculateCarbonFootprint(sub);

            return {
                'Product Name': formData.productName || 'N/A',
                'Product Type': formData.productType || 'N/A',
                'Dimensions': (dimensions.length && dimensions.width && dimensions.height)
                    ? `${dimensions.length} × ${dimensions.width} × ${dimensions.height} cm`
                    : 'N/A',
                'Weight (kg)': formData.weight || 'N/A',
                'Durability': formData.durability || 'N/A',
                'Shipping Method': formData.shippingMethod || 'N/A',
                'Recommended Package': sub.recommendation || 'N/A',
                'Estimated Carbon Footprint (kg CO₂)': carbonFootprint.toFixed(2),
                'Eco Score': getEcoScore(carbonFootprint)
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
                    {uniqueValues('productType').map((type, idx) => (
                        <option key={idx} value={type}>{type}</option>
                    ))}
                </select>

                <select value={durabilityFilter} onChange={(e) => setDurabilityFilter(e.target.value)} className="filter-dropdown">
                    <option value="">All Durability Levels</option>
                    {uniqueValues('durability').map((level, idx) => (
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

            {dataToDisplay.length === 0 ? (
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
                            <th>Carbon Footprint (kg CO₂)</th>
                            <th>Eco Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay.map((sub, index) => {
                            const carbonFootprint = calculateCarbonFootprint(sub);
                            return (
                                <tr key={index}>
                                    <td>{sub.formData?.productName || 'N/A'}</td>
                                    <td>{sub.formData?.productType || 'N/A'}</td>
                                    <td>
                                        {sub.formData?.dimensions?.length && sub.formData?.dimensions?.width && sub.formData?.dimensions?.height
                                            ? `${sub.formData.dimensions.length} × ${sub.formData.dimensions.width} × ${sub.formData.dimensions.height} cm`
                                            : 'N/A'}
                                    </td>
                                    <td>{sub.formData?.weight || 'N/A'}</td>
                                    <td>{sub.formData?.durability || 'N/A'}</td>
                                    <td>{sub.formData?.shippingMethod || 'N/A'}</td>
                                    <td>{sub.recommendation || 'N/A'}</td>
                                    <td>{carbonFootprint.toFixed(2)} kg CO₂</td>
                                    <td>{getEcoScore(carbonFootprint)}</td>
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
