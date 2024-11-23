import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Consoles', 'Games', 'Accessories'],
  datasets: [
    {
      label: 'Sales',
      data: [1000, 500, 350],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // Position of the legend (top, bottom, left, right)
    },
    tooltip: {
      enabled: true,
    },
  },
};

const ProductPieChart = () => {
  return (
    <div style={{ width: '500px', height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProductPieChart;
