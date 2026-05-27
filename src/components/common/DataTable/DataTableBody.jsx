import React from 'react';
import { MoreVertical, Edit, Trash2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const DataTableBody = ({ 
  currentItems, 
  displayColumns, 
  sortConfig, 
  onSort, 
  getSortIcon,
  onContextMenu,
  onEdit,
  currentTab,
  indexOfFirstItem,
  filters,
  onFilterChange,
  onClearFilter,
  getColumnOptions
}) => {
  const getSortIconComponent = (field) => {
    const iconType = getSortIcon(field);
    if (iconType === 'unsorted') return <ArrowUpDown className="w-3 h-3 opacity-50" />;
    return iconType === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-50 text-blue-600',
      green: 'border-green-500 bg-green-50 text-green-600',
      purple: 'border-purple-500 bg-purple-50 text-purple-600',
      orange: 'border-orange-500 bg-orange-50 text-orange-600',
      pink: 'border-pink-500 bg-pink-50 text-pink-600',
      indigo: 'border-indigo-500 bg-indigo-50 text-indigo-600',
      teal: 'border-teal-500 bg-teal-50 text-teal-600',
      red: 'border-red-500 bg-red-50 text-red-600',
      yellow: 'border-yellow-500 bg-yellow-50 text-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  if (currentItems.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={displayColumns.length + 2} className="px-4 py-12 text-center">
            <div className={`inline-flex p-4 rounded-full ${getColorClasses(currentTab?.color)}`}>
              {currentTab?.icon && React.createElement(currentTab.icon, { className: "w-8 h-8" })}
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No data found</h3>
            <p className="mt-1 text-gray-500">No records available</p>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {currentItems.map((item, idx) => (
        <tr
          key={item.id}
          className="hover:bg-gray-50 transition-colors cursor-context-menu"
          onContextMenu={(e) => onContextMenu(e, item)}
        >
          <td className="px-4 py-3 whitespace-nowrap text-center">
            <button
              onClick={(e) => onContextMenu(e, item)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </td>
          
          {displayColumns.map((column) => (
            <td key={column} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
              {item[column] !== null && item[column] !== undefined ? item[column] : '-'}
            </td>
          ))}
          
          <td className="px-4 py-3 whitespace-nowrap text-center">
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => onEdit(item)}
                className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default DataTableBody;