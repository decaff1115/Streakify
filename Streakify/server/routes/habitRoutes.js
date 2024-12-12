const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController'); // Import the habitController
const { validateHabitData } = require('../middleware/validationMiddleware');

// Define the routes for habits
router.get('/', habitController.getAllHabits); // Get all habits
router.get('/:id', habitController.getHabitById); // Get habit by ID
router.post('/', habitController.createHabit); // Create a new habit
router.put('/:id', habitController.updateHabit); // Update habit by ID
router.delete('/:id', habitController.deleteHabit); // Delete habit by ID

router.post('/', validateHabitData, habitController.createHabit);
router.put('/:id', validateHabitData, habitController.updateHabit);


module.exports = router;
