import api from './api';

export const healthDataService = {
  async getHealthData() {
    const response = await api.get('/health-data');
    return response.data;
  },

  async getHealthDataById(id) {
    const response = await api.get(`/health-data/${id}`);
    return response.data;
  },

  async getRegionalData() {
    const response = await api.get('/health-data/regional');
    return response.data;
  },

  async getVaccinationSites() {
    const response = await api.get('/vaccination-sites');
    return response.data;
  },

  async getTestingCenters() {
    const response = await api.get('/testing-centers');
    return response.data;
  },

  async getHealthGuidelines() {
    const response = await api.get('/health-guidelines');
    return response.data;
  }
};

export default healthDataService;
