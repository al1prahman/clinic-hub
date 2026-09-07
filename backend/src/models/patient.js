const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  medicalRecordNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  nik: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('L', 'P'),
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  address: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'patients',
  timestamps: true,
});

module.exports = Patient;
