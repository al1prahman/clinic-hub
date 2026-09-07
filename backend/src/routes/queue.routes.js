const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queue.controller');

// GET /api/queues?status=
router.get('/', queueController.getAll);

// POST /api/queues
router.post('/', queueController.create);

// PUT /api/queues/:id/call
router.put('/:id/call', queueController.call);

// PUT /api/queues/:id/status
router.put('/:id/status', queueController.updateStatus);

module.exports = router;
