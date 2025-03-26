// Sample data for the dashboard
const generateTrendData = (timeRange = '30d') => {
  const points = timeRange === '7d' ? 7 : 
                timeRange === '30d' ? 30 :
                timeRange === '90d' ? 90 :
                timeRange === '1y' ? 52 : 30;

  return Array.from({ length: points }, (_, i) => ({
    date: new Date(Date.now() - (points - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    cases: Math.floor(Math.random() * 1000),
    recoveries: Math.floor(Math.random() * 800),
    active: Math.floor(Math.random() * 500),
    critical: Math.floor(Math.random() * 100)
  }));
};

export const generateSampleData = (disease, timeRange) => {
  const generateStats = (base) => {
    const totalCases = base.totalCases;
    const activeCases = Math.floor(totalCases * base.activeRate);
    const recoveries = Math.floor(totalCases * base.recoveryRate);
    const criticalCases = Math.floor(activeCases * base.criticalRate);
    
    return {
      totalCases,
      activeCases,
      recoveries,
      criticalCases,
      caseChange: Math.floor(Math.random() * 20) - 10,
      activeChange: Math.floor(Math.random() * 30) - 15,
      recoveryRate: Math.floor((recoveries / totalCases) * 100),
      criticalChange: Math.floor(Math.random() * 10) - 5,
      chartData: generateTrendData(timeRange)
    };
  };

  const baseData = {
    covid19: {
      totalCases: 125430,
      activeRate: 0.026,
      recoveryRate: 0.963,
      criticalRate: 0.15
    },
    h1n1: {
      totalCases: 45680,
      activeRate: 0.032,
      recoveryRate: 0.958,
      criticalRate: 0.12
    },
    mpox: {
      totalCases: 2890,
      activeRate: 0.045,
      recoveryRate: 0.945,
      criticalRate: 0.08
    },
    malaria: {
      totalCases: 89750,
      activeRate: 0.051,
      recoveryRate: 0.939,
      criticalRate: 0.18
    },
    tuberculosis: {
      totalCases: 34560,
      activeRate: 0.063,
      recoveryRate: 0.919,
      criticalRate: 0.22
    },
    ebola: {
      totalCases: 1245,
      activeRate: 0.072,
      recoveryRate: 0.848,
      criticalRate: 0.35
    }
  };

  return baseData[disease] ? generateStats(baseData[disease]) : null;
};

export const generateRegionalData = (disease) => {
  const regions = [
    { id: 'central', name: 'Central Region' },
    { id: 'eastern', name: 'Eastern Region' },
    { id: 'northern', name: 'Northern Region' },
    { id: 'western', name: 'Western Region' }
  ];

  const data = {};
  const totalCases = Math.floor(Math.random() * 50000) + 10000;

  regions.forEach(region => {
    const cases = Math.floor(Math.random() * (totalCases * 0.4));
    data[region.id] = {
      name: region.name,
      cases,
      recoveries: Math.floor(cases * 0.85),
      active: Math.floor(cases * 0.12),
      critical: Math.floor(cases * 0.03),
      changeRate: Math.floor(Math.random() * 20) - 10
    };
  });

  return {
    regions: data,
    summary: {
      totalCases,
      totalActive: Object.values(data).reduce((sum, r) => sum + r.active, 0),
      totalCritical: Object.values(data).reduce((sum, r) => sum + r.critical, 0),
      mostAffected: regions.reduce((prev, curr) => 
        (data[curr.id].cases > data[prev.id].cases) ? curr : prev
      ).name
    }
  };
};
