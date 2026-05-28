import React from 'react';
import StockDataHeader from './StockDataHeader';
import StockDataTabs from './StockDataTabs';
import StockDataFilters from './StockDataFilters';
import StockDataBody from './StockDataBody';
import StockDataPagination from './StockDataPagination';
import ContextMenu from './ContextMenu';
import EditModal from './EditModal';
import ColumnVisibilityMenu from './ColumnVisibilityMenu';
import MessageBox from '../../../layouts/MessageBox';
import { useStockData } from './useStockData';
import { useSelector } from 'react-redux';
import { selectStockMessage } from '../../../stores/stock_slice';

const StockDataTable = () => {
    const {
        activeTab,
        filters,
        currentPage,
        pageSize,
        contextMenu,
        editingItem,
        showEditModal,
        showColumnMenu,
        currentData,
        pagination,
        currentColumns,
        currentVisibleColumns,
        loading,
        setActiveTab,
        setContextMenu,
        setShowEditModal,
        setEditingItem,
        setShowColumnMenu,
        handleFilterChange,
        clearFilter,
        clearAllFilters,
        handlePageChange,
        handlePageSizeChange,
        handleEdit,
        handleUpdateSubmit,
        toggleColumn,
        refreshData,
        getUniqueValues,
        getNestedValue,
    } = useStockData();

    const { message, cond } = useSelector(selectStockMessage);
    const [showMessage, setShowMessage] = React.useState(false);
    const [localMessage, setLocalMessage] = React.useState({ msg: '', cond: '' });

    React.useEffect(() => {
        if (message) {
            setLocalMessage({ msg: message, cond });
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, cond]);

    const isLoading = activeTab === 'stock' 
        ? loading.fetchStockData 
        : loading.fetchType;
    
    const hasFilters = Object.keys(filters).length > 0;

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
            <StockDataHeader 
                onRefresh={refreshData}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                onToggleColumnMenu={() => setShowColumnMenu(!showColumnMenu)}
                onClearAllFilters={clearAllFilters}
                activeTab={activeTab}
                hasFilters={hasFilters}
            />
            
            <StockDataTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {showColumnMenu && (
                <ColumnVisibilityMenu
                    columns={currentColumns}
                    visibleColumns={currentVisibleColumns}
                    onToggleColumn={toggleColumn}
                    onClose={() => setShowColumnMenu(false)}
                />
            )}
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Header Row with Column Labels */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="w-10 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ☰
                            </th>
                            {currentColumns
                                .filter(col => currentVisibleColumns.includes(col.key))
                                .map((column) => (
                                    <th 
                                        key={column.key} 
                                        className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    
                    {/* Filter Row */}
                    <StockDataFilters
                        columns={currentColumns}
                        visibleColumns={currentVisibleColumns}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilter={clearFilter}
                        onClearAllFilters={clearAllFilters}
                        getUniqueValues={getUniqueValues}
                    />
                    
                    {/* Body */}
                    <StockDataBody
                        data={currentData}
                        columns={currentColumns}
                        visibleColumns={currentVisibleColumns}
                        loading={isLoading}
                        onContextMenu={(e, item) => setContextMenu({ x: e.clientX, y: e.clientY, item })}
                        onEdit={handleEdit}
                        activeTab={activeTab}
                        getNestedValue={getNestedValue}
                    />
                </table>
            </div>
            
            <StockDataPagination
                pagination={pagination}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
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
                    activeTab={activeTab}
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

export default StockDataTable;