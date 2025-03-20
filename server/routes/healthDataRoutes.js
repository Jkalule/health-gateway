const express = require('express');
const healthDataController = require('../controllers/healthDataController');

const router = express.Router();

// Get summary of health data for all diseases
router.get('/', healthDataController.getHealthDataSummary);

// Get data for a specific disease
router.get('/disease/:disease', healthDataController.getDiseaseData);

module.exports = router;
