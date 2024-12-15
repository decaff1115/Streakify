const { Streak, HabitLog, Habit, User } = require('../models');
const { Op } = require('sequelize');


const updateCheckedDays = async (req, res) => {
    const { habit_id, user_id, day, is_checked } = req.body;

    try {
        // Find the corresponding HabitLog entry
        const habitLog = await HabitLog.findOne({
            where: { habit_id, user_id },
        });

        if (!habitLog) {
            return res.status(404).json({ message: 'HabitLog not found' });
        }

        // Update the boolean value for the specified day
        switch(day.toLowerCase()) {
            case 'monday':
                habitLog.monday = is_checked;
                break;
            case 'tuesday':
                habitLog.tuesday = is_checked;
                break;
            case 'wednesday':
                habitLog.wednesday = is_checked;
                break;
            case 'thursday':
                habitLog.thursday = is_checked;
                break;
            case 'friday':
                habitLog.friday = is_checked;
                break;
            case 'saturday':
                habitLog.saturday = is_checked;
                break;
            case 'sunday':
                habitLog.sunday = is_checked;
                break;
            default:
                return res.status(400).json({ message: 'Invalid day provided' });
        }

        await habitLog.save();

        res.status(200).json({ message: 'Checked days updated successfully' });
    } catch (error) {
        console.error('Error updating checked days:', error);
        res.status(500).json({ message: 'Failed to update checked days', error: error.message });
    }
};

const getCheckedDays = async (req, res) => {
    const { habit_id, user_id } = req.query;

    try {
        const habitLog = await HabitLog.findOne({
            where: { habit_id, user_id },
        });

        if (!habitLog) {
            return res.status(404).json({ message: 'HabitLog not found' });
        }

        const checkedDays = {
            monday: habitLog.monday,
            tuesday: habitLog.tuesday,
            wednesday: habitLog.wednesday,
            thursday: habitLog.thursday,
            friday: habitLog.friday,
            saturday: habitLog.saturday,
            sunday: habitLog.sunday,
        };

        res.status(200).json({ checked_days: checkedDays });
    } catch (error) {
        console.error('Error retrieving checked days:', error);
        res.status(500).json({ message: 'Failed to retrieve checked days', error: error.message });
    }
};


module.exports = {
    getCheckedDays,
    updateCheckedDays
};
