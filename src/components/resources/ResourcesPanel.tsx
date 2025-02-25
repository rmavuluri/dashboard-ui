import React from 'react';
import { X, ExternalLink, BookOpen, Code, PlayCircle, Archive, MoreHorizontal } from 'lucide-react';

interface ResourcesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourcesPanel: React.FC<ResourcesPanelProps> = ({ isOpen, onClose }) => {
  const resources = [
    { 
      title: 'Fulcrum Documentation', 
      description: 'Complete guide and API references',
      icon: BookOpen,
      url: 'https://www.google.com' 
    },
    { 
      title: 'Integration Patterns', 
      description: 'Best practices and implementation patterns',
      icon: Code,
      url: 'https://www.google.com' 
    },
    { 
      title: 'Fulcrum Repos', 
      description: 'Source code and example repositories',
      icon: Archive,
      url: 'https://www.google.com' 
    },
    { 
      title: 'Video Tutorials', 
      description: 'Step-by-step archetype guides',
      icon: PlayCircle,
      url: 'https://www.google.com' 
    },
    { 
      title: 'Miscellaneous', 
      description: 'Additional resources and tools',
      icon: MoreHorizontal,
      url: 'https://www.google.com' 
    }
  ];

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-2xl transform transition-all duration-300 ease-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-700">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Fulcrum Resources
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <button
                key={index}
                onClick={() => handleResourceClick(resource.url)}
                className="w-full group"
              >
                <div className="relative p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200 shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors">
                      <resource.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {resource.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            Access documentation and resources to help you build with Fulcrum
          </p>
        </div>
      </div>
    </>
  );
};