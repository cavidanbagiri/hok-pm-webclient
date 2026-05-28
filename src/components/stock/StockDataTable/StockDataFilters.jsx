import React from 'react';
import { FilterX } from 'lucide-react';
import ExcelFilter from './ExcelFilter';

const StockDataFilters = ({ 
    columns, 
    visibleColumns, 
    filters, 
    onFilterChange, 
    onClearFilter,
    onClearAllFilters,
    getUniqueValues 
}) => {
    const visibleFilterColumns = columns.filter(col => visibleColumns.includes(col.key));

    if (visibleFilterColumns.length === 0) return null;

    return (
        <thead className="bg-gray-50">
            <tr className="border-t border-gray-200">
                <th className="w-10 px-4 py-2">
                    {/* Clear all filters button */}
                    {Object.keys(filters).length > 0 && (
                        <button
                            onClick={onClearAllFilters}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Clear all filters"
                        >
                            <FilterX className="w-4 h-4" />
                        </button>
                    )}
                </th>
                {visibleFilterColumns.map((column) => (
                    <th key={`filter-${column.key}`} className="px-4 py-2 min-w-[120px]">
                        <ExcelFilter
                            column={column.key}
                            columnLabel={column.label}
                            value={filters[column.key] || ''}
                            options={getUniqueValues(column.key)}
                            onFilterChange={(value) => onFilterChange(column.key, value)}
                            onClear={() => onClearFilter(column.key)}
                        />
                    </th>
                ))}
                <th className="px-4 py-2 w-20"></th>
            </tr>
        </thead>
    );
};

export default StockDataFilters;