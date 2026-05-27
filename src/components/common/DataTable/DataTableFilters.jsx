import React from 'react';
import { Search, X } from 'lucide-react';
import ExcelFilter from './ExcelFilter';

const DataTableFilters = ({ 
  displayColumns, 
  filters, 
  onFilterChange, 
  onClearFilter,
  getColumnOptions,
  currentData 
}) => {
  return (
    <thead className="bg-gray-50">
      <tr className="border-t border-gray-200">
        <th className="w-10 px-4 py-2"></th>
        {displayColumns.map((column) => (
          <th key={`filter-${column}`} className="px-4 py-2">
            <ExcelFilter
              column={column}
              value={filters[column] || ''}
              options={getColumnOptions(column)}
              onFilterChange={(value) => onFilterChange(column, value)}
              onClear={() => onClearFilter(column)}
            />
          </th>
        ))}
        <th className="px-4 py-2 w-20"></th>
      </tr>
    </thead>
  );
};

export default DataTableFilters;