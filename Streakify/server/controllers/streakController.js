const { Streak } = require('../models'); // Adjust the path as needed


const updateStreak = async (habitLog, checkedDays) => {
    try {
        // Validate that checkedDays is defined and has all properties
        if (!checkedDays || Object.values(checkedDays).some(day => typeof day === 'undefined')) {
            throw new Error("Invalid checkedDays object passed to updateStreak");
        }

        // Convert checkedDays object to an array of boolean values
        const daysArray = [checkedDays.sun, checkedDays.mon, checkedDays.tue, checkedDays.wed, checkedDays.thu, checkedDays.fri, checkedDays.sat];

        // Calculate streak
        let streak = 0;
        let isNewStreak = true; // Track if we're starting a new streak

        // Loop through the array from the last day backward
        for (let i = daysArray.length - 1; i >= 0; i--) {
            if (daysArray[i]) {
                if (isNewStreak) {
                    streak++; // Increment streak for consecutive checked days
                }
            } else {
                if (streak > 0) {
                    isNewStreak = false; // Stop counting the current streak once a break is encountered
                    break;
                }
            }
        }

        // Update streak in HabitLog
        habitLog.streak_count = streak;
        await habitLog.save();
        return habitLog.streak_count;
    } catch (error) {
        console.error('Error updating streak:', error);
        throw error; // Let the caller handle the error
    }
};

const calculateConsecutiveDaysStreak = (checkedDays) => {
    const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    // Create an array of indices for the checked days
    const checkedIndices = checkedDays.map(day => weekDays.indexOf(day));

    if (checkedIndices.length === 0) {
        return 0; // No checked days, streak is zero
    }

    // Sort indices to ensure correct order
    checkedIndices.sort((a, b) => a - b);

    let streak = 1; // Start with a streak of 1 for the first checked day

    for (let i = 1; i < checkedIndices.length; i++) {
        // Check if the current day is consecutive to the previous day
        if (checkedIndices[i] === checkedIndices[i - 1] + 1) {
            streak++;
        } else {
            break; // Stop counting if the streak is broken
        }
    }

    return streak;
};

module.exports = {
    updateStreak,
    calculateConsecutiveDaysStreak,
};
