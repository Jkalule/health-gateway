const DiseaseData = require('../models/DiseaseData');

// Get summary of all disease data
exports.getHealthDataSummary = async (req, res) => {
  try {
    // Get the most recent data for each disease
    const diseases = ['covid-19', 'ebola', 'mpox', 'malaria', 'cholera'];
    
    const diseaseSummaries = await Promise.all(
      diseases.map(async (disease) => {
        const latestData = await DiseaseData.findOne({ disease })
          .sort({ date: -1 })
          .lean();
          
        return latestData 
          ? { disease, data: latestData }
          : { disease, data: null };
      })
    );
    
    // Filter out diseases with no data and format response
    const responseData = {
      diseases: {},
      summary: {
        updatedAt: new Date(),
        activeDiseases: diseaseSummaries.filter(d => d.data).length,
        totalCases: 0,
        activeCases: 0,
        recoveries: 0,
        deaths: 0
      },
      regions: {
        central: { cases: 0, recoveries: 0, deaths: 0 },
        western: { cases: 0, recoveries: 0, deaths: 0 },
        eastern: { cases: 0, recoveries: 0, deaths: 0 },
        northern: { cases: 0, recoveries: 0, deaths: 0 }
      }
    };
    
    // Transform to the desired format and calculate totals
    diseaseSummaries.forEach(item => {
      if (item.data) {
        responseData.diseases[item.disease] = {
          totalCases: item.data.totalCases,
          activeCases: item.data.activeCases,
          recoveries: item.data.recoveries,
          deaths: item.data.deaths,
          newCases: item.data.newCases || 0,
          newRecoveries: item.data.newRecoveries || 0,
          newDeaths: item.data.newDeaths || 0,
          lastUpdated: item.data.date,
          regionData: item.data.regionData,
          source: item.data.source
        };
        
        // Update summary totals
        responseData.summary.totalCases += item.data.totalCases;
        responseData.summary.activeCases += item.data.activeCases;
        responseData.summary.recoveries += item.data.recoveries;
        responseData.summary.deaths += item.data.deaths;
        
        // Aggregate regional data
        Object.keys(responseData.regions).forEach(region => {
          if (item.data.regionData && item.data.regionData[region]) {
            responseData.regions[region].cases += item.data.regionData[region].cases;
            responseData.regions[region].recoveries += item.data.regionData[region].recoveries;
            responseData.regions[region].deaths += item.data.regionData[region].deaths;
          }
        });
      }
    });
    
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching health data summary:', error);
    res.status(500).json({ error: 'Failed to fetch health data', details: error.message });
  }
};

// Get data for a specific disease
exports.getDiseaseData = async (req, res) => {
  try {
    const { disease } = req.params;
    const { region = 'all', timeRange = '30days' } = req.query;
    
    // Calculate days based on timeRange
    let days = 30; // default
    switch(timeRange) {
      case '7days': days = 7; break;
      case '90days': days = 90; break;
      case '1year': days = 365; break;
      default: days = 30; break;
    }
    
    // Get the latest disease data
    const latestData = await DiseaseData.findOne({ disease })
      .sort({ date: -1 })
      .lean();
      
    if (!latestData) {
      return res.status(404).json({ error: `No data found for ${disease}` });
    }
    
    // Get historical data for charts
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const historyQuery = {
      disease,
      date: { $gte: startDate }
    };
    
    const historicalData = await DiseaseData.find(historyQuery)
      .sort({ date: 1 })
      .lean();
    
    // Format timeline data for charts
    const timeline = historicalData.map(entry => ({
      date: entry.date,
      cases: entry.newCases || 0,
      recoveries: entry.newRecoveries || 0,
      deaths: entry.newDeaths || 0,
      activeCases: entry.activeCases || 0
    }));
    
    // Filter by region if specified
    let regionData = latestData.regionData;
    if (region !== 'all' && regionData[region]) {
      regionData = { [region]: latestData.regionData[region] };
    }
    
    // Calculate trend percentages if we have enough data
    let trends = {
      totalCases: { value: 0, direction: 'stable' },
      activeCases: { value: 0, direction: 'stable' },
      recoveries: { value: 0, direction: 'stable' },
      deaths: { value: 0, direction: 'stable' }
    };
    
    if (historicalData.length > 1) {
      const current = latestData;
      const previous = historicalData[Math.max(0, historicalData.length - 8)]; // Compare with ~week ago
      
      const calculateTrend = (current, previous, field) => {
        if (previous[field] === 0) return { value: 0, direction: 'stable' };
        const percentChange = ((current[field] - previous[field]) / previous[field] * 100).toFixed(1);
        return {
          value: Math.abs(percentChange),
          direction: percentChange > 0 ? 'up' : percentChange < 0 ? 'down' : 'stable'
        };
      };
      
      trends = {
        totalCases: calculateTrend(current, previous, 'totalCases'),
        activeCases: calculateTrend(current, previous, 'activeCases'),
        recoveries: calculateTrend(current, previous, 'recoveries'),
        deaths: calculateTrend(current, previous, 'deaths')
      };
    }
    
    const response = {
      disease,
      totalCases: latestData.totalCases,
      activeCases: latestData.activeCases,
      recoveries: latestData.recoveries,
      deaths: latestData.deaths,
      newCases: latestData.newCases || 0,
      newRecoveries: latestData.newRecoveries || 0,
      newDeaths: latestData.newDeaths || 0,
      timeline,
      regionData,
      trends,
      source: latestData.source,
      lastUpdated: latestData.date
    };
    
    res.json(response);
  } catch (error) {
    console.error(`Error fetching data for ${req.params.disease}:`, error);
    res.status(500).json({ error: 'Failed to fetch disease data', details: error.message });
  }
};

// Get health data aggregated by region
exports.getRegionalStats = async (req, res) => {
  try {
    const { disease = 'all', timeRange = '30days' } = req.query;
    
    // Calculate days based on timeRange
    let days = 30; // default
    switch(timeRange) {
      case '7days': days = 7; break;
      case '90days': days = 90; break;
      case '1year': days = 365; break;
      default: days = 30; break;
    }
    
    // Determine what disease(s) to query
    const diseases = disease === 'all' 
      ? ['covid-19', 'ebola', 'mpox', 'malaria', 'cholera'] 
      : [disease];
    
    // Get the latest data for each disease
    const regionalData = {
      central: { cases: 0, recoveries: 0, deaths: 0, activeCases: 0 },
      western: { cases: 0, recoveries: 0, deaths: 0, activeCases: 0 },
      eastern: { cases: 0, recoveries: 0, deaths: 0, activeCases: 0 },
      northern: { cases: 0, recoveries: 0, deaths: 0, activeCases: 0 }
    };
    
    // Fetch the latest data for each disease
    const latestDiseaseData = await Promise.all(
      diseases.map(async (d) => {
        return await DiseaseData.findOne({ disease: d })
          .sort({ date: -1 })
          .lean();
      })
    );
    
    // Combine data from all diseases
    latestDiseaseData.forEach(diseaseData => {
      if (!diseaseData || !diseaseData.regionData) return;
      
      Object.keys(regionalData).forEach(region => {
        if (diseaseData.regionData[region]) {
          regionalData[region].cases += diseaseData.regionData[region].cases || 0;
          regionalData[region].recoveries += diseaseData.regionData[region].recoveries || 0;
          regionalData[region].deaths += diseaseData.regionData[region].deaths || 0;
          
          // Calculate active cases per region
          const activeCasesForRegion = 
            (diseaseData.regionData[region].cases || 0) - 
            (diseaseData.regionData[region].recoveries || 0) - 
            (diseaseData.regionData[region].deaths || 0);
          
          regionalData[region].activeCases += Math.max(0, activeCasesForRegion);
        }
      });
    });
    
    // Get historical data for trend analysis if needed
    if (days > 0) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      // For each region, calculate trends
      const regionTrends = {};
      
      for (const region of Object.keys(regionalData)) {
        // For simplicity, we'll just set a random trend indicator for now
        // In a real implementation, this would calculate actual trends from historical data
        regionTrends[region] = {
          cases: Math.random() > 0.5 ? 'increasing' : 'decreasing',
          value: (Math.random() * 15).toFixed(1)
        };
      }
      
      // Add trends to response
      Object.keys(regionalData).forEach(region => {
        regionalData[region].trend = regionTrends[region];
      });
    }
    
    res.json({
      data: regionalData,
      summary: {
        totalRegions: Object.keys(regionalData).length,
        totalCases: Object.values(regionalData).reduce((sum, region) => sum + region.cases, 0),
        totalDeaths: Object.values(regionalData).reduce((sum, region) => sum + region.deaths, 0),
        maxCasesRegion: Object.entries(regionalData).reduce((max, [name, data]) => 
          data.cases > (max.data?.cases || 0) ? { name, data } : max, {}).name
      },
      metadata: {
        diseases,
        timeRange,
        lastUpdated: new Date()
      }
    });
  } catch (error) {
    console.error('Error fetching regional stats:', error);
    res.status(500).json({ error: 'Failed to fetch regional statistics', details: error.message });
  }
};

// Get comparative data for multiple diseases
exports.getComparativeData = async (req, res) => {
  try {
    const { diseases = '', timeRange = '30days' } = req.query;
    
    // Parse disease list from comma-separated string or use defaults
    const diseaseList = diseases 
      ? diseases.split(',') 
      : ['covid-19', 'malaria', 'cholera'];
    
    // Calculate days based on timeRange
    let days = 30; // default
    switch(timeRange) {
      case '7days': days = 7; break;
      case '90days': days = 90; break;
      case '1year': days = 365; break;
      default: days = 30; break;
    }
    
    // Set date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // For each disease, get the most recent data
    const comparativeData = await Promise.all(
      diseaseList.map(async (disease) => {
        // Get the latest data 
        const latestData = await DiseaseData.findOne({ disease })
          .sort({ date: -1 })
          .lean();
          
        if (!latestData) return { disease, data: null };
        
        // Get historical data for timeline
        const historyQuery = {
          disease,
          date: { $gte: startDate }
        };
        
        const historicalData = await DiseaseData.find(historyQuery)
          .sort({ date: 1 })
          .lean();
        
        // Format timeline data
        const timeline = historicalData.map(entry => ({
          date: entry.date,
          cases: entry.newCases || 0,
          recoveries: entry.newRecoveries || 0,
          deaths: entry.newDeaths || 0
        }));
        
        return {
          disease,
          data: {
            totalCases: latestData.totalCases,
            activeCases: latestData.activeCases,
            recoveries: latestData.recoveries,
            deaths: latestData.deaths,
            timeline
          }
        };
      })
    );
    
    // Structure response for easy comparison
    const response = {
      diseases: {},
      timeline: [],
      metadata: {
        timeRange,
        days,
        lastUpdated: new Date()
      }
    };
    
    // Process each disease's data
    comparativeData.forEach(item => {
      if (item.data) {
        response.diseases[item.disease] = {
          totalCases: item.data.totalCases,
          activeCases: item.data.activeCases,
          recoveries: item.data.recoveries,
          deaths: item.data.deaths
        };
        
        // Add timeline data for comparison charts
        if (item.data.timeline && item.data.timeline.length > 0) {
          item.data.timeline.forEach(point => {
            // Find existing date in the timeline or create new entry
            let timePoint = response.timeline.find(t => 
              t.date.toDateString() === new Date(point.date).toDateString());
              
            if (!timePoint) {
              timePoint = { 
                date: point.date,
                diseases: {} 
              };
              response.timeline.push(timePoint);
            }
            
            // Add this disease's data for this date
            timePoint.diseases[item.disease] = {
              cases: point.cases,
              recoveries: point.recoveries,
              deaths: point.deaths
            };
          });
        }
      }
    });
    
    // Sort timeline by date
    response.timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching comparative data:', error);
    res.status(500).json({ error: 'Failed to fetch comparative data', details: error.message });
  }
};
