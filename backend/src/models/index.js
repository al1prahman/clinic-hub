const { sequelize } = require('./config/database');

// Models
const User = require('./models/user');
const Patient = require('./models/patient');
const Polyclinic = require('./models/polyclinic');
const Doctor = require('./models/doctor');
const Registration = require('./models/registration');
const Queue = require('./models/queue');
const MedicalRecord = require('./models/medicalRecord');
const Prescription = require('./models/prescription');

// Define associations
// User -> Doctor (1:1)
Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Doctor, { foreignKey: 'userId', as: 'doctor' });

// Polyclinic -> Doctor (1:M)
Doctor.belongsTo(Polyclinic, { foreignKey: 'polyclinicId', as: 'polyclinic' });
Polyclinic.hasMany(Doctor, { foreignKey: 'polyclinicId', as: 'doctors' });

// User -> Registration (Doctor)
Registration.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Doctor.hasMany(Registration, { foreignKey: 'doctorId', as: 'registrations' });

// Patient -> Registration (1:M)
Registration.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Patient.hasMany(Registration, { foreignKey: 'patientId', as: 'registrations' });

// Polyclinic -> Registration
Registration.belongsTo(Polyclinic, { foreignKey: 'polyclinicId', as: 'polyclinic' });
Polyclinic.hasMany(Registration, { foreignKey: 'polyclinicId', as: 'registrations' });

// Registration -> Queue (1:1)
Queue.belongsTo(Registration, { foreignKey: 'registrationId', as: 'registration' });
Registration.hasOne(Queue, { foreignKey: 'registrationId', as: 'queue' });

// Patient -> Queue (1:M)
Queue.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Patient.hasMany(Queue, { foreignKey: 'patientId', as: 'queues' });

// Doctor -> Queue (1:M)
Queue.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Doctor.hasMany(Queue, { foreignKey: 'doctorId', as: 'queues' });

// Registration -> MedicalRecord (1:1)
MedicalRecord.belongsTo(Registration, { foreignKey: 'registrationId', as: 'registration' });
Registration.hasOne(MedicalRecord, { foreignKey: 'registrationId', as: 'medicalRecord' });

// Patient -> MedicalRecord (1:M)
MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Patient.hasMany(MedicalRecord, { foreignKey: 'patientId', as: 'medicalRecords' });

// Doctor -> MedicalRecord (1:M)
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctorId', as: 'medicalRecords' });

// MedicalRecord -> Prescription (1:M)
Prescription.belongsTo(MedicalRecord, { foreignKey: 'medicalRecordId', as: 'medicalRecord' });
MedicalRecord.hasMany(Prescription, { foreignKey: 'medicalRecordId', as: 'prescriptions' });

// Export
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
};
