const { Registration, Patient, Doctor, Polyclinic } = require('../models');
const { success, error } = require('../utils/response');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, visit_date } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) {
      where.status = status;
    }
    if (visit_date) {
      where.visitDate = { [Op.eq]: new Date(visit_date) };
    }

    const { count, rows } = await Registration.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      include: [
        { model: Patient, as: 'patient', attributes: ['id', 'name', 'nik', 'medicalRecordNumber'] },
        { model: Doctor, as: 'doctor', attributes: ['id', 'licenseNumber', 'phone'] },
        { model: Polyclinic, as: 'polyclinic', attributes: ['id', 'name'] },
      ],
    });

    res.json({
      success: true,
      message: 'Registrations retrieved successfully',
      data: { registrations: rows, total: count, page: parseInt(page), limit: parseInt(limit) },
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { patient_id, doctor_id, polyclinic_id, visit_date, payment_type, initial_complaint } = req.body;

    if (!patient_id || !doctor_id || !polyclinic_id || !visit_date) {
      return error(res, 'patient_id, doctor_id, polyclinic_id, visit_date, and payment_type are required', null, 400);
    }

    const registration = await Registration.create({
      patientId: patient_id,
      doctorId: doctor_id,
      polyclinicId: polyclinic_id,
      visitDate: visit_date,
      paymentType: payment_type || 'umum',
      initialComplaint: initial_complaint,
    });

    // Reload with associations
    const fullRegistration = await Registration.findByPk(registration.id, {
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' },
        { model: Polyclinic, as: 'polyclinic' },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      data: fullRegistration,
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) {
      return error(res, 'Registration not found', null, 404);
    }

    const { status } = req.body;
    if (status) {
      registration.status = status;
    }

    await registration.save();

    res.json({
      success: true,
      message: 'Registration status updated successfully',
      data: registration,
    });
  } catch (err) {
    next(err);
  }
};
