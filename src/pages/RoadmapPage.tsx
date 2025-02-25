import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, Plus } from 'lucide-react';
import { RoadmapItemForm } from '../components/roadmap/RoadmapItemForm';
import { RoadmapItem as RoadmapItemComponent } from '../components/roadmap/RoadmapItem';
import EmptyQuarter from '../components/roadmap/EmptyQuarter';
import { useRoadmap } from '../hooks/useRoadmap';
import { getQuarterMonths } from './../utils/quarterUtils';
import { RoadmapItem } from './../types/roadmap';

interface FormState {
  isOpen: boolean;
  year: number;
  quarter: string;
}

const RoadmapPage: React.FC = () => {
  const { roadmapData, addItem, updateItem, deleteItem, addYear } = useRoadmap();
  const [expandedYears, setExpandedYears] = useState<Set<number>>(
    new Set([new Date().getFullYear()])
  );
  const [expandedQuarters, setExpandedQuarters] = useState<Set<string>>(new Set());
  const [formState, setFormState] = useState<FormState>({
    isOpen: false,
    year: 0,
    quarter: ''
  });

  const toggleYear = (year: number) => {
    setExpandedYears(prev => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  const toggleQuarter = (yearQuarter: string) => {
    setExpandedQuarters(prev => {
      const next = new Set(prev);
      if (next.has(yearQuarter)) {
        next.delete(yearQuarter);
      } else {
        next.add(yearQuarter);
      }
      return next;
    });
  };

  const openAddItemForm = (year: number, quarter: string) => {
    setFormState({ isOpen: true, year, quarter });
  };

  const closeAddItemForm = () => {
    setFormState({ isOpen: false, year: 0, quarter: '' });
  };

  const handleAddItem = (item: Omit<RoadmapItem, 'id'>) => {
    addItem(formState.year, item);
    closeAddItemForm();
  };

  const getStatusColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteItem = (year: number, itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem(year, itemId);
    }
  };

  const handleAddYear = () => {
    const newYear = new Date().getFullYear() + 1;
    addYear(newYear);
    setExpandedYears(prev => new Set(prev).add(newYear));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Roadmap</h1>
          <p className="mt-2 text-gray-600">
            Track the evolution and upcoming features of our platform
          </p>
        </div>
        <button
          onClick={handleAddYear}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Year
        </button>
      </div>

      <div className="space-y-4">
        {roadmapData.map(({ year, quarters }) => (
          <div key={year} className="border rounded-lg bg-white shadow-sm">
            <button
              onClick={() => toggleYear(year)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-semibold text-gray-900">{year}</span>
              </div>
              {expandedYears.has(year) ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedYears.has(year) && (
              <div className="border-t">
                {(Object.keys(quarters) as Array<keyof typeof quarters>).map(quarter => {
                  const yearQuarter = `${year}-${quarter}`;
                  const isQuarterExpanded = expandedQuarters.has(yearQuarter);

                  return (
                    <div key={quarter} className="border-b last:border-b-0">
                      <div className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
                        <button
                          onClick={() => toggleQuarter(yearQuarter)}
                          className="flex items-center gap-2"
                        >
                          {isQuarterExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="font-medium text-gray-700">
                            {quarter}
                            <span className="ml-2 text-sm text-gray-500">
                              ({getQuarterMonths(quarter)})
                            </span>
                          </span>
                        </button>
                        <button
                          onClick={() => openAddItemForm(year, quarter)}
                          className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          Add Item
                        </button>
                      </div>

                      {isQuarterExpanded && (
                        <div className="px-6 pb-4 space-y-4">
                          {quarters[quarter].length > 0 ? (
                            quarters[quarter].map(item => (
                              <RoadmapItemComponent
                                key={item.id}
                                item={item}
                                statusColorClass={getStatusColor(item.status)}
                                onUpdate={(updates) => updateItem(year, item.id, updates)}
                                onDelete={() => handleDeleteItem(year, item.id)}
                              />
                            ))
                          ) : (
                            <EmptyQuarter />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {formState.isOpen && (
        <RoadmapItemForm
          year={formState.year}
          quarter={formState.quarter}
          onSubmit={handleAddItem}
          onClose={closeAddItemForm}
        />
      )}
    </div>
  );
};

export default RoadmapPage;