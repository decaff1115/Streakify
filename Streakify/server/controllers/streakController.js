const { Streak } = require('../models'); // Adjust the path as needed


const updateStreak = async (habitLog, checkedDays) => {
    try {
        console.log("Checked Days in updateStreak:", checkedDays); // Log for debugging

        // Validate that checkedDays is defined and has all properties
        if (!checkedDays || Object.values(checkedDays).some(day => typeof day === 'undefined')) {
            throw new Error("Invalid checkedDays object passed to updateStreak");
        }
    
        console.log("Validated CheckedDays in updateStreak:", checkedDays);

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
        console.log("Calculated streak:", streak); // Debugging log
        habitLog.streak_count = streak;
        await habitLog.save();
        console.log("Streak saved:", habitLog.streak_count); 

        return habitLog.streak_count;
    } catch (error) {
        console.error('Error updating streak:', error);
        throw error; // Let the caller handle the error
    }
    //const checkedDays = getCheckedDaysFromLog(habitLog);
    // const streak = calculateConsecutiveDaysStreak(checkedDays);  // Calculate streak
    // //const progressCount = addProgressCount(checkedDays);         // Track progress even if streak is broken

    // // Find existing streak
    // const existingStreak = await Streak.findOne({
    //     where: {
    //         user_id: habitLog.user_id,
    //         habit_id: habitLog.habit_id,
    //     },
    // });

    // if (existingStreak) {
    //     // Reset streak to 0 if the current streak is broken
    //     const newStreakCount = streak === 0 ? 0 : streak;

    //     await existingStreak.update({
    //         streak_count: newStreakCount,
    //         progress_count: progressCount,
    //     });
    // } else {
    //     // Create a new streak if none exists
    //     await Streak.create({
    //         user_id: habitLog.user_id,
    //         habit_id: habitLog.habit_id,
    //         streak_count: streak,
    //         progress_count: progressCount,
    //     });
    // }
};

// const getCheckedDaysFromLog = (habitLog) => {
//     return [
//         habitLog.monday ? 'monday' : null,
//         habitLog.tuesday ? 'tuesday' : null,
//         habitLog.wednesday ? 'wednesday' : null,
//         habitLog.thursday ? 'thursday' : null,
//         habitLog.friday ? 'friday' : null,
//         habitLog.saturday ? 'saturday' : null,
//         habitLog.sunday ? 'sunday' : null,
//     ].filter(day => day !== null);
// };

// const calculateConsecutiveDaysStreak = (checkedDays) => {
//     const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//     let streak = 0;
//     let consecutive = true;

//     // Loop through the week days, count consecutive days where habit was completed
//     for (let i = 0; i < weekDays.length; i++) {
//         if (checkedDays.includes(weekDays[i]) && consecutive) {
//             streak++;
//         } else {
//             consecutive = false; // Break the streak when a day is not checked
//         }
//     }

//     return streak;
// };

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

// const addProgressCount = (checkedDays) => {
//     const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//     let progressCount = 0;

//     // Count the days that are checked, regardless of streak
//     for (let i = 0; i < weekDays.length; i++) {
//         if (checkedDays.includes(weekDays[i])) {
//             progressCount++;
//         }
//     }

//     return progressCount;
// };

module.exports = {
    updateStreak,
    //getCheckedDaysFromLog,
    calculateConsecutiveDaysStreak,
    //addProgressCount
};
