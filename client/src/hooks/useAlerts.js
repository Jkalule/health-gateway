import { useState, useEffect } from 'react';
import alertsService from '../services/alerts.service';

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await alertsService.getAlerts();
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  const subscribeToAlerts = async (email) => {
    try {
      await alertsService.subscribeToAlerts(email);
      await fetchAlerts(); // Refresh alerts after subscribing
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const unsubscribeFromAlerts = async (email) => {
    try {
      await alertsService.unsubscribeFromAlerts(email);
      await fetchAlerts(); // Refresh alerts after unsubscribing
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    alerts,
    loading,
    error,
    refetch: fetchAlerts,
    subscribeToAlerts,
    unsubscribeFromAlerts
  };
};
