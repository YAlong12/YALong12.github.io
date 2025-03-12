const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken } = require('../middleware/auth');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Add authentication middleware
router.post('/', authenticateToken, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err.message || err });
        } else {
            if (!req.file) {
                res.status(400).json({ message: 'No file selected' });
            } else {
                res.json({
                    imageUrl: `http://localhost:3002/uploads/${req.file.filename}`
                });
            }
        }
    });
});

module.exports = router; 