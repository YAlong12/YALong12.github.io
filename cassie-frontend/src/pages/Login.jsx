import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign in</h2>
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

                    <Link to="/forgot-password" className="forgot-password">Forgot your password?</Link>

                    <button type="submit" className="auth-button">Sign in</button>
                </form>

                <p className="register-text">Don't have an account? <Link to="/register" className="register-link">Join</Link></p>
            </div>
        </div>
    );
}

export default Login;
