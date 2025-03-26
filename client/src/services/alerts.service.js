import api from './api';

export const alertsService = {
  async getAlerts() {
    const response = await api.get('/alerts');
    return response.data;
  },

  async getAlertById(id) {
    const response = await api.get(`/alerts/${id}`);
    return response.data;
  },

  async subscribeToAlerts(email) {
    const response = await api.post('/alerts/subscribe', { email });
    return response.data;
  },

  async unsubscribeFromAlerts(email) {
    const response = await api.post('/alerts/unsubscribe', { email });
    return response.data;
  }
};

export default alertsService;
