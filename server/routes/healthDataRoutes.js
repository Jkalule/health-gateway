const express = require('express');
const healthDataController = require('../controllers/healthDataController');

const router = express.Router();

// Get summary of health data for all diseases
router.get('/', healthDataController.getHealthDataSummary);

// Get data for a specific disease
router.get('/disease/:disease', healthDataController.getDiseaseData);

// Get health data aggregated by region - will be implemented to support the map view
router.get('/regions', healthDataController.getRegionalStats);

// Get comparative data for multiple diseases - will be implemented to support comparison charts
router.get('/comparative', healthDataController.getComparativeData);

module.exports = router;
