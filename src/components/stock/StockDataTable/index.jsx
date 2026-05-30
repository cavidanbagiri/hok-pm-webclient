

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Database } from 'lucide-react';
import StockDataHeader from './StockDataHeader';
import StockDataTabs from './StockDataTabs';
import StockDataFilters from './StockDataFilters';
import StockDataBody from './StockDataBody';
import StockDataPagination from './StockDataPagination';
import ContextMenu from './ContextMenu';
import EditModal from './EditModal';
import CreateTypeModal from './CreateTypeModal';
import CreateStockModal from './CreateStockModal';
import MessageBox from '../../../layouts/MessageBox';
import { useStockData } from './useStockData';
import { useSelector } from 'react-redux';
import { selectStockMessage, clearMessage, createType, fetchType, createStock, fetchStockData, fetchUniqueValues } from '../../../stores/stock_slice';

const StockDataTable = () => {
    const dispatch = useDispatch();
    const [showCreateTypeModal, setShowCreateTypeModal] = useState(false);
    const [creatingType, setCreatingType] = useState(false);

    const [showCreateStockModal, setShowCreateStockModal] = useState(false);
    const [creatingStock, setCreatingStock] = useState(false);
    
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
        uniqueValues,
        typeData,
        typesWithoutStock,
        fetchTypesWithoutStock,
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

    const typeOptions = typeData;

    React.useEffect(() => {
        if (message) {
            setLocalMessage({ msg: message, cond });
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                dispatch(clearMessage());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, cond, dispatch]);

    const isLoading = activeTab === 'stock' 
        ? loading.fetchStockData 
        : loading.fetchType;
    
    const hasFilters = Object.keys(filters).length > 0;

    // Handle Create Type
    const handleCreateType = async (formData) => {
        setCreatingType(true);
        try {
            await dispatch(createType(formData)).unwrap();
            
            // Refresh type data
            const params = { page: currentPage, limit: pageSize, ...filters };
            await dispatch(fetchType(params));
            
            // Close modal
            setShowCreateTypeModal(false);
        } catch (error) {
            console.error('Create type failed:', error);
        } finally {
            setCreatingType(false);
        }
    };

    // Add handler
    const handleCreateStock = async (formData) => {
        setCreatingStock(true);
        try {
            await dispatch(createStock(formData)).unwrap();
            
            // Refresh stock data
            const params = { page: currentPage, limit: pageSize, ...filters };
            await dispatch(fetchStockData(params));
            
            // Refresh unique values to include new stock code
            await dispatch(fetchUniqueValues(null));
            
            // Close modal
            setShowCreateStockModal(false);
        } catch (error) {
            console.error('Create stock failed:', error);
        } finally {
            setCreatingStock(false);
        }
    };

    const handleOpenCreateStockModal = () => {
        console.log("here is callaed")
        dispatch(fetchTypesWithoutStock());
        setShowCreateStockModal(true);
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
                      <div className='py-6 px-6 '>
                 <div className="flex items-center gap-2">
                     <Database className="w-6 h-6 text-blue-500" />
                     <h2 className="text-4xl font-bold text-gray-800" style={{ "fontFamily": "Inter" }}>
                         Stock & Type Management
                     </h2>
                 </div>
                 {/* <p className="text-gray-500 mt-1">
                     Manage {activeTab === 'stock' ? 'stock inventory' : 'item types'} with advanced filtering
                 </p> */}
             </div>
            <StockDataPagination
                pagination={pagination}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />

            <StockDataHeader 
                onRefresh={refreshData}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                onToggleColumnMenu={() => setShowColumnMenu(!showColumnMenu)}
                onClearAllFilters={clearAllFilters}
                hasFilters={hasFilters}
                showColumnMenu={showColumnMenu}
                currentColumns={currentColumns}
                currentVisibleColumns={currentVisibleColumns}
                toggleColumn={toggleColumn}
                onCreateType={() => setShowCreateTypeModal(true)} 
                // onCreateStock={() => setShowCreateStockModal(true)}
                onCreateStock={handleOpenCreateStockModal}  // Changed this line
            />
            
            <StockDataTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
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
                    
                    <StockDataFilters
                        columns={currentColumns}
                        visibleColumns={currentVisibleColumns}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilter={clearFilter}
                        onClearAllFilters={clearAllFilters}
                        getUniqueValues={getUniqueValues}
                    />
                    
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
                    uniqueValues={uniqueValues} 
                    typeOptions={typeOptions}
                />
            )}
            
            {/* Create Type Modal */}
            <CreateTypeModal
                isOpen={showCreateTypeModal}
                onClose={() => setShowCreateTypeModal(false)}
                onSubmit={handleCreateType}
                uniqueValues={uniqueValues}
                loading={creatingType}
            />

            <CreateStockModal
                isOpen={showCreateStockModal}
                onClose={() => setShowCreateStockModal(false)}
                onSubmit={handleCreateStock}
                uniqueValues={uniqueValues}
                typesWithoutStock={typesWithoutStock}
                loading={creatingStock}
            />
            
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










// import React, {useState} from 'react';
// import StockDataHeader from './StockDataHeader';
// import StockDataTabs from './StockDataTabs';
// import StockDataFilters from './StockDataFilters';
// import StockDataBody from './StockDataBody';
// import StockDataPagination from './StockDataPagination';
// import ContextMenu from './ContextMenu';
// import EditModal from './EditModal';
// import ColumnVisibilityMenu from './ColumnVisibilityMenu';
// import CreateTypeModal from './CreateTypeModal';
// import MessageBox from '../../../layouts/MessageBox';
// import { useStockData } from './useStockData';
// import { useSelector } from 'react-redux';
// // import { selectStockMessage } from '../../../stores/stock_slice';
// import { selectStockMessage, clearMessage, createType, fetchType } from '../../../stores/stock_slice';

// import { Database } from 'lucide-react';

// const StockDataTable = () => {
//     const {
//         activeTab,
//         filters,
//         currentPage,
//         pageSize,
//         contextMenu,
//         editingItem,
//         showEditModal,
//         showColumnMenu,
//         currentData,
//         pagination,
//         currentColumns,
//         currentVisibleColumns,
//         loading,
//         uniqueValues,
//         setActiveTab,
//         setContextMenu,
//         setShowEditModal,
//         setEditingItem,
//         setShowColumnMenu,
//         handleFilterChange,
//         clearFilter,
//         clearAllFilters,
//         handlePageChange,
//         handlePageSizeChange,
//         handleEdit,
//         handleUpdateSubmit,
//         toggleColumn,
//         refreshData,
//         getUniqueValues,
//         getNestedValue,
//         loading: { fetchUniqueValues: loadingUniqueValues }
//     } = useStockData();

//     const { message, cond } = useSelector(selectStockMessage);
//     const [showMessage, setShowMessage] = React.useState(false);
//     const [localMessage, setLocalMessage] = React.useState({ msg: '', cond: '' });
//     const [showCreateTypeModal, setShowCreateTypeModal] = useState(false);
//     const [creatingType, setCreatingType] = useState(false);

//     React.useEffect(() => {
//         if (message) {
//             setLocalMessage({ msg: message, cond });
//             setShowMessage(true);
//             const timer = setTimeout(() => {
//                 setShowMessage(false);
//             }, 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [message, cond]);

//     const isLoading = activeTab === 'stock'
//         ? loading.fetchStockData
//         : loading.fetchType;

//     const hasFilters = Object.keys(filters).length > 0;

//     // Handle Create Type
//     const handleCreateType = async (formData) => {
//         setCreatingType(true);
//         try {
//             await dispatch(createType(formData)).unwrap();
            
//             // Refresh type data
//             const params = { page: currentPage, limit: pageSize, ...filters };
//             await dispatch(fetchType(params));
            
//             // Close modal
//             setShowCreateTypeModal(false);
//         } catch (error) {
//             console.error('Create type failed:', error);
//         } finally {
//             setCreatingType(false);
//         }
//     };

//     return (
//         <div className="w-full bg-white shadow-xl overflow-hidden relative">

//             <div className='py-6 px-6 '>
//                 <div className="flex items-center gap-2">
//                     <Database className="w-6 h-6 text-blue-500" />
//                     <h2 className="text-4xl font-bold text-gray-800" style={{ "fontFamily": "Inter" }}>
//                         Stock & Type Management
//                     </h2>
//                 </div>
//                 {/* <p className="text-gray-500 mt-1">
//                     Manage {activeTab === 'stock' ? 'stock inventory' : 'item types'} with advanced filtering
//                 </p> */}
//             </div>

//             <StockDataTabs activeTab={activeTab} onTabChange={setActiveTab} />


//             <StockDataPagination
//                 pagination={pagination}
//                 currentPage={currentPage}
//                 pageSize={pageSize}
//                 onPageChange={handlePageChange}
//             />



//             <StockDataHeader
//                 onRefresh={refreshData}
//                 pageSize={pageSize}
//                 onPageSizeChange={handlePageSizeChange}
//                 onToggleColumnMenu={() => setShowColumnMenu(!showColumnMenu)}
//                 onClearAllFilters={clearAllFilters}
//                 activeTab={activeTab}
//                 hasFilters={hasFilters}
//                 showColumnMenu={showColumnMenu}           // Add this
//                 currentColumns={currentColumns}           // Add this
//                 currentVisibleColumns={currentVisibleColumns} // Add this
//                 toggleColumn={toggleColumn}               // Add this
//             />


//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     {/* Header Row with Column Labels */}
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="w-10 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 ☰
//                             </th>
//                             {currentColumns
//                                 .filter(col => currentVisibleColumns.includes(col.key))
//                                 .map((column) => (
//                                     <th
//                                         key={column.key}
//                                         className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap"
//                                     >
//                                         {column.label}
//                                     </th>
//                                 ))}
//                             <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
//                                 Actions
//                             </th>
//                         </tr>
//                     </thead>

//                     {/* Filter Row */}
//                     <StockDataFilters
//                         columns={currentColumns}
//                         visibleColumns={currentVisibleColumns}
//                         filters={filters}
//                         onFilterChange={handleFilterChange}
//                         onClearFilter={clearFilter}
//                         onClearAllFilters={clearAllFilters}
//                         getUniqueValues={getUniqueValues}
//                     />

//                     {/* Body */}
//                     <StockDataBody
//                         data={currentData}
//                         columns={currentColumns}
//                         visibleColumns={currentVisibleColumns}
//                         loading={isLoading}
//                         onContextMenu={(e, item) => setContextMenu({ x: e.clientX, y: e.clientY, item })}
//                         onEdit={handleEdit}
//                         activeTab={activeTab}
//                         getNestedValue={getNestedValue}
//                     />
//                 </table>
//             </div>

//             <StockDataPagination
//                 pagination={pagination}
//                 currentPage={currentPage}
//                 pageSize={pageSize}
//                 onPageChange={handlePageChange}
//             />

//             {contextMenu && (
//                 <ContextMenu
//                     x={contextMenu.x}
//                     y={contextMenu.y}
//                     item={contextMenu.item}
//                     onClose={() => setContextMenu(null)}
//                     onEdit={() => handleEdit(contextMenu.item)}
//                     onView={() => console.log('View:', contextMenu.item)}
//                     onDelete={() => console.log('Delete:', contextMenu.item)}
//                     customActions={[
//                         { label: 'Go to MTF', icon: 'Package', onClick: () => console.log('MTF:', contextMenu.item) },
//                         { label: 'Go to Warehouse', icon: 'MapPin', onClick: () => console.log('Warehouse:', contextMenu.item) }
//                     ]}
//                 />
//             )}

//             {showEditModal && editingItem && (
//                 <EditModal
//                     isOpen={showEditModal}
//                     onClose={() => {
//                         setShowEditModal(false);
//                         setEditingItem(null);
//                     }}
//                     item={editingItem}
//                     activeTab={activeTab}
//                     onSubmit={handleUpdateSubmit}
//                 />
//             )}

//             {/* Create Type Modal */}
//             <CreateTypeModal
//                 isOpen={showCreateTypeModal}
//                 onClose={() => setShowCreateTypeModal(false)}
//                 onSubmit={handleCreateType}
//                 uniqueValues={uniqueValues}
//                 loading={creatingType}
//             />

//             {showMessage && localMessage.msg && (
//                 <MessageBox
//                     msg={localMessage.msg}
//                     cond={localMessage.cond}
//                     onClose={() => setShowMessage(false)}
//                     autoClose={true}
//                     duration={3000}
//                 />
//             )}
//         </div>
//     );
// };

// export default StockDataTable;