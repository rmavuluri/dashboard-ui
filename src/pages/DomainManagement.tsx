import { getDomainTree } from './../services/domainService';
import { DomainTreeView } from '../components/domain/DomainTreeView';

const DomainManagement = () => {
  const { domains } = getDomainTree();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Domain Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your domain hierarchy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Tree */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Domain Hierarchy</h2>
            </div>
            <div className="p-4">
              {domains.length > 0 ? (
                <DomainTreeView domains={domains} />
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No domains</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Domains will appear here when you onboard producers or consumers
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Domain Statistics</h3>
            <dl className="grid grid-cols-1 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-purple-800">Total Domains</dt>
                <dd className="mt-1 text-3xl font-semibold text-purple-900">{domains.length}</dd>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <dt className="text-sm font-medium text-blue-800">Total Subdomains</dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-900">
                  {domains.reduce((acc, domain) => acc + domain.subDomains.length, 0)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Tips</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                Domains are automatically created when onboarding
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                Each domain can have multiple subdomains
              </li>
              <li className="flex gap-2">
                <span className="text-purple-600">•</span>
                Domain names are used to generate topic names
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainManagement;