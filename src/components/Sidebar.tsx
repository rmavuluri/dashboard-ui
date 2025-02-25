import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  Database,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layout,
  Map
} from 'lucide-react';
import { useSidebarState } from './../hooks/useSidebarState';
import { useResourcesPanel } from '../hooks/useResourcesPanel';
import { ResourcesPanel } from './resources/ResourcesPanel';

export const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebarState();
  const resourcesPanel = useResourcesPanel();

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/' },
    { icon: ClipboardList, text: 'Onboard Form', path: '/onboard' },
    { icon: Database, text: 'Domain Management', path: '/domain' },
    { icon: Users, text: 'Producers', path: '/producers' },
    { icon: Users, text: 'Consumers', path: '/consumers' },
    { icon: Layout, text: 'Onboarded Apps', path: '/onboarded-apps' },
    { icon: Map, text: 'Roadmap', path: '/roadmap' },
  ];

  return (
    <>
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="h-full px-3 py-4 relative">
          <button
            onClick={toggle}
            className="absolute -right-3 top-10 bg-purple-600 text-white rounded-full p-1 shadow-lg hover:bg-purple-700 transition-colors"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 text-gray-700 border-b border-gray-100 transition-all duration-200
                  ${isActive 
                    ? 'bg-purple-50 text-purple-700 border-purple-100 shadow-sm' 
                    : 'hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className={`w-6 h-6 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span className="font-medium">{item.text}</span>}
              </NavLink>
            ))}
            <button
              onClick={resourcesPanel.toggle}
              className="flex items-center w-full p-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
            >
              <BookOpen className={`w-6 h-6 ${isOpen ? 'mr-3' : ''}`} />
              {isOpen && <span className="font-medium">Fulcrum Resources</span>}
            </button>
          </div>
        </div>
      </div>
      <ResourcesPanel 
        isOpen={resourcesPanel.isOpen} 
        onClose={resourcesPanel.close} 
      />
    </>
  );
};