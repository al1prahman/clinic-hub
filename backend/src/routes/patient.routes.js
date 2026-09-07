const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { body } = require('express-validator');

// All patient routes require authentication
router.use(authenticate);

// GET /api/patients?page=1&limit=10&search=
router.get('/', validate, patientController.getAll);

// POST /api/patients
router.post(
  '/',
  [
    body('nik').notEmpty().withMessage('NIK is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('gender').isIn(['L', 'P']).withMessage('Gender must be L or P'),
    body('dateOfBirth').isDate().withMessage('Date of birth is required'),
  ],
  patientController.create
);

// GET /api/patients/:id
router.get('/:id', patientController.getById);

// PUT /api/patients/:id
router.put('/:id', patientController.update);

// DELETE /api/patients/:id
router.delete('/:id', patientController.delete);

module.exports = router;
