const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        console.log('\n=== Auth Middleware ===');
        
        // Get token from header
        const authHeader = req.headers.authorization;
        console.log('Auth header:', authHeader);
        
        if (!authHeader) {
            console.log('No authorization header');
            return res.status(401).json({ message: 'No authorization token found' });
        }

        // Check if it's a Bearer token
        if (!authHeader.startsWith('Bearer ')) {
            console.log('Invalid token format');
            return res.status(401).json({ message: 'Invalid token format' });
        }

        // Get the token part
        const token = authHeader.split(' ')[1];
        console.log('Token:', token.substring(0, 10) + '...');

        if (!token) {
            console.log('No token found');
            return res.status(401).json({ message: 'No token found' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded);
            
            // Add user info to request
            req.user = {
                userId: decoded.userId,
                isAdmin: decoded.isAdmin
            };
            
            console.log('User set on request:', req.user);
            next();
        } catch (tokenError) {
            console.log('Token verification failed:', tokenError.message);
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(401).json({ 
            message: 'Authentication failed',
            error: err.message 
        });
    }
};

module.exports = auth; 