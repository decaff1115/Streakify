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
        // description: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        target_frequency: {
            // DAILY or WEEKLY selection
            type: DataTypes.ENUM('DAILY', 'WEEKLY'),
            allowNull: false,
        },
        daily_days: {
            // For DAILY frequency, track which days the habit is for
            type: DataTypes.JSON, // Store an array of days
            allowNull: true,
            validate: {
                isValidDays(value) {
                    const validDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
                    if (value && !Array.isArray(value)) {
                        throw new Error('daily_days must be an array');
                    }
                    if (value && !value.every(day => validDays.includes(day))) {
                        throw new Error(`Invalid day(s) in daily_days. Valid days are: ${validDays.join(', ')}`);
                    }
                },
            },
        },
        target_value: {
            // Times/Minutes
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        target_unit: {
            // Per Day or Per Week
            type: DataTypes.ENUM('Per Day', 'Per Week'),
            allowNull: true,
        },
        time_of_day: {
            // Morning, Afternoon, Evening, AnyTime
            type: DataTypes.ENUM('Morning', 'Afternoon', 'Evening', 'AnyTime'),
            allowNull: true,
        },
        start_date: {
            // Calendar selection from frontend
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        completion_rate: {
            // Calculated dynamically or updated externally
            type: DataTypes.FLOAT,
            allowNull: true,
            get() {
                return this.getDataValue('completion_rate') || 0;
            },
        },
        measurement_type: {
            // Times or Minutes
            type: DataTypes.ENUM('TIMES', 'MINUTES'),
            allowNull: true,
        }
    },
    { timestamps: true }
);

// Associations
Habit.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Habit, { foreignKey: 'user_id' });

module.exports = Habit;
