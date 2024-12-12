// Middleware here
// Decode the token
// If token is invalid, don't let the request through
// If token is valid, let the request through (js)

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // Get token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user info to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
        //whatever comes after this middleware can access req.user
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticateToken;
