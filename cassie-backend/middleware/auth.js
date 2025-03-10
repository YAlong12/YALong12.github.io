const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        console.log('Auth middleware - headers:', req.headers);
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid authorization header' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token received:', token.substring(0, 10) + '...');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        req.user = {
            userId: decoded.userId,
            isAdmin: decoded.isAdmin
        };

        console.log('User set on request:', req.user);
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = auth; 