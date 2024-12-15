const { Sequelize } = require('sequelize');
const sequelize = require('../configs/database');

const User = require('./User');
const Habit = require('./Habit');
const HabitLog = require('./HabitLog');

// Define relationships
User.hasMany(Habit, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many Habits
Habit.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Habit belongs to a User

Habit.hasMany(HabitLog, { foreignKey: 'habit_id', onDelete: 'CASCADE' }); // Habit has many HabitLogs
HabitLog.belongsTo(Habit, { foreignKey: 'habit_id', onDelete: 'CASCADE' }); // HabitLog belongs to a Habit

User.hasMany(HabitLog, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many HabitLogs
HabitLog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // HabitLog belongs to a User

module.exports = { sequelize, User, Habit, HabitLog };
