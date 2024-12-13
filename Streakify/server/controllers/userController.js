const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../models");

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        username: user.username,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body; // Extract username and password from the request body
        try {
            // Step 1: Check if the user exists in the database
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Step 2: Check if the provided password matches the hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Step 3: Generate the JWT token
            const token = generateToken(user);

            // Step 4: Send the response with the JWT token
            res.status(200).json({
                message: 'Login successful',
                token
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    register: async (req, res) => {
        const { username, email, password } = req.body;   // Extract username, email, and password from the request body
        const hash_password = await bcrypt.hash(password, 10); // Hash the password for storage

        try {
            // Step 1: Check if the user already exists
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username is already taken' });
            }

            // Step 2: Create a new user in the database
            const newUser = await User.create({
                username,
                email,
                password_hash: hash_password  // Store the hashed password in the database
            });

            // Step 3: Send a success response
            res.status(201).json({
                message: 'User registered successfully',
            });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
