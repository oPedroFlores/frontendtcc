import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

const BarChart = ({ data }) => {
  Chart.register(CategoryScale);
  const options = {
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
