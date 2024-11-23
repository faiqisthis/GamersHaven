import React from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales (in USD)',
      data: [1200, 1900, 3000, 5000, 2400, 3200, 4200],
      borderColor: 'rgba(75, 192, 192, 1)', // Line color
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
      pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
      pointBorderColor: '#fff', // Point border color
      borderWidth: 2,
      tension: 0.4, // Smoothness of the line
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // Legend position
    },
    tooltip: {
      enabled: true, // Show tooltip on hover
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Sales (USD)',
      },
      beginAtZero: true,
    },
  },
};

const SalesLineChart = () => {
  return (
    <div style={{ width: '500px', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesLineChart;
