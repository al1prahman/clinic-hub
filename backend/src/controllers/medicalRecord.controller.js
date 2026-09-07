const { MedicalRecord, Registration, Patient, Doctor } = require('../models');
const { success, error } = require('../utils/response');

exports.create = async (req, res, next) => {
  try {
    const { registrationId, complaint, bloodPressure, temperature, weight, height, diagnosis, therapyPlan } = req.body;

    if (!registrationId) {
      return error(res, 'registrationId is required', null, 400);
    }

    // Check if registration exists
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      return error(res, 'Registration not found', null, 404);
    }

    // Create medical record
    const medicalRecord = await MedicalRecord.create({
      registrationId,
      patientId: registration.patientId,
      doctorId: registration.doctorId,
      complaint,
      bloodPressure,
      temperature,
      weight,
      height,
      diagnosis,
      therapyPlan,
      examinationDate: new Date(),
    });

    // Update registration status to 'selesai'
    await registration.update({ status: 'selesai' });

    // Reload with associations
    const fullRecord = await MedicalRecord.findByPk(medicalRecord.id, {
      include: [
        { model: Registration, as: 'registration' },
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Medical record created successfully',
      data: fullRecord,
    });
  } catch (err) {
    next(err);
  }
};

exports.getByPatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check patient exists
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return error(res, 'Patient not found', null, 404);
    }

    const records = await MedicalRecord.findAll({
      where: { patientId: id },
      order: [['createdAt', 'DESC']],
      include: [
        { model: Registration, as: 'registration', attributes: ['id', 'visitDate', 'status'] },
        { model: Doctor, as: 'doctor', attributes: ['id', 'licenseNumber'] },
      ],
    });

    res.json({
      success: true,
      message: 'Medical records retrieved successfully',
      data: records,
    });
  } catch (err) {
    next(err);
  }
};
