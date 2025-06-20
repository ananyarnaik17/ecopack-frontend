import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SupplyChainLogin.css';

function SupplyChainLogin() {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
          console.log("🔗 Backend URL:", process.env.REACT_APP_BACKEND_URL);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
                employeeId,
                password
            });

            if (response.data && response.data.user) {
                toast.success('Login Successful!');
                localStorage.setItem('supplyChainUser', JSON.stringify(response.data.user));
                navigate('/landing');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.error || 'Login Failed');
        }
    };

    return (
        <div className="login-wrapper">

            {/* Left Side Image */}
            <div
                className="fixed-image"
                style={{
                    backgroundImage: "url('/images/delivery-guy.png')",
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            {/* Right Side Form */}
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Supply Chain Login</h2>
                    <input
                        type="text"
                        placeholder="Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default SupplyChainLogin;
