const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Import routes
const healthDataRoutes = require('./routes/healthDataRoutes');
const alertRoutes = require('./routes/alertRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const testingCenterRoutes = require('./routes/testingCenterRoutes');

// Import data fetchers
const { 
  fetchWHOData, 
  fetchMOHData, 
  fetchUNICEFData,
  processAndStoreData
} = require('./jobs/dataFetcher');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uganda-health-gateway')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/health-data', healthDataRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/vaccination-sites', vaccinationRoutes);
app.use('/api/testing-centers', testingCenterRoutes);

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
// Every hour fetch data from various sources
cron.schedule('0 * * * *', async () => {
  try {
    console.log('Fetching data from WHO...');
    const whoData = await fetchWHOData();
    
    console.log('Fetching data from Ministry of Health...');
    const mohData = await fetchMOHData();
    
    console.log('Fetching data from UNICEF...');
    const unicefData = await fetchUNICEFData();
    
    // Process and store the fetched data
    await processAndStoreData(whoData, mohData, unicefData);
    
    console.log('Data update completed successfully');
  } catch (error) {
    console.error('Error in scheduled data update:', error);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
