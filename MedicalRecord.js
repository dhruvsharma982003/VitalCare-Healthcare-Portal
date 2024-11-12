// backend/models/Appointment.js
const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const MedicalRecord = sequelize.define('MedicalRecord', {
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
    recordType: {
        type: DataTypes.ENUM('prescription', 'lab report', 'imaging', 'other'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, 
{
    tableName: 'medical_records',
    timestamps: true
});

// Associations
User.hasMany(MedicalRecord, { foreignKey: 'patientId', as: 'patientRecords'});
User.hasMany(MedicalRecord, { foreignKey: 'doctorId', as: 'doctorRecords'});
MedicalRecord.belongsTo(User, { foreignKey: 'patientId', as: 'patient'});
MedicalRecord.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor'});

module.exports = MedicalRecord; 