const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MedicalRecord = sequelize.define('MedicalRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  complaint: {
    type: DataTypes.TEXT,
  },
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
  diagnosis: {
    type: DataTypes.TEXT,
  },
  therapyPlan: {
    type: DataTypes.TEXT,
    field: 'therapy_plan',
  },
  examinationDate: {
    type: DataTypes.DATE,
    field: 'examination_date',
  },
}, {
  tableName: 'medical_records',
  timestamps: true,
});

module.exports = MedicalRecord;
