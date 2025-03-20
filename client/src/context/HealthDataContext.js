import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchHealthData, fetchDiseaseData } from '../api/healthData';

const HealthDataContext = createContext();

export const useHealthData = () => useContext(HealthDataContext);

export const HealthDataProvider = ({ children }) => {
  const [healthData, setHealthData] = useState({
    diseases: {},
    regions: {
      central: {},
      western: {},
      eastern: {},
      northern: {}
    },
    vaccinationSites: [],
    testingCenters: [],
    loading: true,
    error: null
  });

  const [selectedDisease, setSelectedDisease] = useState('covid-19');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const data = await fetchHealthData();
        setHealthData(prevData => ({
          ...prevData,
          ...data,
          loading: false
        }));
      } catch (error) {
        console.error('Error fetching initial health data:', error);
        setHealthData(prevData => ({
          ...prevData,
          loading: false,
          error: 'Failed to load health data'
        }));
      }
    };

    loadInitialData();
  }, []);

  // Fetch disease-specific data when selected disease changes
  useEffect(() => {
    const loadDiseaseData = async () => {
      if (!selectedDisease) return;
      
      setHealthData(prevData => ({
        ...prevData,
        loading: true
      }));

      try {
        const diseaseData = await fetchDiseaseData(selectedDisease, selectedRegion);
        setHealthData(prevData => ({
          ...prevData,
          diseases: {
            ...prevData.diseases,
            [selectedDisease]: diseaseData
          },
          loading: false
        }));
      } catch (error) {
        console.error(`Error fetching data for ${selectedDisease}:`, error);
        setHealthData(prevData => ({
          ...prevData,
          loading: false,
          error: `Failed to load data for ${selectedDisease}`
        }));
      }
    };

    loadDiseaseData();
  }, [selectedDisease, selectedRegion]);

  const value = {
    healthData,
    selectedDisease,
    setSelectedDisease,
    selectedRegion,
    setSelectedRegion
  };

  return (
    <HealthDataContext.Provider value={value}>
      {children}
    </HealthDataContext.Provider>
  );
};
