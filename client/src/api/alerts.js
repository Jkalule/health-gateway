import axios from 'axios';
import io from 'socket.io-client';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const fetchAlerts = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alerts`, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};

export const subscribeToAlerts = (callback) => {
  const socket = io(SOCKET_URL);
  
  socket.on('connect', () => {
    console.log('Connected to alert socket');
  });
  
  socket.on('new-alert', (data) => {
    console.log('New alert received:', data);
    callback(data);
  });
  
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
  
  return socket;
};
