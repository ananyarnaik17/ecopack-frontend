/* // src/pages/FeedbackForm.js
import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FeedbackForm.css';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name!');
      return;
    }

    if (rating === 0) {
      toast.error('Please provide a star rating!');
      return;
    }

    const feedbackData = { name, rating, opinion };

    try {
      await axios.post('http://localhost:5000/api/submit-feedback', feedbackData);
      console.log('Feedback submitted:', feedbackData);

      toast.success('Thank you for your feedback! 🎉');
      setShowConfetti(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Failed to submit feedback.');
    }
  };

  return (
    <div className="feedback-wrapper">
      {showConfetti && <Confetti />}
      <form onSubmit={handleSubmit} className="feedback-form" noValidate>
        <h2>Give Your Feedback</h2>

        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>How was your experience?</label>
        <StarRating rating={rating} setRating={setRating} />

        <label htmlFor="opinion">Your Opinion (Optional)</label>
        <textarea
          id="opinion"
          rows="4"
          placeholder="Share your thoughts..."
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
        ></textarea>

        <button type="submit" className="submit-feedback-btn">Submit Feedback</button>
        <button type="button" className="home-btn" onClick={() => navigate('/landing')}>Go to Home</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
 */
// src/pages/FeedbackForm.js

/* import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FeedbackForm.css';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [packagingRating, setPackagingRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [suggestions, setSuggestions] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name!');
      return;
    }

    if (overallRating === 0 || accuracyRating === 0 || packagingRating === 0 || deliveryRating === 0) {
      toast.error('Please complete all star ratings!');
      return;
    }

    const feedbackData = {
      name,
      overallRating,
      accuracyRating,
      packagingRating,
      deliveryRating,
      suggestions,
    };

    try {
      await axios.post('http://localhost:5000/api/submit-feedback', feedbackData);
      console.log('Feedback submitted:', feedbackData);

      toast.success('Thank you for your valuable feedback! 🎉');
      setShowConfetti(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Failed to submit feedback.');
    }
  };

  return (
    <div className="feedback-wrapper">
      {showConfetti && <Confetti />}
      <form onSubmit={handleSubmit} className="feedback-form" noValidate>
        <h2>Supply Chain Feedback Form</h2>

        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>How satisfied are you with the overall system?</label>
        <StarRating rating={overallRating} setRating={setOverallRating} />

        <label>How accurate were the packaging recommendations?</label>
        <StarRating rating={accuracyRating} setRating={setAccuracyRating} />

        <label>Was the suggested packaging suitable for your supply chain needs?</label>
        <StarRating rating={packagingRating} setRating={setPackagingRating} />

        <label>Rate the system’s impact on delivery efficiency</label>
        <StarRating rating={deliveryRating} setRating={setDeliveryRating} />

        <label htmlFor="suggestions">Any Suggestions or Issues? (Optional)</label>
        <textarea
          id="suggestions"
          rows="4"
          placeholder="Share any suggestions, issues, or improvements..."
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
        ></textarea>

        <button type="submit" className="submit-feedback-btn">Submit Feedback</button>
        <button type="button" className="home-btn" onClick={() => navigate('/landing')}>Go to Home</button>
      </form>
    </div>
  );
}

export default FeedbackForm; */
// src/pages/FeedbackForm.js
import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FeedbackForm.css';

function FeedbackForm() {
    const [name, setName] = useState('');
    const [overallRating, setOverallRating] = useState(0);
    const [accuracyRating, setAccuracyRating] = useState(0);
    const [packagingRating, setPackagingRating] = useState(0);
    const [deliveryRating, setDeliveryRating] = useState(0);
    const [suggestions, setSuggestions] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error('Please enter your name!');
            return;
        }

        if (overallRating === 0 || accuracyRating === 0 || packagingRating === 0 || deliveryRating === 0) {
            toast.error('Please rate all required sections!');
            return;
        }

        const feedbackData = { name, overallRating, accuracyRating, packagingRating, deliveryRating, suggestions };

        try {
            await axios.post('https://ecopack-backend-1.onrender.com/api/submit-feedback', feedbackData);
            console.log('Feedback submitted:', feedbackData);

            toast.success('Thank you for your feedback! 🎉');
            setShowConfetti(true);

            setTimeout(() => {
                navigate('/landing'); // ✅ Navigate to the landing page
            }, 3000);
        } catch (err) {
            console.error('Error submitting feedback:', err);
            toast.error('Failed to submit feedback.');
        }
    };

    return (
        <div className="feedback-wrapper">
            {showConfetti && <Confetti />}
            <form onSubmit={handleSubmit} className="feedback-form" noValidate>
                <h2>Supply Chain Feedback</h2>

                <label htmlFor="name">Your Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Overall Satisfaction</label>
                <StarRating rating={overallRating} setRating={setOverallRating} />

                <label>Product Accuracy</label>
                <StarRating rating={accuracyRating} setRating={setAccuracyRating} />

                <label>Packaging Quality</label>
                <StarRating rating={packagingRating} setRating={setPackagingRating} />

                <label>Delivery Timeliness</label>
                <StarRating rating={deliveryRating} setRating={setDeliveryRating} />

                <label htmlFor="suggestions">Suggestions (Optional)</label>
                <textarea
                    id="suggestions"
                    rows="4"
                    placeholder="Share your thoughts or suggestions..."
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                ></textarea>

                <button type="submit" className="submit-feedback-btn">Submit Feedback</button>
                <button type="button" className="home-btn" onClick={() => navigate('/landing')}>Go to Home</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
