const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes
router.post('/logout', authenticate, authController.logout);

module.exports = router;
