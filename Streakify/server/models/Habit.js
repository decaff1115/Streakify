const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const User = require('./User');

const Habit = sequelize.define(
    'Habit',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        goal: {
            // Target number of times the habit needs to be done
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            // Default to the day the habit is created
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            // Links the habit to a user
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Ensure 'Users' matches the table name of your User model
                key: 'id',
            },
            onDelete: 'CASCADE', // Deletes habits when the user is deleted
        },
    },
    { 
        timestamps: false, // Disable automatic Sequelize timestamps since `created_at` is custom
        tableName: 'Habits', // Explicitly specify the table name if necessary
    }
);

// Associations
Habit.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Habit, { foreignKey: 'user_id' });

module.exports = Habit;
