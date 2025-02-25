import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { OnboardingData } from './../../types/onboarding';
import { formatDate } from './../../utils/dateUtils';

interface ReadOnlyTableRowProps {
  data: OnboardingData;
}

export const ReadOnlyTableRow: React.FC<ReadOnlyTableRowProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <td className="px-6 py-4">
          <div className="flex items-center">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 mr-2" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2" />
            )}
            {data.lobName}
          </div>
        </td>
        <td className="px-6 py-4">{data.domain}</td>
        <td className="px-6 py-4">{data.subDomain}</td>
        <td className="px-6 py-4">{data.topicName}</td>
        <td className="px-6 py-4">{data.schemaName}</td>
        <td className="px-6 py-4">{data.tentativeProdDate}</td>
        <td className="px-6 py-4">{data.canPerformPT ? 'Yes' : 'No'}</td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="px-6 py-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Additional Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Onboard Type</dt>
                    <dd className="text-sm text-gray-900">{data.onboardType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Volume of Events</dt>
                    <dd className="text-sm text-gray-900">{data.volumeOfEvents || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">All Env ARNs</dt>
                    <dd className="text-sm text-gray-900 whitespace-pre-wrap">
                      {data.allEnvARNs || 'N/A'}
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Notification Email</dt>
                    <dd className="text-sm text-gray-900">{data.notificationEmail}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact Emails</dt>
                    <dd className="text-sm text-gray-900">{data.contactEmails || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                    <dd className="text-sm text-gray-900">{formatDate(data.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="text-sm text-gray-900">{formatDate(data.updatedAt)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};