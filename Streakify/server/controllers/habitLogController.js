// const { Streak, HabitLog, Habit, User } = require('../models');
// const { Op } = require('sequelize');

// // Create a new habit log entry and manage streak
// const createHabitLog = async (req, res) => {
//     const { habit_id, completed_at, status, duration, user_id, value } = req.body;

//     try {
//         // Validate the status
//         if (!['completed', 'skipped', 'failed'].includes(status)) {
//             return res.status(400).json({ message: 'Invalid status. It must be one of "completed", "skipped", or "failed".' });
//         }

//         // Check if user exists
//         const user = await User.findByPk(user_id);
//         if (!user) {
//             return res.status(400).json({ message: 'User not found.' });
//         }

//         // Check if habit exists
//         const habit = await Habit.findByPk(habit_id);
//         if (!habit) {
//             return res.status(400).json({ message: 'Habit not found.' });
//         }

//         // Check if a habit log already exists for this habit and date
//         const existingLog = await HabitLog.findOne({
//             where: {
//                 habit_id,
//                 completed_at: completed_at  // Check for existing log with the same habit and date
//             }
//         });

//         if (existingLog) {
//             return res.status(400).json({
//                 message: `A habit log already exists for this habit on ${completed_at}.`
//             });
//         }

//         // Default value for the log if not provided
//         const habitValue = value !== undefined ? value : (status === 'completed' ? habit.target_value : 0);

//         // Create the habit log
//         const habitLog = await HabitLog.create({
//             habit_id,
//             user_id,
//             completed_at,
//             status,
//             value: habitValue,
//             duration: status === 'completed' ? duration : 0
//         });

//         res.status(201).json({ habitLog });
//     } catch (error) {
//         console.error('Error creating habit log or streak:', error);
//         res.status(500).json({ message: 'Error creating habit log or streak', error: error.message });
//     }
// };

// // Get habits by date (including habit logs if they exist for the selected date)
// const getHabitsByDate = async (req, res) => {
//     try {
//         const { date } = req.query;  // Get the date from the query string

//         // Check if date is provided
//         if (!date) {
//             return res.status(400).json({ message: 'Date is required' });
//         }

//         // Normalize the date (set time to midnight to avoid timezone issues)
//         const selectedDate = new Date(date);
//         selectedDate.setHours(0, 0, 0, 0);  // Ensure it's normalized to midnight

//         // Get the day of the week (0 - Sunday, 6 - Saturday)
//         const selectedDayOfWeek = selectedDate.getDay(); 

//         // Query Habits where the selected day is in the `daily_days` array
//         const habits = await Habit.findAll({
//             where: {
//                 daily_days: {
//                     [Op.contains]: [selectedDayOfWeek],  // Check if the selected day exists in the daily_days array
//                 },
//             },
//             include: [
//                 { model: User },  // Include User model to get user details
//                 {
//                     model: HabitLog, // Include HabitLogs to check if there is any log for this habit on the selected date
//                     where: { completed_at: selectedDate },
//                     required: false,  // LEFT JOIN: retrieve habits with or without logs
//                 },
//             ],
//         });

//         // Return the habits with their logs (if any) and associated user details
//         res.json(habits);
//     } catch (error) {
//         console.error('Error retrieving habits:', error);
//         res.status(500).json({ message: 'Error retrieving habits', error });
//     }
// };

// const getAllHabitLogs = async (req, res) => {
//     try {
//         const habitLogs = await HabitLog.findAll({
//             include: [
//                 { model: Habit }, // Include the associated Habit model
//                 { model: User },  // Include the associated User model
//             ]
//         });
//         res.json(habitLogs);  // Return the habit logs with included associations as JSON
//     } catch (error) {
//         console.error('Error retrieving habit logs:', error);
//         res.status(500).json({ message: 'Error retrieving habit logs', error });
//     }
// };

// module.exports = {
//     getAllHabitLogs,
//     createHabitLog,
//     getHabitsByDate
// };
