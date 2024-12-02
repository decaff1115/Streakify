const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Habit = require('./Habit'); 

const HabitLog = sequelize.define('HabitLog', {
    completed_at: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    value: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['completed_at', 'habit_id']
        }
    ]
});

HabitLog.belongsTo(Habit, { foreignKey: 'habit_id' });  
Habit.hasMany(HabitLog, { foreignKey: 'habit_id' });   

module.exports = HabitLog;
