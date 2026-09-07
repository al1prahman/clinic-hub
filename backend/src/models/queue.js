const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Queue = sequelize.define('Queue', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  queueNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  calledAt: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('menunggu', 'check_in', 'pemeriksaan', 'selesai'),
    allowNull: false,
    defaultValue: 'menunggu',
  },
}, {
  tableName: 'queues',
  timestamps: true,
});

module.exports = Queue;
