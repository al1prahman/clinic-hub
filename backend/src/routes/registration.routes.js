const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');

// GET /api/registrations?page=1&limit=10&status=&visit_date=
router.get('/', registrationController.getAll);

// POST /api/registrations
router.post('/', registrationController.create);

// PUT /api/registrations/:id
router.put('/:id', registrationController.update);

module.exports = router;
