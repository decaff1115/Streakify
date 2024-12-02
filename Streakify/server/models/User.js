const{DataTypes} = require('sequelize');
const sequalize = require('../configs/database');


const User = sequalize.define('User',{
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password_hash: {type: DataTypes.STRING, allowNull: false},

}, {timestamps: true});


module.exports = User;
