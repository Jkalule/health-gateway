const mongoose = require('mongoose');

const healthGuidelineSchema = new mongoose.Schema({
  disease: {
    type: String,
    required: true,
    unique: true
  },
  overview: {
    type: String,
    required: true
  },
  signs: [{
    type: String,
    required: true
  }],
  symptoms: [{
    type: String,
    required: true
  }],
  preventionMeasures: [{
    type: String,
    required: true
  }],
  firstAid: [{
    type: String,
    required: true
  }],
  riskFactors: [{
    type: String,
    required: true
  }],
  whenToSeekHelp: [{
    type: String,
    required: true
  }],
  source: {
    type: String,
    required: true,
    enum: ['WHO', 'CDC', 'MOH', 'AFRICA_CDC']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HealthGuideline', healthGuidelineSchema);
