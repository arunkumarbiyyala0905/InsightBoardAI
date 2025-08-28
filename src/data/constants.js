// --- Constants for Chart and Data Management ---

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

// Define item types for react-dnd
export const ItemTypes = {
  CHART_ITEM: 'chart_item',
};

// Mock data for various charts
export const mockRevenueData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    label: 'Total Revenue',
    data: [150000, 180000, 160000, 220000],
    backgroundColor: [],
    borderColor: [],
    borderWidth: 1,
  }],
};

export const mockGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Customer Growth (%)',
    data: [2.5, 3.1, 4.0, 3.8, 4.5, 5.2],
    fill: false,
    borderColor: [],
  }],
};

export const mockProductsData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [{
    label: 'Units Sold',
    data: [120, 190, 80, 150],
    backgroundColor: [],
    borderWidth: 1,
  }],
};

export const mockRegionalShareData = {
  labels: ['North', 'South', 'East', 'West'],
  datasets: [{
    label: 'Market Share (%)',
    data: [45, 15, 25, 15],
    backgroundColor: [],
    borderWidth: 1,
  }],
};

// Define color schemes for charts to ensure visual consistency
export const chartColorSchemes = {
  bar: [
    'rgba(75, 192, 192, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
  ],
  line: [
    'rgba(75, 192, 192, 1)',
    'rgba(54, 162, 235, 1)',
  ],
  pie: [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
  ],
  doughnut: [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
  ],
};

// Default chart options to be merged with specific options
export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart Title Placeholder',
    },
  },
};
