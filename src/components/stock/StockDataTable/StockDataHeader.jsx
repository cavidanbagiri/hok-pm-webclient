import React from 'react';
import { RefreshCw, Settings, Eye, Database, FilterX, Import, BadgePlus, Package } from 'lucide-react';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';

const StockDataHeader = ({
    onRefresh,
    pageSize,
    onPageSizeChange,
    onToggleColumnMenu,
    activeTab,
    onClearAllFilters,
    hasFilters,
    showColumnMenu,
    currentColumns,
    currentVisibleColumns,
    toggleColumn,
    onCreateType,
    onCreateStock,  // Add this prop
}) => {
    const pageSizeOptions = [50, 100, 150, 200];
    const buttonRef = React.useRef(null);

    return (
        <div className="px-3 border-b border-gray-200 bg-white py-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Column Visibility Button */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            onClick={onToggleColumnMenu}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                            title="Show/Hide Columns"
                        >
                            <Eye className="w-4 h-4 text-gray-600" />
                            <span className="text-xs text-gray-600">Columns</span>
                        </button>
                        
                        {/* Column Visibility Menu - positioned relative to this button */}
                        {showColumnMenu && (
                            <div className="absolute top-full left-0 mt-1 z-[100]">
                                <ColumnVisibilityMenu
                                    columns={currentColumns}
                                    visibleColumns={currentVisibleColumns}
                                    onToggleColumn={toggleColumn}
                                    onClose={onToggleColumnMenu}
                                />
                            </div>
                        )}
                    </div>
                       
                    <button
                        onClick={onRefresh}
                        className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        title="Refresh"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className='pl-1 text-xs'>Refresh Table</span>
                    </button>

                    {/* Import CSV Button */}
                    <button
                        onClick={onRefresh}
                        className="flex items-center p-2  text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        title="Import CSV"
                    >
                        <Import className="w-4 h-4" />
                        <span className='pl-1 text-xs'>Import CSV</span>
                    </button>

                    {/* Create Stock */}
                    {/* Create Stock Button - Only show on Stock tab */}
                    
                    <button
                        onClick={onCreateStock}
                        className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        title="Create Stock"
                    >
                        <Package className="w-4 h-4" />
                        <span className='pl-1 text-xs'>Create Stock</span>
                    </button>
                    

                    {/* Create Type */}
                    <button
                        onClick={onCreateType}
                        className="flex items-center p-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        title="Import CSV"
                    >
                        <BadgePlus className="w-4 h-4" />
                        <span className='pl-1 text-xs'>Create Type</span>
                    </button>

                    {/* Page Size Selector */}
                    <div className="flex items-center gap-2 py-1.5 rounded-lg">
                        <Settings className="w-4 h-4 text-gray-400" />
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="text-xs text-gray-600 bg-transparent outline-none cursor-pointer hover:text-gray-800"
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>
                                    {size} rows per page
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Clear All Filters Button */}
                    {hasFilters && (
                        <button
                            onClick={onClearAllFilters}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                            title="Clear all filters"
                        >
                            <FilterX className="w-4 h-4 text-red-600" />
                            <span className="text-xs text-red-600">Clear Filters</span>
                        </button>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default StockDataHeader;