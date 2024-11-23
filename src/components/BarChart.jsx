import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Sales",
      data: [400, 300, 500, 200],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
    {
      label: "Profit",
      data: [300, 200, 400, 150],
      backgroundColor: "black",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};

const ProductChart = () => {
  return (
    <div style={{ width: '500px', height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductChart;
