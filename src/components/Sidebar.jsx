
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../data/constants';

// --- Draggable Chart Item Component ---
// This component represents the draggable chart cards in the sidebar.
const ChartItem = ({ name, icon: Icon, title, dataKey }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CHART_ITEM,
    item: { name, title, dataKey },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 bg-white rounded-xl shadow-md cursor-grab active:cursor-grabbing transform transition-transform duration-200 hover:scale-105 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center space-x-2">
        <Icon className="text-blue-500" size={24} />
        <span className="font-medium text-gray-700">{name}</span>
      </div>
    </div>
  );
};


// --- Sidebar Component ---
// This component contains the draggable chart items.
export const Sidebar = ({ chartItems }) => {
  return (
    <aside className="bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-4 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Drag & Drop Charts</h2>
      {chartItems.map((item) => (
        <ChartItem key={item.name} name={item.name} title={item.title} dataKey={item.dataKey} icon={item.icon} />
      ))}
    </aside>
  );
};