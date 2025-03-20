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

export const LineChart = ({ data }) => {
  // Format data for Chart.js
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString();
    }),
    datasets: [
      {
        label: 'New Cases',
        data: data.map(item => item.newCases),
        borderColor: '#0066cc',
        backgroundColor: 'rgba(0, 102, 204, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'New Recoveries',
        data: data.map(item => item.newRecoveries),
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'New Deaths',
        data: data.map(item => item.newDeaths),
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        fill: true,
        tension: 0.4,
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
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export const BarChart = ({ data }) => {
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
        display: false,
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
