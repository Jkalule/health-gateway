const TestingCenter = require('../models/TestingCenter');

// Get testing centers
exports.getTestingCenters = async (req, res) => {
  try {
    const { region, district, testType } = req.query;
    
    // Build query
    const query = {};
    
    if (region) {
      query.region = region;
    }
    
    if (district) {
      query.district = district;
    }
    
    if (testType) {
      query.testTypes = testType;
    }
    
    const testingCenters = await TestingCenter.find(query).lean();
    
    res.json(testingCenters);
  } catch (error) {
    console.error('Error fetching testing centers:', error);
    res.status(500).json({ error: 'Failed to fetch testing centers' });
  }
};

// Get testing centers near a location
exports.getNearbyTestingCenters = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters
    
    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude are required' });
    }
    
    const nearbyTestingCenters = await TestingCenter.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).lean();
    
    res.json(nearbyTestingCenters);
  } catch (error) {
    console.error('Error fetching nearby testing centers:', error);
    res.status(500).json({ error: 'Failed to fetch nearby testing centers' });
  }
};
