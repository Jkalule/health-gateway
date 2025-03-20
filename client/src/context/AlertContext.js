import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAlerts, subscribeToAlerts } from '../api/alerts';

const AlertContext = createContext();

export const useAlerts = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [alertPreferences, setAlertPreferences] = useState({
    regions: [],
    diseases: [],
    notificationMethod: 'app' // 'app', 'email', 'sms'
  });

  useEffect(() => {
    // Initial fetch of alerts
    const getAlerts = async () => {
      try {
        const alertData = await fetchAlerts();
        setAlerts(alertData);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    getAlerts();

    // Set up WebSocket connection for real-time alerts
    const alertSocket = subscribeToAlerts((newAlert) => {
      setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    });

    return () => {
      if (alertSocket) {
        alertSocket.disconnect();
      }
    };
  }, []);

  const updateAlertPreferences = (preferences) => {
    setAlertPreferences(prev => ({
      ...prev,
      ...preferences
    }));
    // Save to backend/localStorage could be added here
  };

  const value = {
    alerts,
    alertPreferences,
    updateAlertPreferences
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};
