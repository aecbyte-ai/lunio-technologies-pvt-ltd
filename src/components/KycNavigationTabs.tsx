import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabCounts: {
    all: number;
    accepted: number;
    pending: number;
    rejected: number;
  };
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange, tabCounts }) => {
  
  const tabs: Tab[] = [
    { id: 'all', label: 'All', count: tabCounts.all },
    { id: 'accepted', label: 'Accepted', count: tabCounts.accepted },
    { id: 'pending', label: 'Pending', count: tabCounts.pending },
    { id: 'rejected', label: 'Rejected', count: tabCounts.rejected },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;