import { useState } from 'react';
import { getEntriesByEnvironmentGroup } from './../services/onboardingService';
import { ENVIRONMENT_GROUPS } from './../types/environment';
import { ReadOnlyTable } from '../components/table/ReadOnlyTable';

const OnboardedAppsPage = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof ENVIRONMENT_GROUPS>('Innovation');

  const producers = getEntriesByEnvironmentGroup(activeTab, 'producer');
  const consumers = getEntriesByEnvironmentGroup(activeTab, 'consumer');

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {Object.keys(ENVIRONMENT_GROUPS).map((group) => (
            <button
              key={group}
              onClick={() => setActiveTab(group as keyof typeof ENVIRONMENT_GROUPS)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === group
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {group}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        {producers.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Producers</h2>
            <ReadOnlyTable data={producers} />
          </div>
        )}

        {consumers.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Consumers</h2>
            <ReadOnlyTable data={consumers} />
          </div>
        )}

        {producers.length === 0 && consumers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No applications onboarded for {activeTab} environments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardedAppsPage;