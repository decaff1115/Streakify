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

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            // Fetch all users from the database
            const users = await User.findAll(); 
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            return res.status(200).json({
                users: users.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email, 
                })),
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getUserById: async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findOne({ where: { id: userId } , attributes: ['username', 'email'],});

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(202).json({
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body; 
        try {
            const user = await User.findOne({ where: { username },  });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = generateToken(user);
            res.status(200).json({
                message: 'Login successful',
                token,
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    register: async (req, res) => {
        const { username, email, password } = req.body;   // Extract username, email, and password from the request body
        try {
            const existingUserByUsername = await User.findOne({ where: { username } });
            if (existingUserByUsername) {
                return res.status(400).json({ message: 'Username is already taken' });
            }

            const existingUserByEmail = await User.findOne({ where: { email } });
            if (existingUserByEmail) {
                return res.status(400).json({ message: 'Email is already taken' });
            }

            const hash_password = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username,
                email: email,
                password_hash: hash_password  
            });

            const token = generateToken(newUser);

            res.status(201).json({
                message: 'User registered successfully',
                token,  
            });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteUserById: async (req, res) => {

        const userId = req.params.id; 

        try {
            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                console.log('User not found'); 
                return res.status(404).json({ message: 'User not found' });
            }
            await user.destroy();
            res.status(200).json({ message: 'User and related data deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error); // Log the error
            res.status(500).json({ message: 'Internal server error' });
        }
    }

};





