const jwt = require('jsonwebtoken');

// Middleware to protect routes by verifying the user's JWT
exports.authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token using the secret key
        req.user = decoded; // Store the decoded user info in the request object
        next(); // Allow the request to proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};

exports.authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token using the secret key
        req.user = decoded; // Store the decoded user info in the request object
        next(); // Allow the request to proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};
