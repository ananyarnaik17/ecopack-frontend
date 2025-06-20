// src/components/MaterialUsage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';
import '../components/MaterialUsage.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

function MaterialUsage() {
    const [data, setData] = useState([]);
    const [view, setView] = useState('bar'); // toggle between bar and pie chart

    useEffect(() => {
        fetchMaterialUsage();
    }, []);

    const fetchMaterialUsage = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/recommendations`);
            const submissions = response.data;

            // Count recommendations (e.g., Corrugated Box, Thermal Box)
            const countMap = {};
            submissions.forEach((sub) => {
                const recommendation = sub.recommendation;
                if (recommendation) {
                    countMap[recommendation] = (countMap[recommendation] || 0) + 1;
                }
            });

            // Convert to chart-friendly format
            const chartData = Object.keys(countMap).map((key) => ({
                name: key,
                value: countMap[key]
            }));

            setData(chartData);
        } catch (err) {
            console.error('Error fetching recommendation data:', err.message);
        }
    };

    return (
        <div className="material-usage-container">
            <h2>📊 Material Usage Chart</h2>

            <div className="toggle-buttons">
                <button
                    onClick={() => setView('bar')}
                    className={view === 'bar' ? 'active' : ''}
                >
                    Bar Chart
                </button>
                <button
                    onClick={() => setView('pie')}
                    className={view === 'pie' ? 'active' : ''}
                >
                    Pie Chart
                </button>
            </div>

            {data.length === 0 ? (
                <p>No data to display.</p>
            ) : (
                <div className="chart-wrapper">
                    {view === 'bar' ? (
                        <BarChart width={600} height={300} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#0088FE" />
                        </BarChart>
                    ) : (
                        <PieChart width={400} height={300}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    )}
                </div>
            )}
        </div>
    );
}

export default MaterialUsage;
