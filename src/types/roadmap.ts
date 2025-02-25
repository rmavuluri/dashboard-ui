export interface RoadmapItem {
    id: string;
    title: string;
    description: string;
    status: 'planned' | 'in-progress' | 'completed';
    quarter: string;
  }
  
  export interface YearData {
    year: number;
    quarters: {
      [key in 'Q1' | 'Q2' | 'Q3' | 'Q4']: RoadmapItem[];
    };
  }