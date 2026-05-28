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

import { Database } from 'lucide-react';

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
        <div className="w-full bg-white shadow-xl overflow-hidden relative">
            
            <div className='py-6 px-6 '>
                <div className="flex items-center gap-2">
                    <Database className="w-6 h-6 text-blue-500" />
                    <h2 className="text-4xl font-bold text-gray-800" style={{"fontFamily":"Inter"}}>
                        Stock & Type Management
                    </h2>
                </div>
                {/* <p className="text-gray-500 mt-1">
                    Manage {activeTab === 'stock' ? 'stock inventory' : 'item types'} with advanced filtering
                </p> */}
            </div>
            
            <StockDataTabs activeTab={activeTab} onTabChange={setActiveTab} />


             <StockDataPagination
                pagination={pagination}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
            
            {/* <StockDataHeader 
                onRefresh={refreshData}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                onToggleColumnMenu={() => setShowColumnMenu(!showColumnMenu)}
                onClearAllFilters={clearAllFilters}
                activeTab={activeTab}
                hasFilters={hasFilters}
            /> */}

<StockDataHeader 
    onRefresh={refreshData}
    pageSize={pageSize}
    onPageSizeChange={handlePageSizeChange}
    onToggleColumnMenu={() => setShowColumnMenu(!showColumnMenu)}
    onClearAllFilters={clearAllFilters}
    activeTab={activeTab}
    hasFilters={hasFilters}
    showColumnMenu={showColumnMenu}           // Add this
    currentColumns={currentColumns}           // Add this
    currentVisibleColumns={currentVisibleColumns} // Add this
    toggleColumn={toggleColumn}               // Add this
/>
            
            {/* {showColumnMenu && (
                <ColumnVisibilityMenu
                    columns={currentColumns}
                    visibleColumns={currentVisibleColumns}
                    onToggleColumn={toggleColumn}
                    onClose={() => setShowColumnMenu(false)}
                />
            )} */}
            
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