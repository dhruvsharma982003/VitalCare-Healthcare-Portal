// backend/models/Appointment.js
const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patientId: {
        type: DataTypes.INTEGER,
        references: {
            Model: User,
            key: 'id'
        }
    },
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            Model: User,
            key: 'id'
        }
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    appointmentTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'canceled'),
        defaultValue: 'scheduled'
    }
},{
    tableName: 'appointments',
    timeStamps: true
});
 
// Associations
User.hasMany(Appointment, { foreignKey: 'patientId', as: 'patientAppointments'});
User.hasMany(Appointment, { foreignKey: 'doctorId', as: 'doctorAppointments'});
Appointment.belongsTo(User, { foreignKey: 'patientId', as: 'patient'});
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor'});

module.exports = Appointment;