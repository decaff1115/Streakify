const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../models");

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getName = async (userId) => {
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        return user.name;  // Assuming the User model has a 'name' field
    } catch (error) {
        console.error("Error fetching user name:", error);
        throw error;
    }
};

module.exports = {
    getAllUsers: async (req, res) => {
        try {
          // Fetch all users from the database
          const users = await User.findAll(); // Sequelize's findAll method to fetch all users
    
          // Check if users were found
          if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
          }
    
          // Respond with the list of users (you can adjust the fields based on your model)
          return res.status(200).json({
            users: users.map(user => ({
              id: user.id,
              username: user.username,
              email: user.email,  // Adjust the fields you want to return
              // Add any other fields from your User model that should be exposed
            })),
          });
        } catch (error) {
          console.error('Error fetching users:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      },

    getUserById: async (req, res) => {
        const userId = req.params.id; // Get the user ID from the request parameters
        console.log(req.params.id);
        try {
            // Query the User model to find a user by the provided ID
            const user = await User.findOne({ where: { id: userId } });
    
            if (!user) {
                // If the user is not found, return a 404 status with an error message
                return res.status(404).json({ message: 'User not found' });
            }
    
            // If the user is found, return the user data (excluding password or sensitive data)
            return res.status(202).json({
                username: user.username,
                // Add any other relevant user fields here
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    
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

            // Step 4: Send the response with the JWT token and username
            res.status(200).json({
                message: 'Login successful',
                token,
                //username: user.username, // Include the username in the response
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
    },
};

