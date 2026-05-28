import React from 'react';
import { RefreshCw, Settings, Eye, Database, FilterX } from 'lucide-react';

const StockDataHeader = ({ 
    onRefresh, 
    pageSize, 
    onPageSizeChange, 
    onToggleColumnMenu, 
    activeTab,
    onClearAllFilters,
    hasFilters 
}) => {
    const pageSizeOptions = [50, 100, 150, 200];

    return (
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Database className="w-6 h-6 text-blue-500" />
                        <h2 className="text-2xl font-bold text-gray-800">
                            Stock & Type Management
                        </h2>
                    </div>
                    <p className="text-gray-500 mt-1">
                        Manage {activeTab === 'stock' ? 'stock inventory' : 'item types'} with advanced filtering
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Clear All Filters Button */}
                    {hasFilters && (
                        <button
                            onClick={onClearAllFilters}
                            className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg shadow-sm hover:bg-red-100 transition-colors"
                            title="Clear all filters"
                        >
                            <FilterX className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600">Clear Filters</span>
                        </button>
                    )}

                    {/* Column Visibility Button */}
                    <button
                        onClick={onToggleColumnMenu}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                        title="Show/Hide Columns"
                    >
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Columns</span>
                    </button>

                    {/* Page Size Selector */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <Settings className="w-4 h-4 text-gray-400" />
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="text-sm text-gray-600 bg-transparent outline-none cursor-pointer hover:text-gray-800"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>
                                    {size} rows per page
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Refresh Button */}
                    <button
                        onClick={onRefresh}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StockDataHeader;