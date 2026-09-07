const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  visitDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paymentType: {
    type: DataTypes.ENUM('bpjs', 'umum', 'vip'),
    allowNull: false,
    defaultValue: 'umum',
  },
  initialComplaint: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('menunggu', 'check_in', 'pemeriksaan', 'selesai'),
    allowNull: false,
    defaultValue: 'menunggu',
  },
}, {
  tableName: 'registrations',
  timestamps: true,
});

module.exports = Registration;
