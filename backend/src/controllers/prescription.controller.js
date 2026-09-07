const { Prescription, MedicalRecord } = require('../models');
const { success, error } = require('../utils/response');

exports.create = async (req, res, next) => {
  try {
    const { medicalRecordId, medicationName, dosage, frequency, duration, instructions } = req.body;

    if (!medicalRecordId || !medicationName) {
      return error(res, 'medicalRecordId and medicationName are required', null, 400);
    }

    // Check if medical record exists
    const medicalRecord = await MedicalRecord.findByPk(medicalRecordId);
    if (!medicalRecord) {
      return error(res, 'Medical record not found', null, 404);
    }

    const prescription = await Prescription.create({
      medicalRecordId,
      medicationName,
      dosage,
      frequency,
      duration,
      instructions,
    });

    // Reload with association
    const fullPrescription = await Prescription.findByPk(prescription.id, {
      include: { model: MedicalRecord, as: 'medicalRecord' },
    });

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: fullPrescription,
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const prescription = await Prescription.findByPk(id, {
      include: { model: MedicalRecord, as: 'medicalRecord', attributes: ['id', 'complaint', 'diagnosis'] },
    });

    if (!prescription) {
      return error(res, 'Prescription not found', null, 404);
    }

    res.json({
      success: true,
      message: 'Prescription retrieved successfully',
      data: prescription,
    });
  } catch (err) {
    next(err);
  }
};
