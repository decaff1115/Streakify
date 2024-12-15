const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Habit = require('./Habit');
const User = require('./User');

const HabitLog = sequelize.define('HabitLog', {
    completed_at: {
        // Date the habit log was recorded
        type: DataTypes.DATEONLY, // Only track the date
        allowNull: false,
    },
    value: {
        // Number of times or minutes the habit was performed that day
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        // Status of the habit: COMPLETED or FAILED
        type: DataTypes.ENUM('COMPLETED', 'FAILED'),
        allowNull: false,
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['completed_at', 'habit_id', 'user_id'], // Ensure one log per user, habit, and date
        },
    ],
});

// Associations
HabitLog.belongsTo(Habit, { foreignKey: 'habit_id', onDelete: 'CASCADE' }); // Delete logs if habit is deleted
HabitLog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });  // Delete logs if user is deleted
Habit.hasMany(HabitLog, { foreignKey: 'habit_id' });
User.hasMany(HabitLog, { foreignKey: 'user_id' });

module.exports = HabitLog;
