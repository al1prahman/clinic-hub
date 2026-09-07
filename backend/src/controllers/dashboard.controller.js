const { Sequelize } = require('sequelize');
const { Registration, Queue, Patient } = require('../models');
const { success, error } = require('../utils/response');
const moment = require('moment');

exports.getStats = async (req, res, next) => {
  try {
    const today = moment().startOf('day').toDate();

    // Total patients (all-time)
    const totalPatients = await Patient.count();

    // Total registrations today
    const totalPatientsToday = await Registration.count({
      where: { createdAt: { [Sequelize.Op.gte]: today } },
    });

    // Total queues today
    const totalQueuesToday = await Queue.count({
      where: { createdAt: { [Sequelize.Op.gte]: today } },
    });

    // Total waiting (menunggu) today
    const totalWaiting = await Queue.count({
      where: {
        status: 'menunggu',
        createdAt: { [Sequelize.Op.gte]: today },
      },
    });

    // Total served (status selesai or pemeriksaan) today
    const totalServed = await Queue.count({
      where: {
        status: { [Sequelize.Op.in]: ['pemeriksaan', 'selesai'] },
        createdAt: { [Sequelize.Op.gte]: today },
      },
    });

    res.json({
      success: true,
      message: 'Dashboard statistics retrieved successfully',
      data: {
        totalPatients,
        totalPatientsToday,
        totalQueuesToday,
        totalWaiting,
        totalServed,
      },
    });
  } catch (err) {
    next(err);
  }
};
