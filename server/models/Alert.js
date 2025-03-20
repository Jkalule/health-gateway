const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true,
    index: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  regions: {
    type: [String],
    enum: ['central', 'western', 'eastern', 'northern', 'all'],
    default: ['all']
  },
  source: {
    name: String,
    url: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
