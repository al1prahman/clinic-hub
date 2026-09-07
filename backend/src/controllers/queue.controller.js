const { Queue, Registration, Patient, Doctor } = require('../models');
const { success, error } = require('../utils/response');
const { Op } = require('sequelize');
const moment = require('moment');

// Auto-generate queue number (A001, A002...)
const generateQueueNumber = async () => {
  const today = moment().format('YYYY-MM-DD');
  const lastQueue = await Queue.findOne({
    where: {
      queueNumber: { [Op.like]: `A%` },
    },
    order: [['id', 'DESC']],
  });

  let nextNum = 1;
  if (lastQueue && lastQueue.queueNumber) {
    const match = lastQueue.queueNumber.match(/^A(\d+)$/);
    if (match) {
      nextNum = parseInt(match[1]) + 1;
    }
  }
  return `A${String(nextNum).padStart(3, '0')}`;
};

exports.getAll = async (req, res, next) => {
  try {
    const { status } = req.query;
    const today = moment().startOf('day').toDate();

    const where = {
      createdAt: { [Op.gte]: today },
    };
    if (status) {
      where.status = status;
    }

    const queues = await Queue.findAll({
      where,
      order: [['createdAt', 'ASC']],
      include: [
        { model: Registration, as: 'registration', attributes: ['id', 'visitDate', 'status'] },
        { model: Patient, as: 'patient', attributes: ['id', 'name', 'medicalRecordNumber'] },
        { model: Doctor, as: 'doctor', attributes: ['id', 'licenseNumber'] },
      ],
    });

    res.json({
      success: true,
      message: 'Queues retrieved successfully',
      data: queues,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { registrationId } = req.body;

    if (!registrationId) {
      return error(res, 'registrationId is required', null, 400);
    }

    // Check if registration exists
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      return error(res, 'Registration not found', null, 404);
    }

    // Check if queue already exists for this registration
    const existingQueue = await Queue.findOne({ where: { registrationId } });
    if (existingQueue) {
      return error(res, 'Queue already exists for this registration', null, 409);
    }

    const queueNumber = await generateQueueNumber();

    const queue = await Queue.create({
      queueNumber,
      registrationId,
      patientId: registration.patientId,
      doctorId: registration.doctorId,
    });

    res.status(201).json({
      success: true,
      message: 'Queue created successfully',
      data: queue,
    });
  } catch (err) {
    next(err);
  }
};

exports.call = async (req, res, next) => {
  try {
    const { id } = req.params;

    const queue = await Queue.findByPk(id);
    if (!queue) {
      return error(res, 'Queue not found', null, 404);
    }

    queue.status = 'pemeriksaan';
    queue.calledAt = new Date();
    await queue.save();

    res.json({
      success: true,
      message: 'Queue called successfully',
      data: queue,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const queue = await Queue.findByPk(id);
    if (!queue) {
      return error(res, 'Queue not found', null, 404);
    }

    queue.status = status;
    await queue.save();

    res.json({
      success: true,
      message: 'Queue status updated successfully',
      data: queue,
    });
  } catch (err) {
    next(err);
  }
};
