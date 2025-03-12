const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'a1b2c3d4e5f6g7h';

const auth = (req, res, next) => {
    try {
        console.log('Auth middleware - headers:', req.headers);
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Invalid authorization header' });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token received:', token.substring(0, 10) + '...');

        const decoded = jwt.verify(token, JWT_SECRET);
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