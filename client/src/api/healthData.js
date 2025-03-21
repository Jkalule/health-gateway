import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Fetch summary health data for all diseases
export const fetchHealthData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health-data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching health data:', error);
    throw error;
  }
};

// Fetch detailed data for a specific disease with filtering options
export const fetchDiseaseData = async (disease, { region = 'all', timeRange = '30days' } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health-data/disease/${disease}`, {
      params: { region, timeRange }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${disease}:`, error);
    throw error;
  }
};

// Fetch all vaccination sites with optional region filtering
export const fetchVaccinationSites = async ({ region = 'all' } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vaccination-sites`, {
      params: { region }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vaccination sites:', error);
    throw error;
  }
};

// Fetch all testing centers with optional region filtering
export const fetchTestingCenters = async ({ region = 'all' } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/testing-centers`, {
      params: { region }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching testing centers:', error);
    throw error;
  }
};

// Fetch health stats by region for map visualization
export const fetchRegionalStats = async ({ disease = 'all', timeRange = '30days' } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health-data/regions`, {
      params: { disease, timeRange }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching regional stats:', error);
    throw error;
  }
};

// Fetch comparative data for multiple diseases
export const fetchComparativeData = async ({ diseases = [], timeRange = '30days' } = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health-data/comparative`, {
      params: { 
        diseases: diseases.join(','),
        timeRange 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comparative data:', error);
    throw error;
  }
};
