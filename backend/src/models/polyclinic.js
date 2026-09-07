const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Polyclinic = sequelize.define('Polyclinic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'name',
  },
  description: {
    type: DataTypes.TEXT,
    field: 'description',
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
  },
}, {
  tableName: 'polyclinics',
  timestamps: true,
});

module.exports = Polyclinic;
