import { useState, useEffect } from 'react';
import healthDataService from '../services/healthData.service';

export const useHealthData = (id = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = id 
          ? await healthDataService.getHealthDataById(id)
          : await healthDataService.getHealthData();
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch health data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = id 
        ? await healthDataService.getHealthDataById(id)
        : await healthDataService.getHealthData();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch health data');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};
