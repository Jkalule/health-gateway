const mongoose = require('mongoose');

const vaccinationSiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  region: {
    type: String,
    enum: ['central', 'western', 'eastern', 'northern'],
    required: true,
    index: true
  },
  district: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  contactPhone: String,
  operatingHours: String,
  availableVaccines: [String],
  walkInAllowed: Boolean,
  appointmentRequired: Boolean,
  notes: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location-based queries
vaccinationSiteSchema.index({ location: '2dsphere' });

const VaccinationSite = mongoose.model('VaccinationSite', vaccinationSiteSchema);

module.exports = VaccinationSite;
