const mongoose = require('mongoose');

const testingCenterSchema = new mongoose.Schema({
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
  testTypes: [String],
  requiresAppointment: Boolean,
  resultWaitTime: String,
  cost: String,
  notes: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location-based queries
testingCenterSchema.index({ location: '2dsphere' });

const TestingCenter = mongoose.model('TestingCenter', testingCenterSchema);

module.exports = TestingCenter;
