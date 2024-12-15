const { sequelize, Habit, User, HabitLog } = require('../models')

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
    const { name, goal, user_id } = req.body;
    const transaction = await sequelize.transaction();
    
    try {
        // Verify the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Create the new habit
        const habit = await Habit.create(
            {
                name,
                goal,
                user_id,
            },
            { transaction } // Pass the transaction object to ensure atomicity
        );

        // Create HabitLog after Habit creation
        await HabitLog.create(
            {
                user_id: habit.user_id,
                habit_id: habit.id,
                habit_goal: habit.goal,
                checked_days: [],
            },
            { transaction } // Ensure HabitLog creation is also part of the same transaction
        );

        // Commit the transaction if all operations succeed
        await transaction.commit();

        res.status(201).json({
            message: 'Habit and HabitLog created successfully',
            habitName: habit.name,
            goal: habit.goal,
            userId: habit.user_id,
            id: habit.id,
        });
        
    } catch (error) {
        await transaction.rollback(); // Rollback transaction in case of error
        console.error('Error creating habit or HabitLog:', error);
        res.status(500).json({ message: 'Error creating habit or HabitLog', error });
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
