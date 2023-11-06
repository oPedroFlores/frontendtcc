import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

const BarChart = ({ data, pie }) => {
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
  if (!pie) return <Bar data={data} options={options} />;
  if (pie) return <Pie options={options} data={data} />;
};

export default BarChart;
