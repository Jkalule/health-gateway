# Health Gateway

A real-time health data aggregation platform that provides interactive cards displaying information from trusted global health sources.

## Features

- Interactive health data cards from multiple global health organizations
- Real-time updates using WebSocket connections
- Responsive design for all device sizes
- Clean and modern user interface
- Direct links to source websites

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Jkalule/health-gateway.git
cd health-gateway
```

2. Install root dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

4. Install server dependencies:
```bash
cd server
npm install
cd ..
```

## Running the Application

The application consists of a React frontend client and a Node.js backend server. You can start both applications using the provided PowerShell script:

1. Using the start script (recommended):
```powershell
.\start.ps1
```

This will automatically:
- Start the server on port 5000
- Start the client on port 3000
- Open the application in your default browser
- Create separate windows for client and server processes
- Wait 2 seconds between server and client startup for proper initialization

To stop the applications:
- Press Ctrl+C in each window to stop the respective process

2. Manual startup (alternative method):

In one terminal (server):
```bash
cd server
npm start
```

In another terminal (client):
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Development

- Frontend runs on port 3000 with hot-reload enabled
- Backend runs on port 5000
- WebSocket connection is automatically established for real-time updates

## Architecture

- Frontend: React with Bootstrap for responsive design
- Backend: Node.js with Express
- Real-time updates: Socket.IO
- Data fetching: Axios with Cheerio for web scraping