const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');

// POST /api/prescriptions
router.post('/', prescriptionController.create);

// GET /api/prescriptions/:id
router.get('/:id', prescriptionController.getById);

module.exports = router;
