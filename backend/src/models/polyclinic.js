const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Polyclinic = sequelize.define('Polyclinic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'polyclinics',
  timestamps: true,
});

module.exports = Polyclinic;
