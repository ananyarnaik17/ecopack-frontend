/* // src/components/MaterialUsage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './MaterialUsage.css';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function MaterialUsage() {
    const [data, setData] = useState([]);
    const [theme, setTheme] = useState('default');

    const colorThemes = {
        default: ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384', '#9966FF'],
        dark: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
        vibrant: ['#E91E63', '#00BCD4', '#8BC34A', '#FFEB3B', '#FF5722'],
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/recommendations/');
            console.log('Fetched Material Usage Data:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching material data:', error);
        }
    };

    // Calculate usage count
    const usageCount = {};
    data.forEach((item) => {
        if (item.recommendation) {
            usageCount[item.recommendation] = (usageCount[item.recommendation] || 0) + 1;
        }
    });

    const chartData = {
        labels: Object.keys(usageCount),
        datasets: [
            {
                label: 'Material Usage Count',
                data: Object.values(usageCount),
                backgroundColor: colorThemes[theme],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: { label: (context) => `Count: ${context.raw}` },
            },
        },
        scales: {
            x: { beginAtZero: true, ticks: { stepSize: 1 } },
        },
    };

    return (
        <div className="material-usage-wrapper">
            <h2 className="material-usage-title">📊 Material Usage Chart</h2>

            <div className="theme-selector">
                <button className={theme === 'default' ? 'active' : ''} onClick={() => setTheme('default')}>Default</button>
                <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}>Dark</button>
                <button className={theme === 'vibrant' ? 'active' : ''} onClick={() => setTheme('vibrant')}>Vibrant</button>
            </div>

            {Object.keys(usageCount).length === 0 ? (
                <p>No data to display.</p>
            ) : (
                <div className="chart-container">
                    <Bar data={chartData} options={options} />
                </div>
            )}
        </div>
    );
}

export default MaterialUsage;
 */
// src/components/MaterialUsage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './MaterialUsage.css';

Chart.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function MaterialUsage() {
    const [data, setData] = useState([]);
    const [chartType, setChartType] = useState('bar');

    const chartColors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#845EC2', '#FF9671', '#00C9A7'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recommendations`);
            console.log('Fetched Material Usage Data:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching material data:', error);
        }
    };

    const usageCount = {};
    data.forEach((item) => {
        const recommendation = item.recommendation?.trim();
        if (recommendation) {
            usageCount[recommendation] = (usageCount[recommendation] || 0) + 1;
        }
    });

    const chartData = {
        labels: Object.keys(usageCount),
        datasets: [
            {
                label: 'Material Usage Count',
                data: Object.values(usageCount),
                backgroundColor: chartColors,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: chartType === 'bar' ? 'y' : 'x',
        plugins: {
            legend: { display: chartType === 'pie' },
            tooltip: { callbacks: { label: (context) => `Count: ${context.raw}` } },
        },
        scales: chartType === 'bar' ? { x: { beginAtZero: true, ticks: { stepSize: 1 } } } : {},
    };

    return (
        <div className="material-usage-wrapper">
            <h2 className="material-usage-title">📊 Material Usage Chart</h2>

            <div className="chart-type-selector">
                <button className={chartType === 'bar' ? 'active' : ''} onClick={() => setChartType('bar')}>Bar Chart</button>
                <button className={chartType === 'pie' ? 'active' : ''} onClick={() => setChartType('pie')}>Pie Chart</button>
            </div>

            {Object.keys(usageCount).length === 0 ? (
                <p>No data to display.</p>
            ) : (
                <div className="chart-container">
                    {chartType === 'bar' ? (
                        <Bar data={chartData} options={options} />
                    ) : (
                        <Pie data={chartData} options={options} />
                    )}
                </div>
            )}
        </div>
    );
}

export default MaterialUsage;
