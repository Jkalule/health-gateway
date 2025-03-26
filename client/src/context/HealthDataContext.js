import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { 
  fetchHealthData, 
  fetchDiseaseData, 
  fetchRegionalStats,
  fetchComparativeData
} from '../api/healthData';
import { fetchHealthGuidelines } from '../api/healthGuidelines';
import { mockHealthData, mockVaccinationSites, mockTestingCenters } from '../utils/mockData';

const HealthDataContext = createContext();

export const useHealthData = () => useContext(HealthDataContext);

export const HealthDataProvider = ({ children }) => {
  const [healthData, setHealthData] = useState({});
  const [vaccinationSites, setVaccinationSites] = useState([]);
  const [testingCenters, setTestingCenters] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [regionalStats, setRegionalStats] = useState(null);
  const [comparativeData, setComparativeData] = useState(null);
  const [guidelines, setGuidelines] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // For development or if API fails: Use mock data
        if (process.env.NODE_ENV === 'development') {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
          setHealthData(mockHealthData);
          setVaccinationSites(mockVaccinationSites);
          setTestingCenters(mockTestingCenters);
          setLastUpdated(new Date().toISOString());
          setLoading(false);
          return;
        }
        
        // For production: Try fetching from API
        try {
          const data = await fetchHealthData();
          
          // Process and set the data
          const processedData = {};
          
          // Transform the API response to match our frontend data structure
          if (data.diseases) {
            Object.entries(data.diseases).forEach(([diseaseName, diseaseData]) => {
              // For each region, create an entry
              const regions = ['central', 'eastern', 'northern', 'western'];
              
              regions.forEach(region => {
                const regionData = diseaseData.regionData?.[region];
                
                if (regionData) {
                  if (!processedData[diseaseName]) {
                    processedData[diseaseName] = [];
                  }
                  processedData[diseaseName].push({
                    id: `${diseaseName}-${region}`,
                    disease: diseaseName,
                    region: region,
                    cases: regionData.cases || 0,
                    activeCases: regionData.cases - (regionData.recoveries || 0) - (regionData.deaths || 0),
                    recovered: regionData.recoveries || 0,
                    deaths: regionData.deaths || 0,
                    vaccinationRate: 0, // Not provided by API at this level
                    lastUpdated: diseaseData.lastUpdated
                  });
                }
              });
            });
          }
          
          setHealthData(processedData);
          setLastUpdated(data.summary?.updatedAt || new Date().toISOString());
        } catch (apiError) {
          console.warn('API fetch failed, falling back to mock data:', apiError);
          // Fall back to mock data if API call fails
          setHealthData(mockHealthData);
          setVaccinationSites(mockVaccinationSites);
          setTestingCenters(mockTestingCenters);
          setLastUpdated(new Date().toISOString());
        }
        
      } catch (err) {
        console.error('Error loading health data:', err);
        setError(err.message || 'Failed to load health data');
        // Fall back to mock data even in error case
        setHealthData(mockHealthData);
        setVaccinationSites(mockVaccinationSites);
        setTestingCenters(mockTestingCenters);
        setLastUpdated(new Date().toISOString());
      } finally {
        setLoading(false);
      }
    };
    
    loadData();

    // Listen for real-time updates
    socket.on('data-update', async () => {
      console.log('Received data update notification');
      await loadData();
    });

    socket.on('new-alert', (alert) => {
      // Update data if alert indicates significant changes
      if (alert.type === 'outbreak' || alert.type === 'update') {
        loadData();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedDisease]);

  // Load disease-specific data when selection changes
  const loadDiseaseData = async (disease, region, timeRange) => {
    if (disease === 'all') return;
    
    try {
      setLoading(true);
      
      // Use mock data in development or if API fails
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filter mock data for this disease
        const mockDiseaseData = mockHealthData.filter(item => item.disease === disease);
        if (mockDiseaseData.length > 0) {
          return {
            disease,
            data: mockDiseaseData,
            summary: {
              totalCases: mockDiseaseData.reduce((sum, item) => sum + item.cases, 0),
              activeCases: mockDiseaseData.reduce((sum, item) => sum + item.activeCases, 0),
              recovered: mockDiseaseData.reduce((sum, item) => sum + item.recovered, 0),
              deaths: mockDiseaseData.reduce((sum, item) => sum + item.deaths, 0)
            }
          };
        }
        return null;
      }
      
      try {
        const data = await fetchDiseaseData(disease, { region, timeRange });
        return data;
      } catch (apiError) {
        console.warn(`API fetch failed for ${disease}, falling back to mock data:`, apiError);
        // Fall back to mock data
        const mockDiseaseData = mockHealthData.filter(item => item.disease === disease);
        if (mockDiseaseData.length > 0) {
          return {
            disease,
            data: mockDiseaseData,
            summary: {
              totalCases: mockDiseaseData.reduce((sum, item) => sum + item.cases, 0),
              activeCases: mockDiseaseData.reduce((sum, item) => sum + item.activeCases, 0),
              recovered: mockDiseaseData.reduce((sum, item) => sum + item.recovered, 0),
              deaths: mockDiseaseData.reduce((sum, item) => sum + item.deaths, 0)
            }
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error loading data for ${disease}:`, error);
      setError(error.message);
      
      // Fall back to mock data on error
      const mockDiseaseData = mockHealthData.filter(item => item.disease === disease);
      if (mockDiseaseData.length > 0) {
        return {
          disease,
          data: mockDiseaseData,
          summary: {
            totalCases: mockDiseaseData.reduce((sum, item) => sum + item.cases, 0),
            activeCases: mockDiseaseData.reduce((sum, item) => sum + item.activeCases, 0),
            recovered: mockDiseaseData.reduce((sum, item) => sum + item.recovered, 0),
            deaths: mockDiseaseData.reduce((sum, item) => sum + item.deaths, 0)
          }
        };
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Load regional statistics
  const loadRegionalStats = async (disease = 'all', timeRange = '30days') => {
    try {
      setLoading(true);
      
      // Use mock data in development or if API fails
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock regional stats from mockHealthData
        const regions = ['central', 'eastern', 'northern', 'western'];
        const mockRegionalStats = {};
        
        regions.forEach(region => {
          let filteredData = mockHealthData.filter(item => item.region === region);
          if (disease !== 'all') {
            filteredData = filteredData.filter(item => item.disease === disease);
          }
          
          mockRegionalStats[region] = {
            cases: filteredData.reduce((sum, item) => sum + item.cases, 0),
            activeCases: filteredData.reduce((sum, item) => sum + item.activeCases, 0),
            recovered: filteredData.reduce((sum, item) => sum + item.recovered, 0),
            deaths: filteredData.reduce((sum, item) => sum + item.deaths, 0)
          };
        });
        
        setRegionalStats(mockRegionalStats);
        return mockRegionalStats;
      }
      
      try {
        const data = await fetchRegionalStats({ disease, timeRange });
        setRegionalStats(data);
        return data;
      } catch (apiError) {
        console.warn('API fetch failed for regional stats, falling back to mock data:', apiError);
        
        // Generate mock regional stats from mockHealthData
        const regions = ['central', 'eastern', 'northern', 'western'];
        const mockRegionalStats = {};
        
        regions.forEach(region => {
          let filteredData = mockHealthData.filter(item => item.region === region);
          if (disease !== 'all') {
            filteredData = filteredData.filter(item => item.disease === disease);
          }
          
          mockRegionalStats[region] = {
            cases: filteredData.reduce((sum, item) => sum + item.cases, 0),
            activeCases: filteredData.reduce((sum, item) => sum + item.activeCases, 0),
            recovered: filteredData.reduce((sum, item) => sum + item.recovered, 0),
            deaths: filteredData.reduce((sum, item) => sum + item.deaths, 0)
          };
        });
        
        setRegionalStats(mockRegionalStats);
        return mockRegionalStats;
      }
    } catch (error) {
      console.error('Error loading regional statistics:', error);
      setError(error.message);
      
      // Fall back to mock data on error
      const regions = ['central', 'eastern', 'northern', 'western'];
      const mockRegionalStats = {};
      
      regions.forEach(region => {
        let filteredData = mockHealthData.filter(item => item.region === region);
        if (disease !== 'all') {
          filteredData = filteredData.filter(item => item.disease === disease);
        }
        
        mockRegionalStats[region] = {
          cases: filteredData.reduce((sum, item) => sum + item.cases, 0),
          activeCases: filteredData.reduce((sum, item) => sum + item.activeCases, 0),
          recovered: filteredData.reduce((sum, item) => sum + item.recovered, 0),
          deaths: filteredData.reduce((sum, item) => sum + item.deaths, 0)
        };
      });
      
      setRegionalStats(mockRegionalStats);
      return mockRegionalStats;
    } finally {
      setLoading(false);
    }
  };

  // Load comparative data for multiple diseases
  const loadComparativeData = async (diseases = [], timeRange = '30days') => {
    try {
      setLoading(true);
      
      // Use mock data in development or if API fails
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock comparative data from mockHealthData
        const mockComparativeData = [];
        const diseasesToUse = diseases.length > 0 ? diseases : ['covid19', 'malaria', 'tuberculosis', 'ebola'];
        
        diseasesToUse.forEach(disease => {
          const diseaseData = mockHealthData.filter(item => item.disease === disease);
          if (diseaseData.length > 0) {
            mockComparativeData.push({
              disease: disease,
              totalCases: diseaseData.reduce((sum, item) => sum + item.cases, 0),
              activeCases: diseaseData.reduce((sum, item) => sum + item.activeCases, 0),
              recovered: diseaseData.reduce((sum, item) => sum + item.recovered, 0),
              deaths: diseaseData.reduce((sum, item) => sum + item.deaths, 0)
            });
          }
        });
        
        setComparativeData(mockComparativeData);
        return mockComparativeData;
      }
      
      try {
        const data = await fetchComparativeData({ diseases, timeRange });
        setComparativeData(data);
        return data;
      } catch (apiError) {
        console.warn('API fetch failed for comparative data, falling back to mock data:', apiError);
        
        // Generate mock comparative data from mockHealthData
        const mockComparativeData = [];
        const diseasesToUse = diseases.length > 0 ? diseases : ['covid19', 'malaria', 'tuberculosis', 'ebola'];
        
        diseasesToUse.forEach(disease => {
          const diseaseData = mockHealthData.filter(item => item.disease === disease);
          if (diseaseData.length > 0) {
            mockComparativeData.push({
              disease: disease,
              totalCases: diseaseData.reduce((sum, item) => sum + item.cases, 0),
              activeCases: diseaseData.reduce((sum, item) => sum + item.activeCases, 0),
              recovered: diseaseData.reduce((sum, item) => sum + item.recovered, 0),
              deaths: diseaseData.reduce((sum, item) => sum + item.deaths, 0)
            });
          }
        });
        
        setComparativeData(mockComparativeData);
        return mockComparativeData;
      }
    } catch (error) {
      console.error('Error loading comparative data:', error);
      setError(error.message);
      
      // Fall back to mock data on error
      const mockComparativeData = [];
      const diseasesToUse = diseases.length > 0 ? diseases : ['covid19', 'malaria', 'tuberculosis', 'ebola'];
      
      diseasesToUse.forEach(disease => {
        const diseaseData = mockHealthData.filter(item => item.disease === disease);
        if (diseaseData.length > 0) {
          mockComparativeData.push({
            disease: disease,
            totalCases: diseaseData.reduce((sum, item) => sum + item.cases, 0),
            activeCases: diseaseData.reduce((sum, item) => sum + item.activeCases, 0),
            recovered: diseaseData.reduce((sum, item) => sum + item.recovered, 0),
            deaths: diseaseData.reduce((sum, item) => sum + item.deaths, 0)
          });
        }
      });
      
      setComparativeData(mockComparativeData);
      return mockComparativeData;
    } finally {
      setLoading(false);
    }
  };

  // Filter health data by region, disease, or date range
  const filterHealthData = useCallback(({ 
    region = selectedRegion, 
    disease = selectedDisease, 
    timeRange = selectedTimeRange 
  } = {}) => {
    return Object.values(healthData).flat().filter(item => {
      if (region !== 'all' && item.region !== region) return false;
      if (disease !== 'all' && item.disease !== disease) return false;
      return true;
    });
  }, [healthData, selectedRegion, selectedDisease, selectedTimeRange]);

  const loadGuidelines = async (disease) => {
    try {
      setLoading(true);
      
      // Use mock data in development or if API fails
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Return mock guidelines
        return {
          disease,
          guidelines: 'Mock guidelines for ' + disease
        };
      }
      
      try {
        const data = await fetchHealthGuidelines(disease);
        return data;
      } catch (apiError) {
        console.warn(`API fetch failed for ${disease} guidelines, falling back to mock data:`, apiError);
        
        // Return mock guidelines
        return {
          disease,
          guidelines: 'Mock guidelines for ' + disease
        };
      }
    } catch (error) {
      console.error(`Error loading guidelines for ${disease}:`, error);
      setError(error.message);
      
      // Return mock guidelines on error
      return {
        disease,
        guidelines: 'Mock guidelines for ' + disease
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    healthData,
    vaccinationSites,
    testingCenters,
    selectedDisease,
    setSelectedDisease,
    selectedRegion,
    setSelectedRegion,
    selectedTimeRange,
    setSelectedTimeRange,
    regionalStats,
    comparativeData,
    guidelines,
    loading,
    error,
    lastUpdated,
    filterHealthData,
    loadDiseaseData,
    loadRegionalStats,
    loadComparativeData,
    loadGuidelines
  };

  return (
    <HealthDataContext.Provider value={value}>
      {children}
    </HealthDataContext.Provider>
  );
};
