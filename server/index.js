const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const setupWebSocket = require('./src/websocket');
const dotenv = require('dotenv');
const cron = require('node-cron');
const Redis = require('redis');
const compression = require('compression');

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

// Initialize Redis client
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

// Middleware
app.use(compression()); 
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Redis caching middleware
const cacheMiddleware = async (req, res, next) => {
  try {
    const key = req.originalUrl;
    const cachedData = await redisClient.get(key);
    
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    
    res.sendResponse = res.json;
    res.json = async (body) => {
      await redisClient.setEx(key, 3600, JSON.stringify(body)); 
      res.sendResponse(body);
    };
    
    next();
  } catch (error) {
    console.error('Redis cache error:', error);
    next();
  }
};

// Apply caching to read-only routes
app.use('/api/health-data', cacheMiddleware, healthDataRoutes);
app.use('/api/health-guidelines', cacheMiddleware, healthGuidelineRoutes);
app.use('/api/testing-centers', cacheMiddleware, testingCenterRoutes);
app.use('/api/vaccination-sites', cacheMiddleware, vaccinationRoutes);
app.use('/api/alerts', alertRoutes); 

// Initialize WebSocket
const io = setupWebSocket(server);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uganda-health-gateway')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

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
