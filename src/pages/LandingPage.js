import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('supplyChainUser');
        navigate('/supply-login');
    };

    const allCards = [
        {
            title: 'Get Recommendations',
            text: 'Discover the best sustainable packaging for your needs.',
            img: '/images/recommendation.jpg',
            path: '/form'
        },
        {
            title: '3D Packaging View',
            text: 'Visualize the recommended packaging in 3D.',
            img: '/images/three.jpg',
            path: '/three-d-view'
        },
        {
            title: 'Give Feedback',
            text: 'Help us improve with your valuable feedback.',
            img: '/images/feedback.jpg',
            path: '/feedback'
        },
        {
            title: 'Material Usage',
            text: 'Analyze material consumption and optimize usage.',
            img: '/images/material.jpg',
            path: '/material-usage'
        },
        {
            title: 'Carbon Footprint',
            text: 'Track carbon footprint based on shipping and materials.',
            img: '/images/carbon.png',
            path: '/carbon-footprint'
        }
    ];

    const firstRowCards = allCards.slice(0, 3);
    const secondRowCards = allCards.slice(3);

    return (
        <div className="landing-container">
            {/* ✅ Top right logout button */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>

            <h1>Welcome to EcoPack AI</h1>
            <p>Your Sustainable Packaging Recommendation Tool</p>

            <div className="card-container">
                {firstRowCards.map((card, idx) => (
                    <div key={idx} className="card" onClick={() => navigate(card.path)}>
                        <img src={card.img} alt={card.title} className="card-image" />
                        <h2>{card.title}</h2>
                        <p>{card.text}</p>
                    </div>
                ))}
            </div>

            <div className="card-container">
                {secondRowCards.map((card, idx) => (
                    <div key={idx} className="card" onClick={() => navigate(card.path)}>
                        <img src={card.img} alt={card.title} className="card-image" />
                        <h2>{card.title}</h2>
                        <p>{card.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;
