const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Prescription = sequelize.define('Prescription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  medicationName: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'medication_name',
  },
  dosage: {
    type: DataTypes.STRING(100),
  },
  frequency: {
    type: DataTypes.STRING(100),
  },
  duration: {
    type: DataTypes.STRING(100),
  },
  instructions: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'prescriptions',
  timestamps: true,
});

module.exports = Prescription;
