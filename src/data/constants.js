// In a real project, this data would likely be in a separate data.js or constants.js file.
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

// Register Chart.js components. This is essential for preventing chart errors.
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
);

// Define the drag item type. This is crucial for react-dnd to work correctly.
export const ItemTypes = {
  CHART_ITEM: 'chart_item',
};

export const mockRevenueData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    label: 'Revenue ($)',
    data: [120000, 150000, 140000, 180000],
    backgroundColor: 'rgba(54, 162, 235, 0.8)',
    borderColor: 'rgba(54, 162, 235, 1)',
    borderWidth: 1,
  }],
};

export const mockGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Customer Growth (%)',
    data: [2, 4, 7, 9, 12, 15],
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
    tension: 0.3,
    fill: true,
  }],
};

export const mockProductsData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [{
    label: 'Units Sold',
    data: [450, 320, 580, 210],
    backgroundColor: 'rgba(255, 99, 132, 0.8)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
  }],
};

export const mockRegionalShareData = {
  labels: ['North', 'South', 'East', 'West'],
  datasets: [{
    label: 'Market Share (%)',
    data: [35, 20, 25, 20],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
    ],
    borderColor: 'white',
    borderWidth: 2,
  }],
};

export const chartColorSchemes = {
  bar: ['rgba(54, 162, 235, 0.8)'],
  line: ['rgba(75, 192, 192, 0.8)'],
  pie: [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
  ],
  doughnut: [
    'rgba(255, 159, 64, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
  ],
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sample Dashboard Chart',
      font: {
        size: 16,
      },
      color: '#333',
    },
  },
};
