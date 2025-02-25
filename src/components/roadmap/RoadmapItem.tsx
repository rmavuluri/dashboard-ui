import React, { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';
import { RoadmapItem as RoadmapItemType } from './../../types/roadmap';

interface RoadmapItemProps {
  item: RoadmapItemType;
  onUpdate: (updates: Partial<Omit<RoadmapItemType, 'id'>>) => void;
  onDelete: () => void;
  statusColorClass: string;
}

export const RoadmapItem: React.FC<RoadmapItemProps> = ({
  item,
  onUpdate,
  onDelete,
  statusColorClass,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(item);

  const handleSave = () => {
    onUpdate({
      title: editData.title,
      description: editData.description,
      status: editData.status,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(item);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 rounded-lg border border-purple-200 bg-white">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="Title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows={2}
            placeholder="Description"
          />
          <select
            value={editData.status}
            onChange={(e) => setEditData(prev => ({ 
              ...prev, 
              status: e.target.value as RoadmapItemType['status']
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:text-green-700"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColorClass}`}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};