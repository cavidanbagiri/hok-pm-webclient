import React from 'react';
import { RefreshCw } from 'lucide-react';

import { useDataTable } from './useDataTable';
import DataTablePagination from './DataTablePagination';

const DataTableHeader = ({ onRefresh }) => {
  const {
    // State
    activeTab,
    currentPage,
    filters,
    sortConfig,
    contextMenu,
    showEditModal,
    editingItem,
    showMessage,
    localMessage,

    // Data
    tabs,
    currentTab,
    displayColumns,
    processedData,
    filteredData,
    sortedData,
    currentItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    loading,

    // Actions
    setActiveTab,
    setCurrentPage,
    setFilters,
    setSortConfig,
    setContextMenu,
    setShowEditModal,
    setEditingItem,
    setShowMessage,
    setLocalMessage,
    handleSort,
    handleFilterChange,
    clearFilter,
    handleContextMenu,
    handleEdit,
    handleUpdateSubmit,
    refreshData,
    getSortIcon,
    getColumnOptions
  } = useDataTable();
  return (
    <div className="flex justify-end border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white p-1">
      <div className="flex items-center bg-gradient-to-r from-gray-50 to-white rounded-xl">
        <button
          onClick={onRefresh}
          className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
          <span className='pl-3 text-sm'>Refresh Table</span>
        </button>
      </div>
    </div>
  );
};

export default DataTableHeader;