const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('./src/websocket');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Import routes
const healthDataRoutes = require('./routes/healthDataRoutes');
const alertRoutes = require('./routes/alertRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const testingCenterRoutes = require('./routes/testingCenterRoutes');
const healthGuidelineRoutes = require('./routes/healthGuidelineRoutes');

// Import data fetchers
const { 
  fetchWHOData, 
  fetchMOHData, 
  fetchUNICEFData,
  fetchCDCData,
  fetchAfricaCDCData,
  processAndStoreData
} = require('./jobs/dataFetcher');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Initialize WebSocket
const io = setupWebSocket(server);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uganda-health-gateway')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/health-data', healthDataRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/vaccination-sites', vaccinationRoutes);
app.use('/api/testing-centers', testingCenterRoutes);
app.use('/api/health-guidelines', healthGuidelineRoutes);

// Socket connection for real-time alerts
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('subscribe-to-alerts', (preferences) => {
    // Logic to subscribe to specific alert categories
    console.log('Client subscribed to alerts with preferences:', preferences);
    socket.join(`alerts-${preferences.region || 'all'}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Make io accessible to route handlers
app.set('io', io);

// Schedule data fetching jobs
// Fetch data every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  try {
    console.log('Fetching health data from all sources...');
    const [whoData, mohData, unicefData, cdcData, africaCdcData] = await Promise.all([
      fetchWHOData(),
      fetchMOHData(),
      fetchUNICEFData(),
      fetchCDCData(),
      fetchAfricaCDCData()
    ]);

    await processAndStoreData(whoData, mohData, unicefData, cdcData, africaCdcData);
    
    // Notify all connected clients about the data update
    io.emit('data-update', {
      timestamp: new Date(),
      message: 'Health data has been updated'
    });
  } catch (error) {
    console.error('Error in scheduled data fetch:', error);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
