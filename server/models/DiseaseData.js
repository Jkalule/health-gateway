const mongoose = require('mongoose');

const diseaseDataSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  totalCases: {
    type: Number,
    required: true
  },
  activeCases: {
    type: Number,
    required: true
  },
  recoveries: {
    type: Number,
    required: true
  },
  deaths: {
    type: Number,
    required: true
  },
  newCases: {
    type: Number,
    default: 0
  },
  newRecoveries: {
    type: Number,
    default: 0
  },
  newDeaths: {
    type: Number,
    default: 0
  },
  regionData: {
    central: {
      cases: { type: Number, default: 0 },
      recoveries: { type: Number, default: 0 },
      deaths: { type: Number, default: 0 }
    },
    western: {
      cases: { type: Number, default: 0 },
      recoveries: { type: Number, default: 0 },
      deaths: { type: Number, default: 0 }
    },
    eastern: {
      cases: { type: Number, default: 0 },
      recoveries: { type: Number, default: 0 },
      deaths: { type: Number, default: 0 }
    },
    northern: {
      cases: { type: Number, default: 0 },
      recoveries: { type: Number, default: 0 },
      deaths: { type: Number, default: 0 }
    }
  },
  source: {
    name: String,
    url: String,
    fetchDate: Date
  },
  metadata: {
    lastUpdated: Date,
    notes: String
  }
});

const DiseaseData = mongoose.model('DiseaseData', diseaseDataSchema);

module.exports = DiseaseData;
