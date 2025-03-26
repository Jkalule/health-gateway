import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const fetchHealthGuidelines = async (disease) => {
  try {
    const response = await axios.get(
      disease ? 
        `${API_BASE_URL}/health-guidelines/${disease}` :
        `${API_BASE_URL}/health-guidelines`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching health guidelines:', error);
    throw error;
  }
};
