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
        const { username, password } = req.body; //extract username and password using express
        const hash_password = await bcrypt.hash(password, 10);
        console.log(hash_password);
        try {
            // Step 1: Check if the user exists in the database
            const user = await User.findOne({ where: { username } });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Step 2: Check if the provided password matches the hashed password
            console.log(user.password);
            const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Create JWT (JWT library)
            // Set up JWT secret + expiration time
            // Return JWT (express)
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
         const { username, password } = req.body;   // Extract username and password (express)
        // Create user (sequelize)

        try{
        const newUser = await User.create({
            username,
            password: hashedPassword  // Store the hashed password in the database
        });

        // Create JWT (JWT library)
        // Set up JWT secret + expiration time
        // Return JWT (express)
        // Step 4: Generate a JWT token for the newly created user
        const token = generateToken(newUser);

        // Step 5: Respond with the token
        res.status(201).json({
            message: 'User registered successfully',
            token
        });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    // After returning the JWT, have the client (React app) store it on local storage
    // then, on every request, be sure to send the JWT in the headers along with whatever
    // data you send. 



    //edit:
        //userController.js,    ok
        //middleware.js,    
        //userRoutes.js,        
        //loginPage.js 
        //signuppage.js
        // send the token on any page that uses authentication hehe, not just loginpage.js and signuppage.js, dashboard, profile
};
