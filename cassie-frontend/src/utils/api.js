// Determine the base URL based on the environment
const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'http://localhost:3002/api';  // Docker backend URL
    }
    return 'http://localhost:3002/api';
};

export const API_BASE_URL = getBaseUrl();

// Log the environment and final URL for debugging
console.log('Current environment:', process.env.NODE_ENV);
console.log('Final API_BASE_URL:', API_BASE_URL);

export const getApiUrl = (endpoint) => {
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const finalUrl = `${baseUrl}${cleanEndpoint}`;
    
    // Log the constructed URL for debugging
    console.log('Constructed API URL:', finalUrl);
    return finalUrl;
};

export const fetchWithAuth = async (endpoint, options = {}) => {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': window.location.origin,
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        const url = getApiUrl(endpoint);
        console.log('Fetching:', url);
        console.log('Request options:', {
            ...options,
            headers: { ...headers, Authorization: token ? 'Bearer [REDACTED]' : undefined }
        });

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
            mode: 'cors'
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const error = await response.json().catch(() => ({ 
                message: `HTTP error! status: ${response.status}` 
            }));
            console.error('Response error:', error);
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

// Add a function to delete an event
export const deleteEvent = async (eventId) => {
    return fetchWithAuth(`/events/${eventId}`, {
        method: 'DELETE'
    });
};

// Add a function to get all events
export const getAllEvents = async () => {
    return fetchWithAuth('/events');
}; 