const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  polyclinicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'polyclinic_id',
    references: {
      model: 'polyclinics',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  licenseNumber: {
    type: DataTypes.STRING(50),
    field: 'license_number',
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active',
  },
}, {
  tableName: 'doctors',
  timestamps: true,
});

module.exports = Doctor;
