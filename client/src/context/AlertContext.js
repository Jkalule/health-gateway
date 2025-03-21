import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAlerts, subscribeToAlerts } from '../api/alerts';
import { mockAlerts } from '../utils/mockData';

const AlertContext = createContext();

export const useAlerts = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertPreferences, setAlertPreferences] = useState({
    regions: [],
    diseases: [],
    notificationMethod: 'app' // 'app', 'email', 'sms'
  });

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setLoading(true);
        
        // For development: Use mock data
        if (process.env.NODE_ENV === 'development') {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 600));
          
          setAlerts(mockAlerts);
          setLoading(false);
          return;
        }
        
        // For production: Fetch from API
        const alertsData = await fetchAlerts();
        setAlerts(alertsData);
        
        // Set up WebSocket connection for real-time alerts
        const alertSocket = subscribeToAlerts((newAlert) => {
          setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
        });
        
        return () => {
          if (alertSocket) {
            alertSocket.disconnect();
          }
        };
      } catch (err) {
        console.error('Error loading alerts:', err);
        setError(err.message || 'Failed to load alerts');
        // Fall back to mock data on error
        setAlerts(mockAlerts);
      } finally {
        setLoading(false);
      }
    };
    
    loadAlerts();
  }, []);

  const updateAlertPreferences = (preferences) => {
    setAlertPreferences(prev => ({
      ...prev,
      ...preferences
    }));
    // In a real app, we would save this to backend or localStorage
  };

  // Add an alert (useful for testing)
  const addAlert = (alert) => {
    const newAlert = {
      id: `alert-${Date.now()}`,
      date: new Date().toISOString(),
      ...alert
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  // Dismiss an alert
  const dismissAlert = (alertId) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };

  // Filter alerts by region, disease, severity, or date range
  const filterAlerts = ({
    region = null,
    disease = null,
    severity = null,
    startDate = null,
    endDate = null
  }) => {
    return alerts.filter(alert => {
      if (region && alert.region !== region) return false;
      if (disease && alert.disease !== disease) return false;
      if (severity && alert.severity !== severity) return false;
      if (startDate && new Date(alert.date) < new Date(startDate)) return false;
      if (endDate && new Date(alert.date) > new Date(endDate)) return false;
      return true;
    });
  };

  const value = {
    alerts,
    loading,
    error,
    alertPreferences,
    updateAlertPreferences,
    addAlert,
    dismissAlert,
    filterAlerts
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};
