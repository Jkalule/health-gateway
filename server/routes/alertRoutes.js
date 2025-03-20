const express = require('express');
const alertController = require('../controllers/alertController');

const router = express.Router();

// Get active alerts
router.get('/', alertController.getAlerts);

// Create new alert (admin only)
router.post('/', alertController.createAlert);

module.exports = router;
