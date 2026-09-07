const { Patient } = require('../models');
const { success, error } = require('../utils/response');
const { Op } = require('sequelize');

// Auto-generate medical record number
const generateMRNumber = async () => {
  const lastPatient = await Patient.findOne({
    order: [['createdAt', 'DESC']],
  });
  let nextNum = 1;
  if (lastPatient && lastPatient.medicalRecordNumber) {
    const match = lastPatient.medicalRecordNumber.match(/RM(\d+)/);
    if (match) {
      nextNum = parseInt(match[1]) + 1;
    }
  }
  return `RM${String(nextNum).padStart(3, '0')}`;
};

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { nik: { [Op.like]: `%${search}%` } },
        { medicalRecordNumber: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Patient.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      message: 'Patients retrieved successfully',
      data: { patients: rows, total: count, page: parseInt(page), limit: parseInt(limit) },
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return error(res, 'Patient not found', null, 404);
    }
    res.json({ success: true, message: 'Patient found', data: patient });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { nik, name, gender, dateOfBirth, phone, address } = req.body;

    // Check duplicate NIK
    const existing = await Patient.findOne({ where: { nik } });
    if (existing) {
      return error(res, 'NIK already exists', null, 409);
    }

    const medicalRecordNumber = await generateMRNumber();

    const patient = await Patient.create({
      medicalRecordNumber,
      nik,
      name,
      gender,
      dateOfBirth,
      phone,
      address,
    });

    res.status(201).json({
      success: true,
      message: 'Patient created successfully',
      data: patient,
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return error(res, 'Patient not found', null, 404);
    }

    // If NIK is being updated, check for duplicates
    if (req.body.nik && req.body.nik !== patient.nik) {
      const existing = await Patient.findOne({ where: { nik: req.body.nik } });
      if (existing) {
        return error(res, 'NIK already exists', null, 409);
      }
    }

    await patient.update(req.body);

    res.json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return error(res, 'Patient not found', null, 404);
    }
    await patient.destroy();
    res.json({ success: true, message: 'Patient deleted successfully', data: null });
  } catch (err) {
    next(err);
  }
};
