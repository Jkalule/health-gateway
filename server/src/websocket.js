const { Server } = require('socket.io');
const axios = require('axios');
const cheerio = require('cheerio');

function setupWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Set up periodic health data checks
  setInterval(async () => {
    try {
      // Example: Check WHO updates
      const whoUpdate = await checkWHOUpdates();
      if (whoUpdate) {
        io.emit('healthDataUpdate', {
          id: 'who',
          ...whoUpdate
        });
      }

      // Add more health source checks here...

    } catch (error) {
      console.error('Error checking health updates:', error);
    }
  }, 5 * 60 * 1000); // Check every 5 minutes

  return io;
}

async function checkWHOUpdates() {
  try {
    const response = await axios.get('https://www.who.int/emergencies');
    const $ = cheerio.load(response.data);
    
    // Example: Extract latest emergency update
    const latestUpdate = $('.sf-content-block').first().text().trim();
    
    if (latestUpdate) {
      return {
        description: latestUpdate.substring(0, 200) + '...' // Truncate to fit card
      };
    }
  } catch (error) {
    console.error('Error fetching WHO updates:', error);
  }
  return null;
}

module.exports = setupWebSocket;
