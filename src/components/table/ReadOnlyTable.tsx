import React from 'react';
import { OnboardingData } from './../../types/onboarding';
import TableHeader from './TableHeader';
import { ReadOnlyTableRow } from './ReadOnlyTableRow';

interface ReadOnlyTableProps {
  data: OnboardingData[];
}

export const ReadOnlyTable: React.FC<ReadOnlyTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            columns={[
              'LOB Name',
              'Domain',
              'Sub-Domain',
              'Topic Name',
              'Schema Name',
              'PROD Date',
              'PT Ready'
            ]}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <ReadOnlyTableRow key={item.id} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};