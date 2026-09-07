const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MedicalRecord = sequelize.define('MedicalRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registrationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'registration_id',
    references: {
      model: 'registrations',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'patient_id',
    references: {
      model: 'patients',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'doctor_id',
    references: {
      model: 'doctors',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  // Subjective
  complaint: {
    type: DataTypes.TEXT,
  },
  // Objective
  bloodPressure: {
    type: DataTypes.STRING(20),
    field: 'blood_pressure',
  },
  temperature: {
    type: DataTypes.DECIMAL(4, 1),
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2),
  },
  height: {
    type: DataTypes.DECIMAL(5, 2),
  },
  // Assessment
  diagnosis: {
    type: DataTypes.TEXT,
  },
  // Plan
  therapyPlan: {
    type: DataTypes.TEXT,
    field: 'therapy_plan',
  },
  examinationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'examination_date',
  },
}, {
  tableName: 'medical_records',
  timestamps: true,
});

module.exports = MedicalRecord;
