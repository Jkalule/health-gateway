import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const fetchHealthData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health-data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching health data:', error);
    throw error;
  }
};

export const fetchDiseaseData = async (disease, region = 'all') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/disease/${disease}`, {
      params: { region }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${disease}:`, error);
    throw error;
  }
};

export const fetchVaccinationSites = async (region = 'all') => {
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

export const fetchTestingCenters = async (region = 'all') => {
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
