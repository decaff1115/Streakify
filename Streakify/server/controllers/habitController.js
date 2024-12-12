const { Habit } = require('../models');

exports.getAllHabits = async (req, res) => {
    try {
        const habits = await Habit.findAll();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving habits', error });
    }
};

exports.getHabitById = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findByPk(id); // Corrected to `habit` instead of `habits`
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving habit', error });
    }
};

exports.createHabit = async (req, res) => {
    const { name, description, target_frequency, target_value, reminder_time, repetition_days, start_date, user_id } = req.body;
    try {

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const habit = await Habit.create({
            name,
            description,
            target_frequency,
            target_value,
            reminder_time,
            repetition_days,  // New field for days of the week (like Sunday, Monday, etc.)
            start_date,       // New field for the start date
            user_id
        });
        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ message: 'Error creating habit', error });
    }
};

exports.updateHabit = async (req, res) => {
    const { id } = req.params;
    const { name, description, target_frequency, target_value, reminder_time, repetition_days, start_date, user_id } = req.body;
    try {
        const habit = await Habit.findByPk(id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        await habit.update({
            name,
            description,
            target_frequency,
            target_value,
            reminder_time,
            repetition_days, // Update repetition_days
            start_date,      // Update start_date
            user_id
        });

        res.json(habit);
    } catch (error) {
        res.status(500).json({ message: 'Error updating habit', error });
    }
};

exports.deleteHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findByPk(id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        await habit.destroy();
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting habit', error });
    }
};


//JUST PLACEHOLDERS
// module.exports = {
//     getAllHabits: (req, res) => {
//         res.send('Get all habits (not implemented yet)');
//     },
//     getHabitById: (req, res) => {
//         res.send(`Get habit by ID: ${req.params.id} (not implemented yet)`);
//     },
//     createHabit: (req, res) => {
//         res.send('Create a habit (not implemented yet)');
//     },
//     updateHabit: (req, res) => {
//         res.send(`Update habit with ID: ${req.params.id} (not implemented yet)`);
//     },
//     deleteHabit: (req, res) => {
//         res.send(`Delete habit with ID: ${req.params.id} (not implemented yet)`);
//     }
// };