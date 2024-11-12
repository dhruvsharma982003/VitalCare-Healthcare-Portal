const {DataTypes} = 
require('sequalize');
const sequalize = require('../config/db');

const User = sequalize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('patient', 'doctor', 'admin'),
        defaultValue: 'patient'
    }
}, {
    tableName: 'users',
    timeStamps: true
});

module.exports = User; 