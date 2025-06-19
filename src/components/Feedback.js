/* // src/components/Feedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedback.css'; // Make sure you create this CSS file

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-feedbacks');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    return (
        <div className="feedback-container">
            <h2>📝 Customer Feedback</h2>
            {feedbacks.length > 0 ? (
                <table className="feedback-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Opinion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((fb, idx) => (
                            <tr key={idx}>
                                <td>{fb.name}</td>
                                <td>{fb.rating} ⭐</td>
                                <td>{fb.opinion || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No feedback found.</p>
            )}
        </div>
    );
}

export default Feedback;
 */
// src/components/Feedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feedback.css';

function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-feedbacks');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    return (
        <div className="feedback-container">
            <h2>📝 Supply Chain Feedback</h2>
            {feedbacks.length > 0 ? (
                <table className="feedback-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Overall</th>
                            <th>Accuracy</th>
                            <th>Packaging</th>
                            <th>Delivery</th>
                            <th>Suggestions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((fb, idx) => (
                            <tr key={idx}>
                                <td>{fb.name}</td>
                                <td>{fb.overallRating} ⭐</td>
                                <td>{fb.accuracyRating} ⭐</td>
                                <td>{fb.packagingRating} ⭐</td>
                                <td>{fb.deliveryRating} ⭐</td>
                                <td>{fb.suggestions || '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No feedback found.</p>
            )}
        </div>
    );
}

export default Feedback;
