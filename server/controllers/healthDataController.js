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
        activeDiseases: diseaseSummaries.filter(d => d.data).length
      }
    };
    
    // Transform to the desired format
    diseaseSummaries.forEach(item => {
      if (item.data) {
        responseData.diseases[item.disease] = {
          totalCases: item.data.totalCases,
          activeCases: item.data.activeCases,
          recoveries: item.data.recoveries,
          deaths: item.data.deaths,
          lastUpdated: item.data.date
        };
      }
    });
    
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching health data summary:', error);
    res.status(500).json({ error: 'Failed to fetch health data' });
  }
};

// Get data for a specific disease
exports.getDiseaseData = async (req, res) => {
  try {
    const { disease } = req.params;
    const { region = 'all', days = 30 } = req.query;
    
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
    
    // Format daily cases for charts
    const dailyCases = historicalData.map(entry => ({
      date: entry.date,
      newCases: entry.newCases,
      newRecoveries: entry.newRecoveries,
      newDeaths: entry.newDeaths
    }));
    
    // Filter by region if specified
    let regionData = latestData.regionData;
    if (region !== 'all') {
      regionData = { [region]: latestData.regionData[region] };
    }
    
    const response = {
      disease,
      totalCases: latestData.totalCases,
      activeCases: latestData.activeCases,
      recoveries: latestData.recoveries,
      deaths: latestData.deaths,
      dailyCases,
      regionData,
      source: latestData.source,
      lastUpdated: latestData.date
    };
    
    res.json(response);
  } catch (error) {
    console.error(`Error fetching data for ${req.params.disease}:`, error);
    res.status(500).json({ error: 'Failed to fetch disease data' });
  }
};
