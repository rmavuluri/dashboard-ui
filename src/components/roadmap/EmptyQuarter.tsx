import React from 'react';
import { ClipboardList } from 'lucide-react';

const EmptyQuarter: React.FC = () => {
  return (
    <div className="py-8 flex flex-col items-center justify-center text-center text-gray-500">
      <ClipboardList className="w-8 h-8 mb-2 text-gray-400" />
      <p className="text-sm font-medium">No items planned for this quarter</p>
      <p className="text-xs mt-1">Click "Add Item" above to start planning</p>
    </div>
  );
};

export default EmptyQuarter;