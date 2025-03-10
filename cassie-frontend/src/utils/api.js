export const API_BASE_URL = 'http://localhost:3002/api';

export const fetchWithAuth = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        console.log('Fetching:', `${API_BASE_URL}${endpoint}`);
        console.log('Options:', { ...options, headers });

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.json().catch(() => ({ 
                message: `HTTP error! status: ${response.status}` 
            }));
            throw new Error(error.message || 'Request failed');
        }

        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (err) {
        console.error('Fetch error:', err);
        throw err;
    }
}; 