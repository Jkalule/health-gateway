const VaccinationSite = require('../models/VaccinationSite');

// Get vaccination sites
exports.getVaccinationSites = async (req, res) => {
  try {
    const { region, district, vaccine } = req.query;
    
    // Build query
    const query = {};
    
    if (region) {
      query.region = region;
    }
    
    if (district) {
      query.district = district;
    }
    
    if (vaccine) {
      query.availableVaccines = vaccine;
    }
    
    const vaccinationSites = await VaccinationSite.find(query).lean();
    
    res.json(vaccinationSites);
  } catch (error) {
    console.error('Error fetching vaccination sites:', error);
    res.status(500).json({ error: 'Failed to fetch vaccination sites' });
  }
};

// Get vaccination sites near a location
exports.getNearbyVaccinationSites = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters
    
    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude are required' });
    }
    
    const nearbyVaccinationSites = await VaccinationSite.find({
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
    
    res.json(nearbyVaccinationSites);
  } catch (error) {
    console.error('Error fetching nearby vaccination sites:', error);
    res.status(500).json({ error: 'Failed to fetch nearby vaccination sites' });
  }
};
