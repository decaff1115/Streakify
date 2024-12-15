const express = require('express');
const habitController = require('../controllers/habitController');
const router = express.Router();


// Route: Get all habits for a user
router.get('/', habitController.getAllHabits);

// Route: Get a specific habit by ID
router.get('/:id', habitController.getHabitById);

// Route: Create a new habit
router.post('/', habitController.createHabit);

// Route: Update an existing habit
router.put('/:id', habitController.updateHabit);

// Route: Delete a habit
router.delete('/:id', habitController.deleteHabit);

module.exports = router;
