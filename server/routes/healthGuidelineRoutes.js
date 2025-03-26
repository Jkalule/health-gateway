const express = require('express');
const router = express.Router();
const HealthGuideline = require('../models/HealthGuideline');

// Get all health guidelines
router.get('/', async (req, res) => {
  try {
    const guidelines = await HealthGuideline.find();
    res.json(guidelines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get guidelines for a specific disease
router.get('/:disease', async (req, res) => {
  try {
    const guideline = await HealthGuideline.findOne({ 
      disease: req.params.disease.toLowerCase() 
    });
    
    if (!guideline) {
      return res.status(404).json({ message: 'Guidelines not found' });
    }
    
    res.json(guideline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
