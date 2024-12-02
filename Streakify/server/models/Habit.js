const {DataTypes} = require('sequelize');
const sequelize = require('../configs/database');
const User = require('./User');

const Habit = sequelize.define('Habit', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    target_frequency: { 
        type: DataTypes.ENUM('DAILY', 'WEEKLY'), 
        allowNull: false 
    },
    target_value: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    reminder_time: { 
        type: DataTypes.TIME, 
        allowNull: true 
    },
    completion_rate: { 
        type: DataTypes.FLOAT,
        allowNull: true,
        get(){
            // Dynamically compute the completion rate
            // This would typically need a custom method or calculated field.
            return this.getDataValue('completion_rate');
        }
    }
}, {timestamps: true});


Habit.belongsTo(User, { foreignKey: 'user_id' });  
User.hasMany(Habit, { foreignKey: 'user_id' });   

module.exports = Habit;
