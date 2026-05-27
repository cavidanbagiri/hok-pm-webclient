import React from 'react';

const DataTableTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? `border-b-2 border-${tab.color}-500 text-${tab.color}-600`
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === tab.id 
                ? `bg-${tab.color}-100 text-${tab.color}-600`
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.data?.length || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTableTabs;