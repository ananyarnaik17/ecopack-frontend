import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './FormPage.css';

function FormPage() {
    const [formData, setFormData] = useState({
        productName: '',
        productType: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        durability: '',
        shippingMethod: '',
        additionalRequirements: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const navigate = useNavigate();

    const productTypeOptions = [
        { value: 'Mug', label: 'Mug' },
        { value: 'Bottle', label: 'Bottle' },
        { value: 'Flask', label: 'Flask' },
        { value: 'Plate', label: 'Plate' },
        { value: 'Cutlery', label: 'Cutlery' },
        { value: 'Vase', label: 'Vase' },
        { value: 'Book', label: 'Book' },
        { value: 'Glassware', label: 'Glassware' },
        { value: 'Laptop', label: 'Laptop' },
        { value: 'Smartphone', label: 'Smartphone' },
        { value: 'Camera', label: 'Camera' },
        { value: 'Shoes', label: 'Shoes' },
        { value: 'Lamp', label: 'Lamp' },
        { value: 'Speaker', label: 'Speaker' },
        { value: 'Helmet', label: 'Helmet' },
        { value: 'Mirror', label: 'Mirror' },
        { value: 'Tablet', label: 'Tablet' },
        { value: 'Headphones', label: 'Headphones' },
        { value: 'Toy', label: 'Toy' },
        { value: 'Jewelry', label: 'Jewelry' }
    ];

    const durabilityOptions = ['Fragile', 'Medium', 'Strong'];
    const shippingOptions = ['Air', 'Sea', 'Land', 'Local'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            productName: formData.productName,
            productType: formData.productType,
            dimensions: {
                length: parseFloat(formData.length),
                width: parseFloat(formData.width),
                height: parseFloat(formData.height),
            },
            weight: parseFloat(formData.weight),
            durability: formData.durability,
            shippingMethod: formData.shippingMethod,
            additionalRequirements: formData.additionalRequirements
        };

        console.log("Payload sent to backend:", payload);

        try {
            const res = await axios.post('http://localhost:8000/predict', payload);
            console.log("Response from backend:", res.data);

            if (res.data && res.data.recommendation) {
                // Get shipping cost
                const shippingRes = await axios.post('http://localhost:5000/api/get-shipping-cost', {
                    weight: parseFloat(formData.weight),
                    shippingMethod: formData.shippingMethod
                });

                if (shippingRes.data && shippingRes.data.estimatedCost) {
                    const { estimatedCost, deliveryTime } = shippingRes.data;

                    setModalMessage(
                        `Recommended Package: ${res.data.recommendation}\n\nEstimated Shipping Cost: ₹${estimatedCost}\nEstimated Delivery Time: ${deliveryTime}`
                    );
                    setShowModal(true);
                } else {
                    toast.error('Failed to get shipping cost.');
                }
            } else {
                toast.error('No recommendation received from the backend.');
            }
        } catch (err) {
            console.error("Error from backend:", err);
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Error submitting form.');
            }
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        window.location.reload();
    };

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form-container" noValidate>
                <h2 className="form-title">Packaging Recommendation Form</h2>

                <label htmlFor="productName">Product Name</label>
                <input
                    id="productName"
                    name="productName"
                    type="text"
                    placeholder="Enter product name"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="productType">Product Type</label>
                <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select product type</option>
                    {productTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <div className="dimension-group">
                    <div>
                        <label htmlFor="length">Length (cm)</label>
                        <input
                            id="length"
                            name="length"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Length in cm"
                            value={formData.length}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="width">Width (cm)</label>
                        <input
                            id="width"
                            name="width"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Width in cm"
                            value={formData.width}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="height">Height (cm)</label>
                        <input
                            id="height"
                            name="height"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Height in cm"
                            value={formData.height}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <label htmlFor="weight">Weight (kg)</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter weight in kg"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="durability">Durability</label>
                <select
                    id="durability"
                    name="durability"
                    value={formData.durability}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select durability</option>
                    {durabilityOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <label htmlFor="shippingMethod">Shipping Method</label>
                <select
                    id="shippingMethod"
                    name="shippingMethod"
                    value={formData.shippingMethod}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select shipping method</option>
                    {shippingOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <label htmlFor="additionalRequirements">Additional Requirements</label>
                <textarea
                    id="additionalRequirements"
                    name="additionalRequirements"
                    placeholder="Enter any special packaging needs (optional)"
                    value={formData.additionalRequirements}
                    onChange={handleChange}
                />

                <div className="form-buttons">
                    <button type="submit" className="submit-btn">Submit</button>
                    <span className="home-link" onClick={() => navigate('/landing')}>Go to Home Page</span>
                </div>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{modalMessage}</p>
                        <button className="ok-btn" onClick={handleModalOk}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormPage;
