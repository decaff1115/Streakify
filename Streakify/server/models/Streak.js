const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Habit = require('./Habit'); 

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
            return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)); 
        }
    }
}, { timestamps: false });

Streak.belongsTo(Habit, { foreignKey: 'habit_id' });  
Habit.hasMany(Streak, { foreignKey: 'habit_id' });   

module.exports = Streak;