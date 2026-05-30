import React from 'react';
import ExcelFilter from './ExcelFilter';

const StockDataFilters = ({ 
    columns, 
    visibleColumns, 
    filters, 
    onFilterChange, 
    onClearFilter,
    getCurrentUniqueValues,
    isFiltering 
}) => {
    const visibleFilterColumns = columns.filter(col => visibleColumns.includes(col.key));

    if (visibleFilterColumns.length === 0) return null;

    const currentUniqueValues = getCurrentUniqueValues();

    return (
        <thead className="bg-gray-50">
            <tr className="border-t border-gray-200">
                <th className="w-10 px-4 py-2"></th>
                {visibleFilterColumns.map((column) => (
                    <th key={`filter-${column.key}`} className="px-4 py-2 min-w-[120px]">
                        <ExcelFilter
                            column={column.key}
                            columnLabel={column.label}
                            value={filters[column.key] || ''}
                            // options={(currentUniqueValues?.[getValueKey(column.key)] || []).map(item => 
                            //     typeof item === 'string' ? { id: item, name: item } : item
                            // )}
                            options={getOptionsForColumn(column.key, currentUniqueValues)}
                            onFilterChange={(value) => onFilterChange(column.key, value)}
                            onClear={() => onClearFilter(column.key)}
                            loading={isFiltering}
                        />
                    </th>
                ))}
                <th className="px-4 py-2 w-20"></th>
            </tr>
        </thead>
    );
};

// Helper function to map column key to unique values key
const getValueKey = (columnKey) => {
    const mapping = {
        // Type tab fields
        'type_name': 'item_types',
        'subtype_name': 'subtypes',
        'size1_name': 'size1',
        'size2_name': 'size2',
        'material_name': 'materials',
        'description_name': 'descriptions',
        'thickness_1': 'thickness',
        'thickness_2': 'thickness',
        
        // Stock tab fields - these come from stock_codes array
        'stock_code': 'stock_codes',
        'alternative_id': 'stock_codes',
        'old_code': 'stock_codes',
        'comment': 'stock_codes',
        'uom_name': 'uoms',
    };
    return mapping[columnKey] || columnKey;
};

// Also need to extract the specific field from stock_codes objects
const getOptionsForColumn = (columnKey, currentUniqueValues) => {
    const valueKey = getValueKey(columnKey);
    const rawOptions = currentUniqueValues?.[valueKey] || [];
    
    if (rawOptions.length === 0) return [];
    
    // For stock_codes, extract the specific field
    if (valueKey === 'stock_codes') {
        return rawOptions.map(item => ({
            id: item.id,
            name: item[columnKey] || item.name || ''
        })).filter(opt => opt.name);
    }
    
    // For other fields, handle strings or objects
    return rawOptions.map(item => 
        typeof item === 'string' ? { id: item, name: item } : item
    );
};

export default StockDataFilters;