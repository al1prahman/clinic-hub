const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecord.controller');

// POST /api/medical-records
router.post('/', medicalRecordController.create);

// GET /api/medical-records/patient/:id
router.get('/patient/:id', medicalRecordController.getByPatient);

module.exports = router;
