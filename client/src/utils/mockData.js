// Mock data for frontend development

export const mockHealthData = [
  // COVID-19 data by region
  {
    id: 'covid19-central',
    disease: 'covid19',
    region: 'central',
    cases: 45623,
    activeCases: 1203,
    recovered: 43789,
    deaths: 631,
    vaccinationRate: 42.3,
    timeline: generateTimeline('covid19', 'central'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'covid19-eastern',
    disease: 'covid19',
    region: 'eastern',
    cases: 28954,
    activeCases: 820,
    recovered: 27690,
    deaths: 444,
    vaccinationRate: 37.8,
    timeline: generateTimeline('covid19', 'eastern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'covid19-northern',
    disease: 'covid19',
    region: 'northern',
    cases: 18762,
    activeCases: 435,
    recovered: 18045,
    deaths: 282,
    vaccinationRate: 32.5,
    timeline: generateTimeline('covid19', 'northern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'covid19-western',
    disease: 'covid19',
    region: 'western',
    cases: 25437,
    activeCases: 610,
    recovered: 24394,
    deaths: 433,
    vaccinationRate: 39.1,
    timeline: generateTimeline('covid19', 'western'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  
  // Malaria data by region
  {
    id: 'malaria-central',
    disease: 'malaria',
    region: 'central',
    cases: 89421,
    activeCases: 5783,
    recovered: 83125,
    deaths: 513,
    vaccinationRate: 0, // Not applicable for malaria
    timeline: generateTimeline('malaria', 'central'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'malaria-eastern',
    disease: 'malaria',
    region: 'eastern',
    cases: 124875,
    activeCases: 8392,
    recovered: 115672,
    deaths: 811,
    vaccinationRate: 0,
    timeline: generateTimeline('malaria', 'eastern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'malaria-northern',
    disease: 'malaria',
    region: 'northern',
    cases: 156289,
    activeCases: 10453,
    recovered: 144721,
    deaths: 1115,
    vaccinationRate: 0,
    timeline: generateTimeline('malaria', 'northern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'malaria-western',
    disease: 'malaria',
    region: 'western',
    cases: 103562,
    activeCases: 6782,
    recovered: 96021,
    deaths: 759,
    vaccinationRate: 0,
    timeline: generateTimeline('malaria', 'western'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  
  // Tuberculosis data by region
  {
    id: 'tuberculosis-central',
    disease: 'tuberculosis',
    region: 'central',
    cases: 12437,
    activeCases: 1872,
    recovered: 10232,
    deaths: 333,
    vaccinationRate: 68.5, // BCG vaccination rate
    timeline: generateTimeline('tuberculosis', 'central'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'tuberculosis-eastern',
    disease: 'tuberculosis',
    region: 'eastern',
    cases: 10893,
    activeCases: 1653,
    recovered: 8984,
    deaths: 256,
    vaccinationRate: 64.2,
    timeline: generateTimeline('tuberculosis', 'eastern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'tuberculosis-northern',
    disease: 'tuberculosis',
    region: 'northern',
    cases: 9762,
    activeCases: 1489,
    recovered: 8042,
    deaths: 231,
    vaccinationRate: 59.8,
    timeline: generateTimeline('tuberculosis', 'northern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'tuberculosis-western',
    disease: 'tuberculosis',
    region: 'western',
    cases: 11328,
    activeCases: 1702,
    recovered: 9356,
    deaths: 270,
    vaccinationRate: 62.7,
    timeline: generateTimeline('tuberculosis', 'western'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  
  // Ebola data by region
  {
    id: 'ebola-central',
    disease: 'ebola',
    region: 'central',
    cases: 28,
    activeCases: 5,
    recovered: 18,
    deaths: 5,
    vaccinationRate: 12.3,
    timeline: generateTimeline('ebola', 'central'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'ebola-eastern',
    disease: 'ebola',
    region: 'eastern',
    cases: 42,
    activeCases: 8,
    recovered: 27,
    deaths: 7,
    vaccinationRate: 10.8,
    timeline: generateTimeline('ebola', 'eastern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'ebola-northern',
    disease: 'ebola',
    region: 'northern',
    cases: 19,
    activeCases: 3,
    recovered: 12,
    deaths: 4,
    vaccinationRate: 8.5,
    timeline: generateTimeline('ebola', 'northern'),
    lastUpdated: '2023-12-15T08:30:00Z'
  },
  {
    id: 'ebola-western',
    disease: 'ebola',
    region: 'western',
    cases: 63,
    activeCases: 12,
    recovered: 41,
    deaths: 10,
    vaccinationRate: 15.2,
    timeline: generateTimeline('ebola', 'western'),
    lastUpdated: '2023-12-15T08:30:00Z'
  }
];

export const mockAlerts = [
  {
    id: 'alert-1',
    title: 'Ebola Outbreak in Western Uganda',
    message: 'Health officials report new Ebola cases in Kasese district. Residents advised to follow safety protocols and report any symptoms immediately.',
    severity: 'critical',
    date: '2023-12-14T10:15:00Z',
    region: 'western',
    disease: 'ebola'
  },
  {
    id: 'alert-2',
    title: 'COVID-19 Cases Rising in Kampala',
    message: 'Over 200 new COVID-19 cases reported in Kampala in the last 24 hours. Wear masks in public spaces and maintain social distancing.',
    severity: 'warning',
    date: '2023-12-13T14:30:00Z',
    region: 'central',
    disease: 'covid19'
  },
  {
    id: 'alert-3',
    title: 'Malaria Prevention Campaign',
    message: 'Ministry of Health launching mosquito net distribution in Northern Uganda starting next week. Register at your local health center.',
    severity: 'info',
    date: '2023-12-10T09:45:00Z',
    region: 'northern',
    disease: 'malaria'
  },
  {
    id: 'alert-4',
    title: 'Tuberculosis Screening Drive',
    message: 'Free TB screening available at all district hospitals through December. Early detection saves lives.',
    severity: 'info',
    date: '2023-12-08T11:20:00Z',
    region: 'eastern',
    disease: 'tuberculosis'
  },
  {
    id: 'alert-5',
    title: 'COVID-19 Vaccination Booster Shots Available',
    message: 'Booster doses now available for eligible individuals who received their second dose over 6 months ago.',
    severity: 'warning',
    date: '2023-12-05T16:10:00Z',
    region: 'central',
    disease: 'covid19'
  }
];

export const mockVaccinationSites = [
  {
    id: 'vac-1',
    name: 'Mulago National Referral Hospital',
    type: 'Hospital',
    address: 'Upper Mulago Hill Road, Kampala',
    district: 'Kampala',
    region: 'central',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles', 'Tetanus', 'Yellow Fever', 'HPV'],
    contactPhone: '+256 414 541 884',
    coordinates: [0.3476, 32.5825]
  },
  {
    id: 'vac-2',
    name: 'Butabika Hospital',
    type: 'Hospital',
    address: 'Kireka Road, Kampala',
    district: 'Kampala',
    region: 'central',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles', 'Tetanus'],
    contactPhone: '+256 414 504 376',
    coordinates: [0.3205, 32.6489]
  },
  {
    id: 'vac-3',
    name: 'Mbale Regional Referral Hospital',
    type: 'Hospital',
    address: 'Pallisa Road, Mbale',
    district: 'Mbale',
    region: 'eastern',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles', 'Tetanus', 'Yellow Fever'],
    contactPhone: '+256 454 433 825',
    coordinates: [1.0819, 34.1753]
  },
  {
    id: 'vac-4',
    name: 'Soroti Regional Referral Hospital',
    type: 'Hospital',
    address: 'Soroti-Moroto Road, Soroti',
    district: 'Soroti',
    region: 'eastern',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles'],
    contactPhone: '+256 454 461 518',
    coordinates: [1.7086, 33.6111]
  },
  {
    id: 'vac-5',
    name: 'Gulu Regional Referral Hospital',
    type: 'Hospital',
    address: 'Gulu-Kampala Road, Gulu',
    district: 'Gulu',
    region: 'northern',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Tetanus', 'Yellow Fever'],
    contactPhone: '+256 471 432 554',
    coordinates: [2.7747, 32.2999]
  },
  {
    id: 'vac-6',
    name: 'Lira Regional Referral Hospital',
    type: 'Hospital',
    address: 'Soroti Road, Lira',
    district: 'Lira',
    region: 'northern',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM, Sat: 9:00 AM - 12:00 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles', 'HPV'],
    contactPhone: '+256 473 420 009',
    coordinates: [2.2499, 32.8960]
  },
  {
    id: 'vac-7',
    name: 'Fort Portal Regional Referral Hospital',
    type: 'Hospital',
    address: 'Kasese Road, Fort Portal',
    district: 'Kabarole',
    region: 'western',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles', 'Tetanus', 'Yellow Fever'],
    contactPhone: '+256 483 422 076',
    coordinates: [0.6713, 30.2745]
  },
  {
    id: 'vac-8',
    name: 'Hoima Regional Referral Hospital',
    type: 'Hospital',
    address: 'Old Toro Road, Hoima',
    district: 'Hoima',
    region: 'western',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles'],
    contactPhone: '+256 465 440 891',
    coordinates: [1.4329, 31.3524]
  },
  {
    id: 'vac-9',
    name: 'Mengo Hospital',
    type: 'Hospital',
    address: 'Albert Cook Road, Kampala',
    district: 'Kampala',
    region: 'central',
    operatingHours: 'Mon-Sat: 8:00 AM - 5:00 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles', 'Tetanus', 'HPV'],
    contactPhone: '+256 414 270 222',
    coordinates: [0.3116, 32.5633]
  },
  {
    id: 'vac-10',
    name: 'Mbarara Regional Referral Hospital',
    type: 'Hospital',
    address: 'Kabale Road, Mbarara',
    district: 'Mbarara',
    region: 'western',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM',
    availableVaccines: ['COVID-19', 'Polio', 'Measles', 'Tetanus', 'Yellow Fever', 'HPV'],
    contactPhone: '+256 485 421 364',
    coordinates: [-0.6066, 30.6560]
  }
];

export const mockTestingCenters = [
  {
    id: 'test-1',
    name: 'Uganda Virus Research Institute',
    type: 'Research Institute',
    address: 'Plot 51-59, Nakiwogo Road, Entebbe',
    district: 'Wakiso',
    region: 'central',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    availableTests: ['COVID-19 PCR', 'COVID-19 Rapid', 'Malaria', 'HIV', 'Ebola'],
    turnaroundtime: 'COVID PCR: 24-48 hours, Rapid tests: 15-30 minutes',
    contactPhone: '+256 414 321 962',
    feeInformation: 'COVID PCR: UGX 150,000, Rapid tests: Free with referral',
    coordinates: [0.0511, 32.4432]
  },
  {
    id: 'test-2',
    name: 'Infectious Diseases Institute',
    type: 'Research Institute',
    address: 'Makerere University, Kampala',
    district: 'Kampala',
    region: 'central',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    availableTests: ['COVID-19 PCR', 'COVID-19 Rapid', 'HIV', 'TB'],
    turnaroundtime: 'COVID PCR: 24 hours, Rapid tests: Same day',
    contactPhone: '+256 414 307 000',
    feeInformation: 'COVID PCR: UGX 120,000, Other tests: Varies',
    coordinates: [0.3376, 32.5676]
  },
  {
    id: 'test-3',
    name: 'Tororo District Hospital',
    type: 'Hospital',
    address: 'Tororo-Mbale Road, Tororo',
    district: 'Tororo',
    region: 'eastern',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM',
    availableTests: ['COVID-19 Rapid', 'Malaria', 'HIV', 'TB'],
    turnaroundtime: 'Rapid tests: 15-30 minutes, TB: 48 hours',
    contactPhone: '+256 454 445 087',
    feeInformation: 'Most tests free with national health insurance',
    coordinates: [0.7027, 34.1813]
  },
  {
    id: 'test-4',
    name: 'Jinja Regional Referral Hospital',
    type: 'Hospital',
    address: 'Nalufenya, Jinja',
    district: 'Jinja',
    region: 'eastern',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    availableTests: ['COVID-19 PCR', 'COVID-19 Rapid', 'Malaria', 'HIV'],
    turnaroundtime: 'COVID PCR: 48 hours, Other tests: 24 hours or less',
    contactPhone: '+256 434 121 785',
    feeInformation: 'COVID PCR: UGX 100,000, Other tests: UGX 5,000-30,000',
    coordinates: [0.4250, 33.2000]
  },
  {
    id: 'test-5',
    name: 'Arua Regional Referral Hospital',
    type: 'Hospital',
    address: 'Adumi Road, Arua',
    district: 'Arua',
    region: 'northern',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    availableTests: ['COVID-19 Rapid', 'Malaria', 'HIV', 'TB'],
    turnaroundtime: 'Most tests: Same day results',
    contactPhone: '+256 476 420 371',
    feeInformation: 'Most tests free for pregnant women and children',
    coordinates: [3.0286, 30.9073]
  },
  {
    id: 'test-6',
    name: 'Moyo General Hospital',
    type: 'Hospital',
    address: 'Hospital Road, Moyo',
    district: 'Moyo',
    region: 'northern',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    availableTests: ['COVID-19 Rapid', 'Malaria', 'HIV'],
    turnaroundtime: 'All tests: Same day results',
    contactPhone: '+256 476 691 235',
    feeInformation: 'Basic tests free with referral',
    coordinates: [3.6500, 31.7300]
  },
  {
    id: 'test-7',
    name: 'Kilembe Mines Hospital',
    type: 'Hospital',
    address: 'Kasese-Fort Portal Road, Kasese',
    district: 'Kasese',
    region: 'western',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    availableTests: ['COVID-19 Rapid', 'Malaria', 'HIV', 'TB'],
    turnaroundtime: 'Rapid tests: 30 minutes, TB: 72 hours',
    contactPhone: '+256 483 444 578',
    feeInformation: 'UGX 5,000-25,000 depending on test',
    coordinates: [0.2000, 30.0300]
  },
  {
    id: 'test-8',
    name: 'Kabale Regional Referral Hospital',
    type: 'Hospital',
    address: 'Makanga Hill, Kabale',
    district: 'Kabale',
    region: 'western',
    operatingHours: 'Mon-Fri: 8:30 AM - 4:30 PM, Sat: 9:00 AM - 12:00 PM',
    availableTests: ['COVID-19 PCR', 'COVID-19 Rapid', 'Malaria', 'HIV', 'TB', 'Ebola'],
    turnaroundtime: 'COVID PCR: 48-72 hours, Other tests: 24 hours or less',
    contactPhone: '+256 486 422 409',
    feeInformation: 'COVID PCR: UGX 130,000, Other tests: UGX 10,000-50,000',
    coordinates: [-1.2490, 29.9805]
  },
  {
    id: 'test-9',
    name: 'Nakasero Hospital',
    type: 'Private Hospital',
    address: 'Plot 14, Akii Bua Road, Nakasero, Kampala',
    district: 'Kampala',
    region: 'central',
    operatingHours: 'Mon-Sun: 24 hours',
    availableTests: ['COVID-19 PCR', 'COVID-19 Rapid', 'Malaria', 'HIV', 'TB'],
    turnaroundtime: 'COVID PCR: 12-24 hours, Other tests: 1-24 hours',
    contactPhone: '+256 414 346 150',
    feeInformation: 'COVID PCR: UGX 180,000, Other tests: UGX 20,000-100,000',
    coordinates: [0.3254, 32.5809]
  },
  {
    id: 'test-10',
    name: 'Masaka Regional Referral Hospital',
    type: 'Hospital',
    address: 'Kampala Road, Masaka',
    district: 'Masaka',
    region: 'central',
    operatingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    availableTests: ['COVID-19 PCR', 'COVID-19 Rapid', 'Malaria', 'HIV', 'TB'],
    turnaroundtime: 'COVID PCR: 48 hours, Other tests: Same day',
    contactPhone: '+256 481 420 064',
    feeInformation: 'Some tests free with referral',
    coordinates: [-0.3333, 31.7333]
  }
];

// Helper function to generate random timeline data
function generateTimeline(disease, region) {
  const today = new Date();
  const timeline = [];
  
  // Generate data for the last 90 days
  for (let i = 90; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    let baseCases, baseRecovered, baseDeaths;
    
    // Set different base values depending on disease
    switch (disease) {
      case 'covid19':
        baseCases = Math.floor(Math.random() * 50) + 10;
        baseRecovered = Math.floor(Math.random() * 40) + 5;
        baseDeaths = Math.floor(Math.random() * 3);
        break;
      case 'malaria':
        baseCases = Math.floor(Math.random() * 200) + 50;
        baseRecovered = Math.floor(Math.random() * 180) + 40;
        baseDeaths = Math.floor(Math.random() * 5) + 1;
        break;
      case 'tuberculosis':
        baseCases = Math.floor(Math.random() * 20) + 5;
        baseRecovered = Math.floor(Math.random() * 15) + 3;
        baseDeaths = Math.floor(Math.random() * 2);
        break;
      case 'ebola':
        baseCases = Math.floor(Math.random() * 3);
        baseRecovered = Math.floor(Math.random() * 2);
        baseDeaths = Math.floor(Math.random() * 1);
        break;
      default:
        baseCases = Math.floor(Math.random() * 30) + 5;
        baseRecovered = Math.floor(Math.random() * 25) + 3;
        baseDeaths = Math.floor(Math.random() * 2);
    }
    
    // Adjust values based on region
    let multiplier = 1;
    switch (region) {
      case 'central': multiplier = 1.3; break;
      case 'eastern': multiplier = 1.1; break;
      case 'northern': multiplier = 0.9; break;
      case 'western': multiplier = 1.2; break;
      default: multiplier = 1;
    }
    
    timeline.push({
      date: date.toISOString().split('T')[0],
      newCases: Math.floor(baseCases * multiplier),
      recovered: Math.floor(baseRecovered * multiplier),
      deaths: Math.floor(baseDeaths * multiplier)
    });
  }
  
  return timeline;
} 