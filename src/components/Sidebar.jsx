import React from 'react';
import { ChartItem } from './chartItem';

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
