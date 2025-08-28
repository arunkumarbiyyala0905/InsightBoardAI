import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../data/constants';

// --- Draggable Chart Item Component ---
// This component represents the draggable chart cards in the sidebar.
export const ChartItem = ({ name, icon: Icon, title, dataKey }) => {
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
