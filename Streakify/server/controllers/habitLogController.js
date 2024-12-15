const { HabitLog } = require('../models');
const { updateStreak } = require('./streakController'); 


const updateCheckedDays = async (req, res) => {
    const { habit_id, user_id, day, is_checked } = req.body;

    // Validate input
    if (!habit_id || !user_id || !day || typeof is_checked === 'undefined') {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        console.log('Habit ID:', habit_id);
        console.log('User ID:', user_id);

        // Find the HabitLog entry
        const habitLog = await HabitLog.findOne({
            where: { habit_id, user_id },
        });

        if (!habitLog) {
            return res.status(404).json({ message: 'HabitLog not found' });
        }

        // Update the specified day
        switch (day.toLowerCase()) {
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

        // Save and update streak
        await habitLog.save();
        await updateStreak(habitLog);

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
