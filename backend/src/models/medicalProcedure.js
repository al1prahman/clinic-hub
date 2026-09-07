const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MedicalProcedure = sequelize.define('MedicalProcedure', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  medicalRecordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'medical_record_id',
    references: {
      model: 'medical_records',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  procedureName: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'procedure_name',
  },
  procedureNotes: {
    type: DataTypes.TEXT,
    field: 'procedure_notes',
  },
  cost: {
    type: DataTypes.DECIMAL(12, 2),
  },
}, {
  tableName: 'medical_procedures',
  timestamps: true,
});

module.exports = MedicalProcedure;
