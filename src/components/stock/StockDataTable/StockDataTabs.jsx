import React from 'react';
import { Package, Layers } from 'lucide-react';

const StockDataTabs = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'stock', label: 'Stock Data', icon: Package, color: 'blue' },
        { id: 'type', label: 'Type Data', icon: Layers, color: 'purple' }
    ];

    return (
        <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex ">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
                            flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200
                            ${activeTab === tab.id
                                ? `border-b-2 border-${tab.color}-500 text-${tab.color}-600 bg-white `
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }
                        `}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockDataTabs;