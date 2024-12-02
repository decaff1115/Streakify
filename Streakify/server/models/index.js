const { Sequelize } = require('sequelize');
const sequelize = require('../configs/database');

const User = require('./User');
const Habit = require('./Habit');
const HabitLog = require('./HabitLog');
const Streak = require('./Streak');

User.hasMany(Habit, { foreignKey: 'user_id' });
Habit.belongsTo(User, { foreignKey: 'user_id' });

Habit.hasMany(HabitLog, { foreignKey: 'habit_id' });
HabitLog.belongsTo(Habit, { foreignKey: 'habit_id' });

Habit.hasMany(Streak, { foreignKey: 'habit_id' });
Streak.belongsTo(Habit, { foreignKey: 'habit_id' });

module.exports = { sequelize, User, Habit, HabitLog, Streak };
