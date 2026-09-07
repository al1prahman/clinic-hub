const { DataTypes, QueryTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Helper: auto-generate queue_number (A + 3-digit padded)
async function generateQueueNumber() {
  const result = await sequelize.query(
    "SELECT MAX(CAST(SUBSTR(queue_number, 2) AS UNSIGNED)) AS maxNum FROM queues",
    { type: QueryTypes.SELECT }
  );
  const nextNum = (result && result[0] && result[0].maxNum ? result[0].maxNum : 0) + 1;
  return `A${String(nextNum).padStart(3, '0')}`;
}

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
    field: 'queue_number',
  },
  registrationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'registration_id',
    references: {
      model: 'registrations',
      key: 'id',
    },
    onDelete: 'CASCADE',
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
  calledAt: {
    type: DataTypes.DATE,
    field: 'called_at',
  },
  status: {
    type: DataTypes.ENUM('menunggu', 'check_in', 'pemeriksaan', 'selesai'),
    allowNull: false,
    defaultValue: 'menunggu',
  },
}, {
  tableName: 'queues',
  timestamps: true,
  hooks: {
    beforeCreate: async (queue) => {
      if (!queue.queueNumber) {
        queue.queueNumber = await generateQueueNumber();
      }
    },
  },
});

module.exports = Queue;
