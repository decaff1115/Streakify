const { HabitLog } = require('../models');
const { updateStreak } = require('./streakController'); 


const updateCheckedDays = async (req, res) => {
    const { habit_id, user_id, sun, mon, tue, wed, thu, fri, sat } = req.body;

    if (!habit_id || !user_id || typeof sun === 'undefined' || typeof mon === 'undefined' || typeof tue === 'undefined' || typeof wed === 'undefined' || typeof thu === 'undefined' || typeof fri === 'undefined' || typeof sat === 'undefined') {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        console.log('Updating HabitLog for habit_id:', habit_id, 'user_id:', user_id);
        console.log('Received days:', { sun, mon, tue, wed, thu, fri, sat });
        console.log('Habit ID:', habit_id);
        console.log('User ID:', user_id);

        // Find the HabitLog entry
        const habitLog = await HabitLog.findOne({
            where: { habit_id, user_id },
        });

        if (!habitLog) {
            return res.status(404).json({ message: 'HabitLog not found' });
        }

        const checkedDays = {
            sun: typeof sun === 'boolean' ? sun : false,
            mon: typeof mon === 'boolean' ? mon : false,
            tue: typeof tue === 'boolean' ? tue : false,
            wed: typeof wed === 'boolean' ? wed : false,
            thu: typeof thu === 'boolean' ? thu : false,
            fri: typeof fri === 'boolean' ? fri : false,
            sat: typeof sat === 'boolean' ? sat : false,
        };

        habitLog.sunday = checkedDays.sun;
        habitLog.monday = checkedDays.mon;
        habitLog.tuesday = checkedDays.tue;
        habitLog.wednesday = checkedDays.wed;
        habitLog.thursday = checkedDays.thu;
        habitLog.friday = checkedDays.fri;
        habitLog.saturday = checkedDays.sat;

        await habitLog.save();

        const updatedStreak = await updateStreak(habitLog, checkedDays);

        await habitLog.save();

        res.status(200).json({
            message: 'Checked days updated successfully',
            updatedStreak: updatedStreak, // Add the updated streak value here
          });

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
