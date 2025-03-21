import React, { useState } from 'react';
import { LineChart, BarChart } from './Charts';

const DiseaseTracker = ({ data, timeRange }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!data || data.length === 0) {
    return (
      <div className="no-data-container">
        <div className="no-data-icon">📊</div>
        <div className="no-data-message">No disease data available</div>
        <p className="no-data-hint">Check your selected filters or try again later</p>
      </div>
    );
  }

  // Aggregate statistics across all data points
  const aggregateStats = {
    totalCases: data.reduce((sum, item) => sum + item.cases, 0),
    activeCases: data.reduce((sum, item) => sum + item.activeCases, 0),
    recovered: data.reduce((sum, item) => sum + item.recovered, 0),
    deaths: data.reduce((sum, item) => sum + item.deaths, 0),
    vaccinationRate: data.length > 0 
      ? (data.reduce((sum, item) => sum + (item.vaccinationRate || 0), 0) / data.length).toFixed(1) 
      : 0
  };

  // Group data by region for the regional breakdown
  const regionData = {};
  data.forEach(item => {
    if (!regionData[item.region]) {
      regionData[item.region] = {
        cases: 0,
        recoveries: 0,
        deaths: 0
      };
    }
    regionData[item.region].cases += item.cases || 0;
    regionData[item.region].recoveries += item.recovered || 0;
    regionData[item.region].deaths += item.deaths || 0;
  });

  // Extract timeline data for charts
  const timelineData = [];
  data.forEach(item => {
    if (item.timeline && item.timeline.length > 0) {
      // Filter timeline based on the selected time range
      const filteredTimeline = item.timeline.slice(-getTimeRangeDays(timeRange));
      timelineData.push(...filteredTimeline);
    }
  });

  // Helper function to determine days to include based on time range
  function getTimeRangeDays(range) {
    switch(range) {
      case '7days': return 7;
      case '90days': return 90;
      case '1year': return 365;
      default: return 30; // 30days is default
    }
  }

  // Calculate trend percentages for stats cards
  const getTrendIndicator = (value) => {
    // For demo purposes, generating random trends between -20% and +20%
    const randomTrend = (Math.random() * 40 - 20).toFixed(1);
    const isPositive = parseFloat(randomTrend) >= 0;
    
    return {
      value: randomTrend,
      direction: isPositive ? 'up' : 'down',
      className: isPositive ? 'trend-up' : 'trend-down'
    };
  };

  const trends = {
    totalCases: getTrendIndicator(),
    activeCases: getTrendIndicator(),
    recovered: getTrendIndicator(),
    deaths: getTrendIndicator(),
    vaccinationRate: getTrendIndicator()
  };

  return (
    <div className="disease-tracker">
      <div className="tracker-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          <span className="tab-icon">📊</span>
          Overview
        </button>
        <button 
          className={activeTab === 'charts' ? 'active' : ''} 
          onClick={() => setActiveTab('charts')}
        >
          <span className="tab-icon">📈</span>
          Charts
        </button>
        <button 
          className={activeTab === 'map' ? 'active' : ''} 
          onClick={() => setActiveTab('map')}
        >
          <span className="tab-icon">🗺️</span>
          Map View
        </button>
      </div>
      
      {activeTab === 'overview' && (
        <>
          <div className="tracker-summary">
            <div className="summary-header">
              <h2>Health Overview</h2>
              <div className="last-updated">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          <div className="tracker-statistics">
            <div className="stat-card">
              <div className="stat-header">
                <h3>Total Cases</h3>
                <div className={`stat-trend ${trends.totalCases.className}`}>
                  {trends.totalCases.direction === 'up' ? '↑' : '↓'} {Math.abs(trends.totalCases.value)}%
                </div>
              </div>
              <p className="stat-value">{aggregateStats.totalCases.toLocaleString()}</p>
              <div className="stat-icon total-cases-icon">📝</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <h3>Active Cases</h3>
                <div className={`stat-trend ${trends.activeCases.className}`}>
                  {trends.activeCases.direction === 'up' ? '↑' : '↓'} {Math.abs(trends.activeCases.value)}%
                </div>
              </div>
              <p className="stat-value">{aggregateStats.activeCases.toLocaleString()}</p>
              <div className="stat-icon active-cases-icon">🦠</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <h3>Recovered</h3>
                <div className={`stat-trend ${trends.recovered.className}`}>
                  {trends.recovered.direction === 'up' ? '↑' : '↓'} {Math.abs(trends.recovered.value)}%
                </div>
              </div>
              <p className="stat-value">{aggregateStats.recovered.toLocaleString()}</p>
              <div className="stat-icon recovered-icon">💚</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <h3>Deaths</h3>
                <div className={`stat-trend ${trends.deaths.className}`}>
                  {trends.deaths.direction === 'up' ? '↑' : '↓'} {Math.abs(trends.deaths.value)}%
                </div>
              </div>
              <p className="stat-value">{aggregateStats.deaths.toLocaleString()}</p>
              <div className="stat-icon deaths-icon">💔</div>
            </div>
            {aggregateStats.vaccinationRate > 0 && (
              <div className="stat-card">
                <div className="stat-header">
                  <h3>Vaccination Rate</h3>
                  <div className={`stat-trend ${trends.vaccinationRate.className}`}>
                    {trends.vaccinationRate.direction === 'up' ? '↑' : '↓'} {Math.abs(trends.vaccinationRate.value)}%
                  </div>
                </div>
                <p className="stat-value">{aggregateStats.vaccinationRate}%</p>
                <div className="stat-icon vaccination-icon">💉</div>
                <div className="vaccination-progress">
                  <div 
                    className="vaccination-progress-bar" 
                    style={{width: `${Math.min(aggregateStats.vaccinationRate, 100)}%`}}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="regional-breakdown">
            <div className="section-header">
              <h3>Regional Breakdown</h3>
              <div className="section-actions">
                <button className="action-button">
                  <span className="action-icon">⬇️</span> Export
                </button>
                <button className="action-button">
                  <span className="action-icon">🔍</span> Filter
                </button>
              </div>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Cases</th>
                    <th>Recoveries</th>
                    <th>Deaths</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(regionData).map(([region, stats]) => {
                    // Calculate a status based on cases vs recoveries ratio
                    const recoveryRatio = stats.recoveries / (stats.cases || 1);
                    let status = 'Critical';
                    let statusClass = 'status-critical';
                    
                    if (recoveryRatio > 0.8) {
                      status = 'Good';
                      statusClass = 'status-good';
                    } else if (recoveryRatio > 0.5) {
                      status = 'Moderate';
                      statusClass = 'status-moderate';
                    } else if (recoveryRatio > 0.3) {
                      status = 'Concerning';
                      statusClass = 'status-concerning';
                    }
                    
                    return (
                      <tr key={region}>
                        <td className="region-name">
                          <span className="region-icon">📍</span>
                          {region.charAt(0).toUpperCase() + region.slice(1)}
                        </td>
                        <td>{stats.cases.toLocaleString()}</td>
                        <td>{stats.recoveries.toLocaleString()}</td>
                        <td>{stats.deaths.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${statusClass}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="quick-insights">
            <h3>Quick Insights</h3>
            <div className="insights-cards">
              <div className="insight-card">
                <div className="insight-icon">🔍</div>
                <div className="insight-content">
                  <h4>Trending Disease</h4>
                  <p>Malaria cases have increased by 12% in Northern Uganda</p>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">💡</div>
                <div className="insight-content">
                  <h4>Vaccination Campaign</h4>
                  <p>Polio vaccination coverage reached 85% in Western districts</p>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon">🎯</div>
                <div className="insight-content">
                  <h4>Success Story</h4>
                  <p>Cholera cases decreased by 65% in Kampala due to intervention</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {activeTab === 'charts' && (
        <div className="charts-container">
          <div className="charts-header">
            <h2>Data Visualization</h2>
            <div className="charts-timeframe">
              <span className="timeframe-label">Showing data for: </span>
              <span className="timeframe-value">{
                timeRange === '7days' ? 'Past 7 days' :
                timeRange === '30days' ? 'Past 30 days' :
                timeRange === '90days' ? 'Past 90 days' : 'Past year'
              }</span>
            </div>
          </div>
          
          <div className="tracker-charts">
            <div className="chart-container">
              <h3>Disease Trends</h3>
              {timelineData.length > 0 ? (
                <LineChart data={timelineData} />
              ) : (
                <div className="no-data-message">No timeline data available</div>
              )}
              <div className="chart-footer">
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: '#0066cc'}}></span>
                    <span>New Cases</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: '#28a745'}}></span>
                    <span>Recoveries</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color" style={{backgroundColor: '#dc3545'}}></span>
                    <span>Deaths</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <h3>Cases by Region</h3>
              <BarChart data={regionData} />
              <div className="chart-actions">
                <button className="chart-action">
                  <span className="action-icon">📥</span> Download PNG
                </button>
                <button className="chart-action">
                  <span className="action-icon">📊</span> View Full Data
                </button>
              </div>
            </div>
          </div>
          
          <div className="additional-charts">
            <div className="chart-container full-width">
              <h3>Disease Comparison Across Regions</h3>
              <div className="placeholder-chart">
                <div className="placeholder-text">Interactive comparison chart will appear here</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'map' && (
        <div className="map-container">
          <div className="map-header">
            <h2>Geographical Distribution</h2>
            <div className="map-controls">
              <button className="map-control-btn">
                <span className="control-icon">🔍</span> Zoom
              </button>
              <button className="map-control-btn">
                <span className="control-icon">📍</span> Centers
              </button>
              <button className="map-control-btn">
                <span className="control-icon">🔄</span> Refresh
              </button>
            </div>
          </div>
          <div className="map-placeholder">
            <div className="placeholder-text">
              <p>Interactive map of Uganda showing health data distribution</p>
              <p className="placeholder-subtext">The map will display disease outbreaks, vaccination centers, and testing facilities</p>
            </div>
          </div>
          <div className="map-legend">
            <div className="legend-title">Map Legend</div>
            <div className="legend-items">
              <div className="legend-item">
                <span className="legend-symbol" style={{backgroundColor: '#ff5252'}}></span>
                <span>Outbreak Hotspot</span>
              </div>
              <div className="legend-item">
                <span className="legend-symbol" style={{backgroundColor: '#4caf50'}}></span>
                <span>Vaccination Center</span>
              </div>
              <div className="legend-item">
                <span className="legend-symbol" style={{backgroundColor: '#2196f3'}}></span>
                <span>Testing Facility</span>
              </div>
              <div className="legend-item">
                <span className="legend-symbol" style={{backgroundColor: '#ffeb3b'}}></span>
                <span>Moderate Risk Area</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseTracker;
