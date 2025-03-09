import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3002/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            if (data.token) {
                // Store the token and user info
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                throw new Error('No token received from server');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Email address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                    />

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="register-text">
                    Already have an account? <Link to="/login" className="register-link">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
