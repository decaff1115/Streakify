const { Habit, User } = require('../models');

// Get all habits for a user
exports.getAllHabits = async (req, res) => {
    const { user_id } = req.query; // Pass `user_id` as a query parameter
    try {
        const habits = await Habit.findAll({
            where: { user_id }, // Filter habits by the user ID
        });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving habits', error });
    }
};

// Get a single habit by ID
exports.getHabitById = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findByPk(id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving habit', error });
    }
};

// Create a new habit
exports.createHabit = async (req, res) => {
    const { name, goal, created_at, user_id } = req.body; // Ensure `goal` and `created_at` match the frontend
    try {
        // Verify the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Create the new habit
        const habit = await Habit.create({
            name,
            goal,
            created_at: created_at || new Date(), // Default to the current date if not provided
            user_id,
        });

        res.status(201).json(habit);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map(err => err.message), // Send validation messages
            });
        }
        console.error('Error creating habit:', error.stack);
        res.status(500).json({ message: 'Error creating habit', error: error.stack });
    }
};

// Update an existing habit
exports.updateHabit = async (req, res) => {
    const { id } = req.params;
    const { name, goal, user_id } = req.body; // Allow updating `name` and `goal` only
    try {
        // Find the habit by its ID
        const habit = await Habit.findByPk(id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // Update the habit details
        await habit.update({
            name,
            goal,
            user_id, // Keep track of the user associated with the habit
        });

        res.json(habit); // Return the updated habit
    } catch (error) {
        res.status(500).json({ message: 'Error updating habit', error });
    }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the habit by its ID
        const habit = await Habit.findByPk(id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        // Delete the habit
        await habit.destroy();
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting habit', error });
    }
};
