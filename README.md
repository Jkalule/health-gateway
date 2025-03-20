# Uganda Health Gateway

Real-time health data and pandemic outbreak tracking across Uganda.

## Project Structure

The project is structured into two main directories:
- **client/**: Contains the React frontend application
- **server/**: Contains the Node.js backend application

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/uganda-health
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   DATA_FETCH_INTERVAL=3600000
   JWT_SECRET=your_jwt_secret_here_change_in_production
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the client directory with the following variables:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   REACT_APP_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
   ```

4. Start the client:
   ```
   npm start
   ```

## Deployment

### Backend Deployment

1. Set up a MongoDB database (either locally or using MongoDB Atlas)
2. Update the `.env` file with production settings:
   ```
   PORT=5000
   MONGODB_URI=your_production_mongodb_uri
   NODE_ENV=production
   CLIENT_URL=your_production_client_url
   DATA_FETCH_INTERVAL=3600000
   JWT_SECRET=your_secure_jwt_secret
   ```
3. Start the server using a process manager like PM2:
   ```
   npm install -g pm2
   pm2 start index.js --name uganda-health-server
   ```

### Frontend Deployment

1. Build the React application:
   ```
   cd client
   npm run build
   ```
2. Serve the static files using a web server like Nginx or deploy to a service like Netlify, Vercel, or GitHub Pages.

## Features

- Real-time disease tracking
- Interactive maps showing vaccination sites and testing centers
- Regional data visualization
- Health alerts and notifications
- Mobile-responsive design

## Data Sources

- World Health Organization (WHO)
- Uganda Ministry of Health
- UNICEF

## License

MIT
