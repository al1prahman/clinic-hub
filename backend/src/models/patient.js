const { DataTypes, QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Helper: auto-generate medical_record_number (RM + 3-digit padded)
async function generateMedicalRecordNumber() {
  const result = await sequelize.query(
    "SELECT MAX(CAST(SUBSTR(medical_record_number, 3) AS UNSIGNED)) AS maxNum FROM patients",
    { type: QueryTypes.SELECT }
  );
  const nextNum = (result && result[0] && result[0].maxNum ? result[0].maxNum : 0) + 1;
  return `RM${String(nextNum).padStart(3, '0')}`;
}

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
    field: 'medical_record_number',
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
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'date_of_birth',
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
  hooks: {
    beforeCreate: async (patient) => {
      if (!patient.medicalRecordNumber) {
        patient.medicalRecordNumber = await generateMedicalRecordNumber();
      }
    },
  },
});

module.exports = Patient;
