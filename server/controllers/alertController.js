const Alert = require('../models/Alert');

// Get active alerts
exports.getAlerts = async (req, res) => {
  try {
    const { region, disease, severity } = req.query;
    
    // Build filter query
    const query = { isActive: true };
    
    if (region) {
      query.regions = { $in: [region, 'all'] };
    }
    
    if (disease) {
      query.disease = disease;
    }
    
    if (severity) {
      query.severity = severity;
    }
    
    // Add expiration filter
    query.$or = [
      { expiresAt: { $gt: new Date() } },
      { expiresAt: { $exists: false } }
    ];
    
    const alerts = await Alert.find(query)
      .sort({ createdAt: -1 })
      .lean();
      
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

// Create a new alert (admin function)
exports.createAlert = async (req, res) => {
  try {
    const { title, message, disease, severity, regions, source, expiresAt } = req.body;
    
    const newAlert = new Alert({
      title,
      message,
      disease,
      severity,
      regions: regions || ['all'],
      source,
      expiresAt
    });
    
    await newAlert.save();
    
    // Emit socket event for real-time notification
    const io = req.app.get('io');
    
    // Emit to general alert channel
    io.emit('new-alert', newAlert);
    
    // Also emit to region-specific channels
    if (regions && regions.length) {
      regions.forEach(region => {
        io.to(`alerts-${region}`).emit('new-alert', newAlert);
      });
    }
    
    res.status(201).json(newAlert);
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};
