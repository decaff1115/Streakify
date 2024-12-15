const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database'); // Adjust the path as needed 
const User = require('./User');
const Habit = require('./Habit');

const Streak = sequelize.define(
    'Streak',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Ensure this matches the table name of your User 
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        habit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'habits', // Ensure this matches the table name of your Habit 
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        streak_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        progress_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // New field for total progress
        },
    },
    {
        timestamps: false,
        tableName: 'Streak',
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'habit_id'], // Composite unique constraint
            },
        ],
    }
);

// Streak belongs to a User
Streak.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Streak belongs to a Habit
Streak.belongsTo(Habit, { foreignKey: 'habit_id', onDelete: 'CASCADE' });

// User has many Streaks
User.hasMany(Streak, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// Habit has many Streaks
Habit.hasMany(Streak, { foreignKey: 'habit_id', onDelete: 'CASCADE' });

module.exports = Streak;
