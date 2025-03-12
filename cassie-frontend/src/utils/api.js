export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

export const getApiUrl = (endpoint) => {
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${cleanEndpoint}`;
};

export const fetchWithAuth = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        const url = getApiUrl(endpoint);
        console.log('Fetching:', url);
        console.log('Options:', { ...options, headers });

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include'
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