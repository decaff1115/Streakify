const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController'); // Adjust the path if needed

// Define the PATCH route for updating checked days
router.patch('/update', streakController.updateStreak); // Make sure the handler function is defined and imported

// Define any other routes, if necessary
//router.get('/checked', streakController.getCheckedDaysFromLog);

module.exports = router;