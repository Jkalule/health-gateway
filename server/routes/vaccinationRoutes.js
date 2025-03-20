const express = require('express');
const vaccinationController = require('../controllers/vaccinationController');

const router = express.Router();

// Get vaccination sites
router.get('/', vaccinationController.getVaccinationSites);

// Get vaccination sites near a location
router.get('/nearby', vaccinationController.getNearbyVaccinationSites);

module.exports = router;
