const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streakController');

// Get streak data for a specific habit in a given month and year
router.get('/streak-data', streakController.getStreakDataForMonth);

module.exports = router;
