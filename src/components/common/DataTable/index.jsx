import React from 'react';
import DataTableHeader from './DataTableHeader';
import DataTableTabs from './DataTableTabs';
import DataTableBody from './DataTableBody';
import DataTablePagination from './DataTablePagination';
import ContextMenu from './ContextMenu';
import EditModal from './EditModal';
import ExcelFilter from './ExcelFilter';
import MessageBox from '../../../layouts/MessageBox';
import { useDataTable } from './useDataTable';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const DataTable = () => {
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

  const isLoading = loading[`fetch${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <DataTableHeader onRefresh={refreshData} />
      
      <DataTableTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="overflow-x-auto relative">
        <table className="min-w-full divide-y divide-gray-200" style={{ overflow: 'visible' }}>
          {/* Header Row with Sort */}
          <thead className="bg-gray-50">
            <tr>
              <th className="w-10 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ☰
              </th>
              {displayColumns.map((column) => (
                <th
                  key={column}
                  onClick={() => handleSort(column)}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    {column.replace(/_/g, ' ').toUpperCase()}
                    {getSortIcon(column) === 'unsorted' && <ArrowUpDown className="w-3 h-3 opacity-50" />}
                    {getSortIcon(column) === 'asc' && <ArrowUp className="w-3 h-3" />}
                    {getSortIcon(column) === 'desc' && <ArrowDown className="w-3 h-3" />}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Actions
              </th>
            </tr>
            
            {/* Filter Row */}
            <tr className="border-t border-gray-200">
              <th className="px-4 py-2"></th>
              {displayColumns.map((column) => (
                <th key={`filter-${column}`} className="px-4 py-2 relative">
                  <ExcelFilter
                    column={column}
                    value={filters[column] || ''}
                    options={getColumnOptions(column)}
                    onFilterChange={(value) => handleFilterChange(column, value)}
                    onClear={() => clearFilter(column)}
                  />
                </th>
              ))}
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          
          {/* Loading State */}
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={displayColumns.length + 2} className="px-4 py-20 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  </div>
                  <p className="mt-4 text-gray-500">Loading data...</p>
                </td>
              </tr>
            </tbody>
          ) : (
            <DataTableBody
              currentItems={currentItems}
              displayColumns={displayColumns}
              sortConfig={sortConfig}
              onSort={handleSort}
              getSortIcon={getSortIcon}
              onContextMenu={handleContextMenu}
              onEdit={handleEdit}
              currentTab={currentTab}
              indexOfFirstItem={indexOfFirstItem}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilter={clearFilter}
              getColumnOptions={getColumnOptions}
            />
          )}
        </table>
      </div>
      
      <DataTablePagination
        sortedData={sortedData}
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
        onPageChange={setCurrentPage}
      />
      
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          item={contextMenu.item}
          onClose={() => setContextMenu(null)}
          onEdit={() => handleEdit(contextMenu.item)}
          onView={() => console.log('View:', contextMenu.item)}
          onDelete={() => console.log('Delete:', contextMenu.item)}
          customActions={[
            { label: 'Go to MTF', icon: 'Package', onClick: () => console.log('MTF:', contextMenu.item) },
            { label: 'Go to Warehouse', icon: 'MapPin', onClick: () => console.log('Warehouse:', contextMenu.item) }
          ]}
        />
      )}
      
      {showEditModal && editingItem && (
        <EditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingItem(null);
          }}
          item={editingItem}
          tab={currentTab}
          onSubmit={handleUpdateSubmit}
        />
      )}
      
      {showMessage && localMessage.msg && (
        <MessageBox
          msg={localMessage.msg}
          cond={localMessage.cond}
          onClose={() => setShowMessage(false)}
          autoClose={true}
          duration={3000}
        />
      )}
    </div>
  );
};

export default DataTable;