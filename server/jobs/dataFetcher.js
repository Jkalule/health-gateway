const axios = require('axios');
const cheerio = require('cheerio');
const DiseaseData = require('../models/DiseaseData');
const Alert = require('../models/Alert');
const VaccinationSite = require('../models/VaccinationSite');
const TestingCenter = require('../models/TestingCenter');

// Fetch data from WHO
exports.fetchWHOData = async () => {
  try {
    // This would be a real API call to WHO data source
    // For this example, we simulate the API response
    console.log('Simulating WHO API call (in a real app, this would call the actual WHO API)');
    
    // Return simulated data
    return {
      diseases: {
        'covid-19': {
          totalCases: 172312,
          activeCases: 421,
          recoveries: 169384,
          deaths: 2507,
          regionData: {
            central: { cases: 81245, recoveries: 79843, deaths: 1402 },
            western: { cases: 36185, recoveries: 35615, deaths: 570 },
            eastern: { cases: 29293, recoveries: 28796, deaths: 497 },
            northern: { cases: 25589, recoveries: 25130, deaths: 459 }
          }
        },
        'ebola': {
          totalCases: 142,
          activeCases: 0,
          recoveries: 87,
          deaths: 55,
          regionData: {
            central: { cases: 32, recoveries: 19, deaths: 13 },
            western: { cases: 98, recoveries: 60, deaths: 38 },
            eastern: { cases: 8, recoveries: 5, deaths: 3 },
            northern: { cases: 4, recoveries: 3, deaths: 1 }
          }
        },
        'mpox': {
          totalCases: 57,
          activeCases: 12,
          recoveries: 44,
          deaths: 1,
          regionData: {
            central: { cases: 28, recoveries: 22, deaths: 0 },
            western: { cases: 11, recoveries: 8, deaths: 0 },
            eastern: { cases: 14, recoveries: 11, deaths: 1 },
            northern: { cases: 4, recoveries: 3, deaths: 0 }
          }
        }
      },
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('Error fetching WHO data:', error);
    throw error;
  }
};

// Fetch data from Uganda Ministry of Health
exports.fetchMOHData = async () => {
  try {
    // In a real implementation, this could be scraping their website or using an API if available
    console.log('Simulating Ministry of Health data fetch (in a real app, this would scrape the MOH website or use their API)');
    
    // Return simulated data
    return {
      diseases: {
        'covid-19': {
          totalCases: 172315,
          activeCases: 424,
          recoveries: 169384,
          deaths: 2507
        },
        'cholera': {
          totalCases: 187,
          activeCases: 42,
          recoveries: 139,
          deaths: 6
        }
      },
      vaccinationSites: [
        { 
          name: "Mulago Hospital", 
          region: "central", 
          district: "Kampala", 
          address: "Upper Mulago Hill Road, Kampala",
          location: { coordinates: [32.5812, 0.3465] },
          contactPhone: "+256-414-541884",
          operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM",
          availableVaccines: ["COVID-19", "Ebola"]
        },
        { 
          name: "Mbarara Regional Referral Hospital", 
          region: "western", 
          district: "Mbarara",
          address: "Mbarara-Kabale Road, Mbarara",
          location: { coordinates: [30.6582, -0.6136] },
          contactPhone: "+256-485-660833",
          operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM",
          availableVaccines: ["COVID-19"]
        },
        { 
          name: "Soroti Regional Referral Hospital", 
          region: "eastern", 
          district: "Soroti",
          address: "Soroti-Moroto Road, Soroti",
          location: { coordinates: [33.6110, 1.7150] },
          contactPhone: "+256-454-463482",
          operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM",
          availableVaccines: ["COVID-19", "Yellow Fever"]
        },
        { 
          name: "Gulu Regional Referral Hospital", 
          region: "northern", 
          district: "Gulu",
          address: "Gulu-Kampala Road, Gulu",
          location: { coordinates: [32.2881, 2.7746] },
          contactPhone: "+256-471-432570",
          operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM",
          availableVaccines: ["COVID-19", "Ebola"]
        }
      ],
      testingCenters: [
        { 
          name: "Uganda Virus Research Institute", 
          region: "central", 
          district: "Wakiso",
          address: "Plot 51-59 Nakiwogo Road, Entebbe",
          location: { coordinates: [32.4765, 0.0429] },
          contactPhone: "+256-414-320385",
          operatingHours: "24/7 for emergencies, 8:00 AM - 5:00 PM for routine testing",
          testTypes: ["COVID-19", "Ebola", "Mpox"]
        },
        { 
          name: "Fort Portal Regional Referral Hospital", 
          region: "western", 
          district: "Fort Portal",
          address: "Mugurusi Road, Fort Portal",
          location: { coordinates: [30.2744, 0.6683] },
          contactPhone: "+256-483-422050",
          operatingHours: "Mon-Fri: 8:00 AM - 5:00 PM",
          testTypes: ["COVID-19", "Malaria", "Tuberculosis"]
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching Ministry of Health data:', error);
    throw error;
  }
};

// Fetch data from UNICEF
exports.fetchUNICEFData = async () => {
  try {
    // In a real implementation, this would be an API call to UNICEF data
    console.log('Simulating UNICEF data fetch (in a real app, this would use the UNICEF API)');
    
    // Return simulated data
    return {
      childHealth: {
        vaccination: {
          coverageRate: 75.8,
          regions: {
            central: 82.3,
            western: 72.1,
            eastern: 68.5,
            northern: 64.7
          }
        }
      }
    };
  } catch (error) {
    console.error('Error fetching UNICEF data:', error);
    throw error;
  }
};

// Process and store fetched data
exports.processAndStoreData = async (whoData, mohData, unicefData) => {
  try {
    // Merge data from different sources with precedence
    // (WHO data is generally considered more reliable globally,
    // but local MOH data might be more up-to-date)
    
    const diseases = ['covid-19', 'ebola', 'mpox', 'cholera', 'malaria'];
    const now = new Date();
    
    for (const disease of diseases) {
      let diseaseData = null;
      let source = null;
      
      // Check sources in order of precedence
      if (mohData.diseases && mohData.diseases[disease]) {
        diseaseData = mohData.diseases[disease];
        source = {
          name: 'Uganda Ministry of Health',
          url: 'https://health.go.ug',
          fetchDate: now
        };
      } else if (whoData.diseases && whoData.diseases[disease]) {
        diseaseData = whoData.diseases[disease];
        source = {
          name: 'World Health Organization',
          url: 'https://www.who.int',
          fetchDate: now
        };
      }
      
      if (diseaseData) {
        // Get previous data to calculate daily changes
        const previousData = await DiseaseData.findOne({ disease })
          .sort({ date: -1 })
          .lean();
          
        // Calculate new daily statistics
        const newCases = previousData 
          ? diseaseData.totalCases - previousData.totalCases 
          : 0;
          
        const newRecoveries = previousData 
          ? diseaseData.recoveries - previousData.recoveries 
          : 0;
          
        const newDeaths = previousData 
          ? diseaseData.deaths - previousData.deaths 
          : 0;
        
        // Create new data entry
        const newDiseaseData = new DiseaseData({
          disease,
          date: now,
          totalCases: diseaseData.totalCases,
          activeCases: diseaseData.activeCases,
          recoveries: diseaseData.recoveries,
          deaths: diseaseData.deaths,
          newCases,
          newRecoveries,
          newDeaths,
          regionData: diseaseData.regionData || {
            central: { cases: 0, recoveries: 0, deaths: 0 },
            western: { cases: 0, recoveries: 0, deaths: 0 },
            eastern: { cases: 0, recoveries: 0, deaths: 0 },
            northern: { cases: 0, recoveries: 0, deaths: 0 }
          },
          source,
          metadata: {
            lastUpdated: now,
            notes: `Data compiled from multiple sources prioritizing ${source.name}`
          }
        });
        
        await newDiseaseData.save();
        
        // Check if we need to create an alert based on threshold values
        if (newCases > 50) {
          const alert = new Alert({
            title: `Significant increase in ${disease.toUpperCase()} cases`,
            message: `${newCases} new cases of ${disease} reported in Uganda today.`,
            disease,
            severity: newCases > 200 ? 'high' : newCases > 100 ? 'medium' : 'low',
            regions: ['all'],
            source,
            expiresAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) // 3 days
          });
          
          await alert.save();
        }
      }
    }
    
    // Store vaccination sites if available
    if (mohData.vaccinationSites && mohData.vaccinationSites.length > 0) {
      for (const site of mohData.vaccinationSites) {
        await VaccinationSite.findOneAndUpdate(
          { name: site.name, region: site.region },
          { $set: site },
          { upsert: true, new: true }
        );
      }
    }
    
    // Store testing centers if available
    if (mohData.testingCenters && mohData.testingCenters.length > 0) {
      for (const center of mohData.testingCenters) {
        await TestingCenter.findOneAndUpdate(
          { name: center.name, region: center.region },
          { $set: center },
          { upsert: true, new: true }
        );
      }
    }
    
    console.log('Data processing and storage completed');
  } catch (error) {
    console.error('Error processing and storing data:', error);
    throw error;
  }
};
