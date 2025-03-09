import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:3000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.role === 'admin') {
                setIsAdmin(true);
            } else {
                navigate('/');
            }
        })
        .catch(() => {
            navigate('/login');
        });
    }, [navigate]);

    return isAdmin ? (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Only admins can see this.</p>
        </div>
    ) : null;
}

export default AdminDashboard;
