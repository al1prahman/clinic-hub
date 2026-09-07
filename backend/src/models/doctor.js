const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  licenseNumber: {
    type: DataTypes.STRING(50),
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'doctors',
  timestamps: true,
});

module.exports = Doctor;
