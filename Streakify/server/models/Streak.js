const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Habit = require('./Habit');
const User = require('./User'); // Import the User model

const Streak = sequelize.define('Streak', {
    current_streak: {
        // Tracks the current streak count (consecutive completions)
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    longest_streak: {
        // Tracks the longest streak achieved for this habit
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    last_completed_date: {
        // Tracks the date of the most recent completion
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    user_id: {
        // Foreign key to associate the streak with a user
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, { timestamps: true }); // Include timestamps for createdAt/updatedAt

// Relationships
Streak.belongsTo(Habit, { foreignKey: 'habit_id', onDelete: 'CASCADE' });
Streak.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Associate Streak with User
Habit.hasOne(Streak, { foreignKey: 'habit_id' });
User.hasMany(Streak, { foreignKey: 'user_id' }); // A user can have many streaks

module.exports = Streak;
