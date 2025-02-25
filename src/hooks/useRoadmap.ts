import { useState } from 'react';
import { RoadmapItem, YearData } from './../types/roadmap';

const STORAGE_KEY = 'roadmap_data';

const defaultData: YearData[] = [
  {
    year: new Date().getFullYear(),
    quarters: { Q1: [], Q2: [], Q3: [], Q4: [] }
  }
];

export const useRoadmap = () => {
  const [roadmapData, setRoadmapData] = useState<YearData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  });

  const saveToStorage = (data: YearData[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addItem = (year: number, item: Omit<RoadmapItem, 'id'>) => {
    const newItem: RoadmapItem = {
      ...item,
      id: Date.now().toString(),
    };

    setRoadmapData(prev => {
      const newData = prev.map(yearData => {
        if (yearData.year === year) {
          return {
            ...yearData,
            quarters: {
              ...yearData.quarters,
              [item.quarter]: [...yearData.quarters[item.quarter as keyof typeof yearData.quarters], newItem]
            }
          };
        }
        return yearData;
      });

      saveToStorage(newData);
      return newData;
    });
  };

  const updateItem = (year: number, itemId: string, updates: Partial<Omit<RoadmapItem, 'id'>>) => {
    setRoadmapData(prev => {
      const newData = prev.map(yearData => {
        if (yearData.year === year) {
          const quarters = { ...yearData.quarters };
          Object.keys(quarters).forEach(quarter => {
            quarters[quarter as keyof typeof quarters] = quarters[quarter as keyof typeof quarters]
              .map(item => item.id === itemId ? { ...item, ...updates } : item);
          });
          return { ...yearData, quarters };
        }
        return yearData;
      });

      saveToStorage(newData);
      return newData;
    });
  };

  const deleteItem = (year: number, itemId: string) => {
    setRoadmapData(prev => {
      const newData = prev.map(yearData => {
        if (yearData.year === year) {
          const quarters = { ...yearData.quarters };
          Object.keys(quarters).forEach(quarter => {
            quarters[quarter as keyof typeof quarters] = quarters[quarter as keyof typeof quarters]
              .filter(item => item.id !== itemId);
          });
          return { ...yearData, quarters };
        }
        return yearData;
      });

      saveToStorage(newData);
      return newData;
    });
  };

  const addYear = (year: number) => {
    if (!roadmapData.some(data => data.year === year)) {
      setRoadmapData(prev => {
        const newData = [...prev, {
          year,
          quarters: { Q1: [], Q2: [], Q3: [], Q4: [] }
        }].sort((a, b) => b.year - a.year);

        saveToStorage(newData);
        return newData;
      });
    }
  };

  return {
    roadmapData,
    addItem,
    updateItem,
    deleteItem,
    addYear
  };
};