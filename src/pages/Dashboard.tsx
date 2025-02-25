import { Users, Database } from 'lucide-react';
import { getAllEntries } from './../services/onboardingService';
import { formatDate } from './../utils/dateUtils';

const Dashboard = () => {
  const producers = getAllEntries('producer');
  const consumers = getAllEntries('consumer');
  const allEntries = getAllEntries();
  
  // Sort entries by date and get the 5 most recent
  const recentActivity = allEntries
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Producers
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {producers.length} Active
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Consumers
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {consumers.length} Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.length > 0 ? (
              recentActivity.map((entry) => (
                <div
                  key={entry.id}
                  className="px-6 py-4 hover:bg-purple-50/30 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">
                        {entry.lobName} - {entry.onboardType.split('_').join(' ')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {entry.topicName}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(entry.updatedAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;