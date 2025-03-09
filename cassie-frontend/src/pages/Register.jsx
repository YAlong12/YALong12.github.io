import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Registering with:", email, password);
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email address</label>
                    <input
                        type="email"
                        placeholder="Enter your Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="auth-button">Join</button>
                </form>

                <p className="register-text">Already have an account? <Link to="/login" className="register-link">Sign in</Link></p>
            </div>
        </div>
    );
}

export default Register;
