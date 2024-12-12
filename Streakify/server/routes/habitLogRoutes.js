const express = require('express');
const router = express.Router();
const habitLogController = require('../controllers/habitLogController'); // Import the habitLogController
const { authMiddleware } = require('../middleware/authMiddleware'); // Import the authentication middleware

// Define the routes for habit logs with authentication
router.get('/', authMiddleware, habitLogController.getAllHabitLogs); // Get all habit logs (protected)
router.post('/', authMiddleware, habitLogController.createHabitLog); // Create a new habit log (protected)

module.exports = router;


