const { Sequelize } = require('sequelize');
const sequelize = require('../configs/database');

const User = require('./User');
const Habit = require('./Habit');
const HabitLog = require('./HabitLog');
const Streak = require('./Streak'); 

// Define relationships
User.hasMany(Habit, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many Habits
Habit.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Habit belongs to a User

Habit.hasMany(HabitLog, { foreignKey: 'habit_id', onDelete: 'CASCADE' }); // Habit has many HabitLogs
HabitLog.belongsTo(Habit, { foreignKey: 'habit_id', onDelete: 'CASCADE' }); // HabitLog belongs to a Habit

User.hasMany(HabitLog, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many HabitLogs
HabitLog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // HabitLog belongs to a User

// Define relationships for Streak
User.hasMany(Streak, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // User has many Streaks
Habit.hasMany(Streak, { foreignKey: 'habit_id', onDelete: 'CASCADE' }); // Habit has many Streaks
Streak.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' }); // Streak belongs to a User
Streak.belongsTo(Habit, { foreignKey: 'habit_id', onDelete: 'CASCADE' }); // Streak belongs to a Habit

module.exports = { sequelize, User, Habit, HabitLog, Streak };
