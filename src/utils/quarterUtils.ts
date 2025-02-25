export const getQuarterMonths = (quarter: string): string => {
    switch (quarter) {
      case 'Q1':
        return 'Jan - Mar';
      case 'Q2':
        return 'Apr - Jun';
      case 'Q3':
        return 'Jul - Sep';
      case 'Q4':
        return 'Oct - Dec';
      default:
        return '';
    }
  };