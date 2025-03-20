const express = require('express');
const testingCenterController = require('../controllers/testingCenterController');

const router = express.Router();

// Get testing centers
router.get('/', testingCenterController.getTestingCenters);

// Get testing centers near a location
router.get('/nearby', testingCenterController.getNearbyTestingCenters);

module.exports = router;
