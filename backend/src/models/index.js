const { sequelize } = require('../config/database');

// Import models
const User = require('./user');
const Patient = require('./patient');
const Polyclinic = require('./polyclinic');
const Doctor = require('./doctor');
const Registration = require('./registration');
const Queue = require('./queue');
const MedicalRecord = require('./medicalRecord');
const Prescription = require('./prescription');
const MedicalProcedure = require('./medicalProcedure');

// ========================================
// Associations
// ========================================

// User <-> Doctor (1:1)
User.hasOne(Doctor, { foreignKey: 'userId', as: 'doctor' });
Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Polyclinic -> Doctor (1:M)
Polyclinic.hasMany(Doctor, { foreignKey: 'polyclinicId', as: 'doctors' });
Doctor.belongsTo(Polyclinic, { foreignKey: 'polyclinicId', as: 'polyclinic' });

// Patient -> Registration (1:M)
Patient.hasMany(Registration, { foreignKey: 'patientId', as: 'registrations' });
Registration.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

// Doctor -> Registration (1:M)
Doctor.hasMany(Registration, { foreignKey: 'doctorId', as: 'registrations' });
Registration.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

// Polyclinic -> Registration (1:M)
Polyclinic.hasMany(Registration, { foreignKey: 'polyclinicId', as: 'registrations' });
Registration.belongsTo(Polyclinic, { foreignKey: 'polyclinicId', as: 'polyclinic' });

// Registration <-> Queue (1:1)
Registration.hasOne(Queue, { foreignKey: 'registrationId', as: 'queue' });
Queue.belongsTo(Registration, { foreignKey: 'registrationId', as: 'registration' });

// Patient -> Queue (1:M)
Patient.hasMany(Queue, { foreignKey: 'patientId', as: 'queues' });
Queue.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

// Doctor -> Queue (1:M)
Doctor.hasMany(Queue, { foreignKey: 'doctorId', as: 'queues' });
Queue.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

// Registration <-> MedicalRecord (1:1)
Registration.hasOne(MedicalRecord, { foreignKey: 'registrationId', as: 'medicalRecord' });
MedicalRecord.belongsTo(Registration, { foreignKey: 'registrationId', as: 'registration' });

// Patient -> MedicalRecord (1:M)
Patient.hasMany(MedicalRecord, { foreignKey: 'patientId', as: 'medicalRecords' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

// Doctor -> MedicalRecord (1:M)
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctorId', as: 'medicalRecords' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

// MedicalRecord -> Prescription (1:M)
MedicalRecord.hasMany(Prescription, { foreignKey: 'medicalRecordId', as: 'prescriptions' });
Prescription.belongsTo(MedicalRecord, { foreignKey: 'medicalRecordId', as: 'medicalRecord' });

// MedicalRecord -> MedicalProcedure (1:M)
MedicalRecord.hasMany(MedicalProcedure, { foreignKey: 'medicalRecordId', as: 'medicalProcedures' });
MedicalProcedure.belongsTo(MedicalRecord, { foreignKey: 'medicalRecordId', as: 'medicalRecord' });

// ========================================
// Export
// ========================================
module.exports = {
  sequelize,
  User,
  Patient,
  Polyclinic,
  Doctor,
  Registration,
  Queue,
  MedicalRecord,
  Prescription,
  MedicalProcedure,
};
