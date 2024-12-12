const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Habit = require('./Habit'); 
const HabitLog = require('./HabitLog'); // Import HabitLog

const Streak = sequelize.define('Streak', {
    start_date: { 
        type: DataTypes.DATE, 
        allowNull: false
    },
    end_date: { 
        type: DataTypes.DATE, 
        allowNull: false
    },
    length: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        get() {
            const startDate = this.getDataValue('start_date');
            const endDate = this.getDataValue('end_date');
            return Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
        }
    }
}, { timestamps: false });

// Relationships
Streak.belongsTo(Habit, { foreignKey: 'habit_id' });
Habit.hasMany(Streak, { foreignKey: 'habit_id' });

Streak.hasMany(HabitLog, { foreignKey: 'streak_id' }); // Streak has many HabitLogs
HabitLog.belongsTo(Streak, { foreignKey: 'streak_id' }); // HabitLog belongs to Streak

module.exports = Streak;
