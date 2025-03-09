import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            await axios.post('http://localhost:3000/api/auth/register', userData);
            setMessage('Registration successful! You can now log in.');
        } catch (err) {
            setError('Error registering user.');
        }
    };

    return (
        <div className="auth-container">
            <h1>Register</h1>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
