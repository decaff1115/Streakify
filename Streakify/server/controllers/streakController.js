const { Streak, HabitLog } = require('../models'); // Import HabitLog
const { Op } = require('sequelize');

// Function to get the streak data for a month
exports.getStreakDataForMonth = async (req, res) => {
    const { habit_id, month, year } = req.query; // Accept month and year in query params

    try {
        // Fetch streaks for the given habit in the specified month and year
        const streaks = await Streak.findAll({
            where: {
                habit_id: habit_id,
                start_date: {
                    [Op.gte]: new Date(year, month - 1, 1), // First day of the month
                },
                end_date: {
                    [Op.lte]: new Date(year, month, 0), // Last day of the month
                }
            },
            include: [
                {
                    model: HabitLog,
                    where: {
                        date: {
                            [Op.gte]: new Date(year, month - 1, 1),
                            [Op.lte]: new Date(year, month, 0),
                        }
                    },
                    required: true, // Ensures that the streak is only returned if it has habit logs in that month
                }
            ]
        });

        // Compute the streak data
        const streakData = streaks.map(streak => {
            let completedDays = 0;
            let failedDays = 0;
            let skippedDays = 0;
            let totalMinutes = 0;

            streak.HabitLogs.forEach(log => {
                // Check habit completion status
                if (log.status === 'completed') {
                    completedDays += 1;
                    totalMinutes += log.duration || 0; // Add duration for completed habit
                } else if (log.status === 'failed') {
                    failedDays += 1;
                } else if (log.status === 'skipped') {
                    skippedDays += 1;
                }
            });

            return {
                streak_id: streak.id,
                start_date: streak.start_date,
                end_date: streak.end_date,
                current_streak_length: streak.length,
                completed_days: completedDays,
                failed_days: failedDays,
                skipped_days: skippedDays,
                total_minutes: totalMinutes,
            };
        });

        res.status(200).json(streakData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching streak data', error });
    }
};
