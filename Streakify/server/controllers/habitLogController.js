const { HabitLog, Streak, Habit } = require('../models');

// Get all habit logs (with related habit and streak data)
const getAllHabitLogs = async (req, res) => {
    try {
        const habitLogs = await HabitLog.findAll({
            include: [
                { model: Habit, as: 'habit' },  // Include related habit data
                { model: Streak, as: 'streak' }  // Optionally include streaks if needed
            ]
        });
        res.json(habitLogs);  // Return the habit logs with included associations as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving habit logs', error });
    }
};

// Create a new habit log entry
const createHabitLog = async (req, res) => {
    const { habit_id, completed_at, value } = req.body;  // Value could be 1 for completed, 0 for not completed

    try {
        // Normalize the completed_at date to midnight (start of the day)
        const currentDate = new Date(completed_at);
        currentDate.setHours(0, 0, 0, 0);  // Set to midnight

        // Create a new habit log entry
        const habitLog = await HabitLog.create({ habit_id, completed_at: currentDate, value });

        // Get the last streak for this habit
        const lastStreak = await Streak.findOne({
            where: { habit_id },
            order: [['end_date', 'DESC']],  // Get the most recent streak
        });

        let streak = null;

        if (lastStreak) {
            // Normalize the last completion date (set to midnight)
            const lastCompletionDate = new Date(lastStreak.end_date);
            lastCompletionDate.setHours(0, 0, 0, 0);  // Set to midnight

            // If the habit was completed consecutively (next day)
            if ((currentDate - lastCompletionDate) === 86400000) {  // 1 day in milliseconds
                streak = await lastStreak.update({
                    end_date: currentDate,
                    length: lastStreak.length + 1,  // Increase streak length
                });
            } else {
                // If there was a break in the streak
                streak = await Streak.create({
                    habit_id,
                    start_date: currentDate,  // Set to current date (midnight)
                    end_date: currentDate,    // Set to current date (midnight)
                    length: 1,  // New streak starting
                });
            }
        } else {
            // If no streak exists, create a new streak
            streak = await Streak.create({
                habit_id,
                start_date: currentDate,  // Set to current date (midnight)
                end_date: currentDate,    // Set to current date (midnight)
                length: 1,  // First day of streak
            });
        }

        // Return the created habit log and streak
        res.status(201).json({ habitLog, streak });
    } catch (error) {
        res.status(500).json({ message: 'Error creating habit log or streak', error });
    }
};

module.exports = {
    getAllHabitLogs,
    createHabitLog
};
