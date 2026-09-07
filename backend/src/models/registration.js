const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'visit_date',
  },
  paymentType: {
    type: DataTypes.ENUM('bpjs', 'umum', 'vip'),
    allowNull: false,
    defaultValue: 'umum',
    field: 'payment_type',
  },
  initialComplaint: {
    type: DataTypes.TEXT,
    field: 'initial_complaint',
  },
  status: {
    type: DataTypes.ENUM('menunggu', 'check_in', 'pemeriksaan', 'selesai'),
    allowNull: false,
    defaultValue: 'menunggu',
  },
  registrationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'registration_date',
  },
}, {
  tableName: 'registrations',
  timestamps: true,
});

module.exports = Registration;
