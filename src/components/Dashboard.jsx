import React from 'react';
import { useDrop } from 'react-dnd';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { ItemTypes, mockRevenueData, mockGrowthData, mockProductsData, mockRegionalShareData, chartColorSchemes, chartOptions } from '../data/constants';

// --- Droppable Dashboard Component ---
// This component represents the main dashboard area where charts are dropped.
export const Dashboard = ({ chartGroup, setChartGroup }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CHART_ITEM,
    drop: (item) => {
      const dropId = Date.now();
      const newChartGroup = {
        dropId: dropId,
        title: item.title,
        dataKey: item.dataKey,
        charts: [
          { id: `${dropId}-bar`, type: 'Bar Chart', color: chartColorSchemes.bar },
          { id: `${dropId}-line`, type: 'Line Chart', color: chartColorSchemes.line },
          { id: `${dropId}-pie`, type: 'Pie Chart', color: chartColorSchemes.pie },
          { id: `${dropId}-doughnut`, type: 'Doughnut Chart', color: chartColorSchemes.doughnut },
        ],
      };
      setChartGroup(newChartGroup);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getChartDataByKey = (key, chartType) => {
    let baseData = {};
    switch (key) {
      case 'revenue':
        baseData = mockRevenueData;
        break;
      case 'growth':
        baseData = mockGrowthData;
        break;
      case 'products':
        baseData = mockProductsData;
        break;
      case 'regional':
        baseData = mockRegionalShareData;
        break;
      default:
        return {};
    }

    const newData = JSON.parse(JSON.stringify(baseData));
    const colors = chartColorSchemes[chartType];
    if (colors) {
        if (chartType === 'line') {
            newData.datasets[0].borderColor = colors[0];
            newData.datasets[0].backgroundColor = colors[0];
        } else {
            newData.datasets[0].backgroundColor = colors;
        }
    }
    return newData;
  };

  const renderChart = (chart, dataKey) => {
    const chartType = chart.type.split(' ')[0].toLowerCase();
    const chartData = getChartDataByKey(dataKey, chartType);
    const options = {
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        title: { display: true, text: `${chart.type} for ${chartData.datasets[0].label}` },
      },
    };
    switch (chart.type) {
      case 'Bar Chart':
        return <Bar key={chart.id} data={chartData} options={options} />;
      case 'Line Chart':
        return <Line key={chart.id} data={chartData} options={options} />;
      case 'Doughnut Chart':
        return <Doughnut key={chart.id} data={chartData} options={options} />;
      case 'Pie Chart':
        return <Pie key={chart.id} data={chartData} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={drop}
      className={`flex flex-col flex-1 p-6 transition-colors duration-200 ${
        isOver ? 'bg-indigo-50 border-indigo-300' : 'bg-white border-gray-200'
      } rounded-xl shadow-inner border-2 border-dashed overflow-y-auto`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        {chartGroup ? chartGroup.title : 'Your Dashboard'}
      </h2>
      {!chartGroup ? (
        <div className="flex flex-1 items-center justify-center text-gray-400 text-xl font-light">
          Drop a chart here to build your dashboard.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div key={chartGroup.dropId} className="bg-gray-100 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{`Charts for ${chartGroup.title}`}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chartGroup.charts.map((chart) => (
                <div key={chart.id} className="bg-white rounded-lg p-4 shadow-sm h-64">
                  {renderChart(chart, chartGroup.dataKey)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
