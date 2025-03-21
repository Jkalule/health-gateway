import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ data, title = '' }) => {
  // Check if data is available and properly formatted
  if (!data || !data.dates || !data.datasets) {
    return (
      <div className="no-data-message">
        <div className="text-center p-4">
          <i className="fas fa-chart-line fa-3x mb-3 text-muted"></i>
          <h5>No timeline data available</h5>
          <p className="text-muted">Try selecting a different disease or time range</p>
        </div>
      </div>
    );
  }

  // Format data for Chart.js
  const chartData = {
    labels: data.dates.map(date => new Date(date).toLocaleDateString()),
    datasets: data.datasets.map(dataset => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.color,
      backgroundColor: `${dataset.color}20`, // Add transparency
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 7,
      borderWidth: 3,
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: title || 'Disease Trend Timeline',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 6
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Number of Cases',
          font: {
            size: 14
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: 'Timeline',
          font: {
            size: 14
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <div className="timeline-chart-container" style={{ height: '400px', position: 'relative' }}>
      <div className="timeline-header">
        <h5 className="mb-3">Disease Timeline Visualization</h5>
        <p className="text-muted small">Showing data trends over the selected time period</p>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export const BarChart = ({ data, title = '' }) => {
  // Check if data is available
  if (!data || !Object.keys(data).length) {
    return <div className="no-data-message">No regional data available</div>;
  }

  // Format data for Chart.js
  const regions = Object.keys(data);
  
  const chartData = {
    labels: regions.map(region => region.charAt(0).toUpperCase() + region.slice(1)),
    datasets: [
      {
        label: 'Cases',
        data: regions.map(region => data[region].cases),
        backgroundColor: 'rgba(0, 102, 204, 0.7)',
      },
      {
        label: 'Recoveries',
        data: regions.map(region => data[region].recoveries),
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
      },
      {
        label: 'Deaths',
        data: regions.map(region => data[region].deaths),
        backgroundColor: 'rgba(220, 53, 69, 0.7)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: title !== '',
        text: title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export const ComparativeChart = ({ data }) => {
  // Check if data is available
  if (!data || !data.diseases || !Object.keys(data.diseases).length) {
    return <div className="no-data-message">No comparative data available</div>;
  }

  const diseases = Object.keys(data.diseases);
  
  // Create datasets for cases, recoveries, and deaths
  const chartData = {
    labels: diseases.map(disease => disease.toUpperCase()),
    datasets: [
      {
        label: 'Total Cases',
        data: diseases.map(disease => data.diseases[disease].cases),
        backgroundColor: 'rgba(0, 102, 204, 0.7)',
      },
      {
        label: 'Active Cases',
        data: diseases.map(disease => data.diseases[disease].activeCases),
        backgroundColor: 'rgba(255, 193, 7, 0.7)',
      },
      {
        label: 'Recoveries',
        data: diseases.map(disease => data.diseases[disease].recoveries),
        backgroundColor: 'rgba(40, 167, 69, 0.7)',
      },
      {
        label: 'Deaths',
        data: diseases.map(disease => data.diseases[disease].deaths),
        backgroundColor: 'rgba(220, 53, 69, 0.7)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparative Disease Statistics'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

// Main Charts component that determines which chart to render
const Charts = ({ data, type = 'timeline', timeRange = '30days' }) => {
  // If no data is provided, return a message
  if (!data) {
    return <div className="no-data-message">No data available</div>;
  }

  // Handle timeline data (line chart)
  if (type === 'timeline') {
    // If no timeline data is provided directly, try to format it
    if (!data.dates && !data.datasets && Array.isArray(data)) {
      // Extract dates from the array
      const dates = data.map(point => point.date);
      
      // Create datasets for new cases, recoveries, and deaths
      const formattedData = {
        dates,
        datasets: [
          {
            label: 'New Cases',
            data: data.map(point => point.newCases || point.cases),
            color: '#0066cc'
          },
          {
            label: 'Recoveries',
            data: data.map(point => point.newRecoveries || point.recoveries),
            color: '#28a745'
          },
          {
            label: 'Deaths',
            data: data.map(point => point.newDeaths || point.deaths),
            color: '#dc3545'
          }
        ]
      };
      
      return <LineChart data={formattedData} />;
    }
    
    // If the data is already formatted correctly, pass it directly
    return <LineChart data={data} />;
  }
  
  // Handle regional data (bar chart)
  if (type === 'regional') {
    // If data is in the expected format, use it directly
    if (data.regions) {
      return <BarChart data={data.regions} title="Regional Statistics" />;
    }
    
    // Otherwise, try to format the data
    const formattedData = {};
    
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (!formattedData[item.region]) {
          formattedData[item.region] = {
            cases: 0,
            recoveries: 0,
            deaths: 0
          };
        }
        
        formattedData[item.region].cases += item.cases || 0;
        formattedData[item.region].recoveries += item.recoveries || item.recovered || 0;
        formattedData[item.region].deaths += item.deaths || 0;
      });
      
      return <BarChart data={formattedData} title="Regional Statistics" />;
    }
    
    return <div className="no-data-message">Invalid regional data format</div>;
  }
  
  // Handle comparative data (comparing multiple diseases)
  if (type === 'comparative') {
    return <ComparativeChart data={data} />;
  }
  
  // Default fallback
  return <div className="no-chart-message">Select data to visualize</div>;
};

export default Charts;
