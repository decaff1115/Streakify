const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const User = require('./User');
const Habit = require('./Habit');

const HabitLog = sequelize.define(
    'HabitLog',
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Ensure this matches the User model's table name
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        habit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'habits', // Ensure this matches the Habit model's table name
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        monday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        tuesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        wednesday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        thursday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        friday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        saturday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        sunday: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: false, // Enable timestamps (createdAt, updatedAt)
        tableName: 'HabitLogs', // Explicitly set table name
    }
);

// Associations
HabitLog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
HabitLog.belongsTo(Habit, { foreignKey: 'habit_id', onDelete: 'CASCADE' });
User.hasMany(HabitLog, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Habit.hasMany(HabitLog, { foreignKey: 'habit_id', onDelete: 'CASCADE' });

module.exports = HabitLog;
