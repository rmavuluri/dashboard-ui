import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FolderOpen, Folder } from 'lucide-react';
import { DomainNode as DomainNodeType } from './../../types/domain';

interface DomainTreeViewProps {
  domains: DomainNodeType[];
}

export const DomainTreeView: React.FC<DomainTreeViewProps> = ({ domains }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const renderNode = (node: DomainNodeType, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.subDomains.length > 0;
    const paddingLeft = `${level * 1.5}rem`;

    return (
      <div key={node.id}>
        <div
          className="flex items-center py-2 px-4 hover:bg-gray-50 cursor-pointer group"
          style={{ paddingLeft }}
          onClick={() => toggleNode(node.id)}
        >
          <span className="mr-2 text-gray-400 group-hover:text-gray-600">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : (
              <span className="w-4" />
            )}
          </span>
          <span className="mr-2 text-purple-600">
            {isExpanded ? <FolderOpen className="w-5 h-5" /> : <Folder className="w-5 h-5" />}
          </span>
          <span className="text-sm font-medium text-gray-900">{node.name}</span>
          {hasChildren && (
            <span className="ml-2 text-xs text-gray-500">
              ({node.subDomains.length} subdomain{node.subDomains.length !== 1 ? 's' : ''})
            </span>
          )}
        </div>
        {isExpanded && node.subDomains.length > 0 && (
          <div className="ml-4 border-l border-gray-200">
            {node.subDomains.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return <div className="space-y-1">{domains.map(domain => renderNode(domain))}</div>;
};