import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchStockData, 
    fetchType, 
    updateStock, 
    updateType,
    fetchUniqueValues,
    fetchFilteredUniqueValues,
    selectStockData,
    selectStockPagination,
    selectTypeData,
    selectTypePagination,
    selectStockLoading,
    selectAllUniqueValues,
    selectFilteredUniqueValues,
    clearFilteredUniqueValues 
} from '../../../stores/stock_slice';

export const useStockData = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('stock');
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [contextMenu, setContextMenu] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);

    // Selectors
    const stockData = useSelector(selectStockData);
    const stockPagination = useSelector(selectStockPagination);
    const typeData = useSelector(selectTypeData);
    const typePagination = useSelector(selectTypePagination);
    const loading = useSelector(selectStockLoading);
    const allUniqueValues = useSelector(selectAllUniqueValues);
    const filteredUniqueValues = useSelector(selectFilteredUniqueValues);

    // Column definitions
    const stockColumns = [
        { key: 'id', label: 'ID', visible: false, type: 'number' },
        { key: 'stock_code', label: 'Stock Code', visible: true, type: 'text' },
        { key: 'type_name', label: 'Type Name', visible: true, type: 'text' },
        { key: 'subtype_name', label: 'Subtype', visible: true, type: 'text' },
        { key: 'size1_name', label: 'Size 1', visible: true, type: 'text' },
        { key: 'size2_name', label: 'Size 2', visible: true, type: 'text' },
        { key: 'material_name', label: 'Material', visible: false, type: 'text' },
        { key: 'description_name', label: 'Description', visible: false, type: 'text' },
        { key: 'thickness_1', label: 'Thickness 1', visible: true, type: 'text' },
        { key: 'thickness_2', label: 'Thickness 2', visible: true, type: 'text' },
        { key: 'uom_name', label: 'UOM', visible: true, type: 'text' },
        { key: 'alternative_id', label: 'Alternative ID', visible: false, type: 'text' },
        { key: 'old_code', label: 'Old Code', visible: false, type: 'text' },
        { key: 'comment', label: 'Comment', visible: false, type: 'text' },
    ];

    const typeColumns = [
        { key: 'id', label: 'ID', visible: true, type: 'number' },
        { key: 'type_name', label: 'Type Name', visible: true, type: 'text' },
        { key: 'subtype_name', label: 'Subtype', visible: true, type: 'text' },
        { key: 'size1_name', label: 'Size 1', visible: true, type: 'text' },
        { key: 'size2_name', label: 'Size 2', visible: true, type: 'text' },
        { key: 'material_name', label: 'Material', visible: true, type: 'text' },
        { key: 'description_name', label: 'Description', visible: false, type: 'text' },
        { key: 'thickness_1', label: 'Thickness 1', visible: true, type: 'text' },
        { key: 'thickness_2', label: 'Thickness 2', visible: true, type: 'text' },
    ];

    const [visibleColumns, setVisibleColumns] = useState({
        stock: stockColumns.filter(c => c.visible).map(c => c.key),
        type: typeColumns.filter(c => c.visible).map(c => c.key)
    });

    // Helper function to get nested value
    const getNestedValue = (item, columnKey) => {
        if (columnKey === 'type_name') {
            return item.item_type?.type?.name || item.type?.name || '-';
        }
        if (columnKey === 'subtype_name') {
            return item.item_type?.subtype?.name || item.subtype?.name || '-';
        }
        if (columnKey === 'size1_name') {
            return item.item_type?.size1?.name || item.size1?.name || '-';
        }
        if (columnKey === 'size2_name') {
            return item.item_type?.size2?.name || item.size2?.name || '-';
        }
        if (columnKey === 'material_name') {
            return item.item_type?.material?.name || item.material?.name || '-';
        }
        if (columnKey === 'description_name') {
            return item.item_type?.description?.name || item.description?.name || '-';
        }
        if (columnKey === 'thickness_1') {
            return item.item_type?.thickness_1 || item.thickness_1 || '-';
        }
        if (columnKey === 'thickness_2') {
            return item.item_type?.thickness_2 || item.thickness_2 || '-';
        }
        if (columnKey === 'uom_name') {
            return item.uom?.name || '-';
        }
        return item[columnKey] !== null && item[columnKey] !== undefined ? item[columnKey] : '-';
    };

    // ========== DATA FETCHING ==========
    // Fetch all unique values on component mount
    useEffect(() => {
        if (!allUniqueValues) {
            dispatch(fetchUniqueValues(null));
        }
    }, [dispatch, allUniqueValues]);

    // UPDATE 5: Fetch data when filters or page changes
    useEffect(() => {
        const fetchData = async () => {
            const params = {
                page: currentPage,
                limit: pageSize,
                ...filters
            };
            
            if (activeTab === 'stock') {
                await dispatch(fetchStockData(params));
            } else {
                await dispatch(fetchType(params));
            }
        };
        
        fetchData();
    }, [activeTab, filters, currentPage, pageSize, dispatch]);

    // // UPDATE 6: Fetch filtered unique values when filters change
    // const updateFilteredUniqueValues = useCallback(async (currentFilters) => {
    //     const hasActiveFilters = Object.keys(currentFilters).length > 0;
        
    //     if (hasActiveFilters) {
    //         setIsFiltering(true);
    //         await dispatch(fetchFilteredUniqueValues(currentFilters));
    //         setIsFiltering(false);
    //     }
    //     // If no filters, filteredUniqueValues will be null and we use allUniqueValues
    // }, [dispatch]);

    
    const updateFilteredUniqueValues = useCallback(async (currentFilters) => {
        const hasActiveFilters = Object.keys(currentFilters).length > 0;
        
        if (hasActiveFilters) {
            setIsFiltering(true);
            await dispatch(fetchFilteredUniqueValues(currentFilters));
            setIsFiltering(false);
        } else {
            // No filters - clear filtered values
            dispatch(clearFilteredUniqueValues());
        }
    }, [dispatch]);

    const clearAllFilters = useCallback(() => {
        setFilters({});
        setCurrentPage(1);
        
        // Clear filtered unique values and fetch all
        dispatch(clearFilteredUniqueValues());
        dispatch(fetchUniqueValues(null));
    }, [dispatch]);

    // ========== FILTER HANDLERS ==========
    // Simplified handleFilterChange - no hierarchy clearing
    const handleFilterChange = useCallback((field, value) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            if (value && value !== '') {
                newFilters[field] = value;
            } else {
                delete newFilters[field];
            }
            return newFilters;
        });
        setCurrentPage(1);
        
        // Fetch filtered unique values for dropdowns
        const currentFilters = { ...filters, [field]: value };
        Object.keys(currentFilters).forEach(key => {
            if (!currentFilters[key] || currentFilters[key] === '') {
                delete currentFilters[key];
            }
        });
        updateFilteredUniqueValues(currentFilters);
    }, [filters, updateFilteredUniqueValues]);

    // const clearFilter = (field) => {
    //     setFilters(prev => {
    //         const newFilters = { ...prev };
    //         delete newFilters[field];
    //         return newFilters;
    //     });
    //     setCurrentPage(1);
        
    //     // Update unique values after clearing
    //     const remainingFilters = { ...filters };
    //     delete remainingFilters[field];
    //     updateFilteredUniqueValues(remainingFilters);
    // };

    // const clearAllFilters = useCallback(() => {
    //     setFilters({});
    //     setCurrentPage(1);
    //     updateFilteredUniqueValues({});
    // }, [updateFilteredUniqueValues]);


    const clearFilter = (field) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[field];
            return newFilters;
        });
        setCurrentPage(1);
        
        const remainingFilters = { ...filters };
        delete remainingFilters[field];
        
        if (Object.keys(remainingFilters).length === 0) {
            // No filters left - clear filtered and fetch all
            dispatch(clearFilteredUniqueValues());
            dispatch(fetchUniqueValues(null));
        } else {
            // Still have filters - fetch filtered unique values
            updateFilteredUniqueValues(remainingFilters);
        }
    };


    // ========== PAGINATION ==========
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    // ========== EDIT HANDLERS ==========
    const handleEdit = (item) => {
        setEditingItem(item);
        setShowEditModal(true);
    };

    const handleUpdateSubmit = async (formData) => {
        try {
            if (activeTab === 'stock') {
                await dispatch(updateStock({ id: editingItem.id, data: formData })).unwrap();
            } else {
                await dispatch(updateType({ id: editingItem.id, data: formData })).unwrap();
            }
            
            // Refresh data
            const params = { page: currentPage, limit: pageSize, ...filters };
            if (activeTab === 'stock') {
                await dispatch(fetchStockData(params));
            } else {
                await dispatch(fetchType(params));
            }
            
            setShowEditModal(false);
            setEditingItem(null);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    // ========== UI HELPERS ==========
    const getCurrentData = () => {
        return activeTab === 'stock' ? stockData : typeData;
    };

    const getCurrentPagination = () => {
        return activeTab === 'stock' ? stockPagination : typePagination;
    };

    const getCurrentColumns = () => {
        return activeTab === 'stock' ? stockColumns : typeColumns;
    };

    const getCurrentVisibleColumns = () => {
        return visibleColumns[activeTab];
    };

    const getCurrentUniqueValues = useCallback(() => {
        return filteredUniqueValues || allUniqueValues;
    }, [filteredUniqueValues, allUniqueValues]);

    const toggleColumn = (columnKey) => {
        const currentVisible = [...visibleColumns[activeTab]];
        if (currentVisible.includes(columnKey)) {
            setVisibleColumns(prev => ({
                ...prev,
                [activeTab]: currentVisible.filter(k => k !== columnKey)
            }));
        } else {
            setVisibleColumns(prev => ({
                ...prev,
                [activeTab]: [...currentVisible, columnKey]
            }));
        }
    };

    const refreshData = () => {
        const params = { page: currentPage, limit: pageSize, ...filters };
        if (activeTab === 'stock') {
            dispatch(fetchStockData(params));
        } else {
            dispatch(fetchType(params));
        }
    };

    return {
        // State
        activeTab,
        filters,
        currentPage,
        pageSize,
        contextMenu,
        editingItem,
        showEditModal,
        showColumnMenu,
        isFiltering,
        currentData: getCurrentData(),
        pagination: getCurrentPagination(),
        currentColumns: getCurrentColumns(),
        currentVisibleColumns: getCurrentVisibleColumns(),
        loading,
        
        // Actions
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
        getCurrentUniqueValues,
        getNestedValue,
    };
};














// import { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchStockData,
//     fetchType,
//     updateStock,
//     updateType,
//     selectStockData,
//     selectStockPagination,
//     selectTypeData,
//     selectTypePagination,
//     selectStockLoading,
//     fetchUniqueValues,
//     selectUniqueValues,
//     fetchTypesWithoutStock,
//     selectTypesWithoutStock,
//     clearMessage,
//     fetchFilteredUniqueValues,
//     selectAllUniqueValues,
//     selectFilteredUniqueValues
// } from '../../../stores/stock_slice';

// export const useStockData = () => {
//     const dispatch = useDispatch();
//     const [activeTab, setActiveTab] = useState('stock');
//     const [filters, setFilters] = useState({});
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize, setPageSize] = useState(100);
//     const [contextMenu, setContextMenu] = useState(null);
//     const [editingItem, setEditingItem] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showColumnMenu, setShowColumnMenu] = useState(false);

//     // Column visibility state - initialize with all columns visible
//     const [visibleColumns, setVisibleColumns] = useState({
//         stock: ['stock_code', 'type_name', 'uom_name', 'subtype_name', 'size1_name', 'size2_name', 'thickness_1', 'thickness_2'],
//         type: ['type_name', 'subtype_name', 'size1_name', 'size2_name', 'thickness_1', 'thickness_2']
//     });

//     // Selectors
//     const stockData = useSelector(selectStockData);
//     const stockPagination = useSelector(selectStockPagination);
//     const typeData = useSelector(selectTypeData);
//     const typePagination = useSelector(selectTypePagination);
//     const loading = useSelector(selectStockLoading);
//     const typesWithoutStock = useSelector(selectTypesWithoutStock);


//     // Add to hook
//     // const uniqueValues = useSelector(selectUniqueValues);
//     const allUniqueValues = useSelector(selectAllUniqueValues);
//     const filteredUniqueValues = useSelector(selectFilteredUniqueValues);
//     const [activeFilters, setActiveFilters] = useState({});
//     const [isFiltering, setIsFiltering] = useState(false);



//     // ???????????????????????????????????????????????????????????????????????????


//     // Fetch all unique values on component mount
//     useEffect(() => {
//         if (!allUniqueValues) {
//             console.log('Fetching all unique values...');
//             dispatch(fetchUniqueValues(null));
//         } else {
//             console.log('All unique values loaded:', allUniqueValues);
//             console.log('Available keys:', Object.keys(allUniqueValues || {}));
//         }
//     }, [dispatch, allUniqueValues]);

//     // Fetch filtered unique values when filters change
//     const updateFilteredUniqueValues = useCallback(async (filters) => {
//         // Check if any filters have values
//         const hasActiveFilters = Object.values(filters).some(v => v && v !== '');

//         if (hasActiveFilters) {
//             setIsFiltering(true);
//             await dispatch(fetchFilteredUniqueValues(filters));
//             setIsFiltering(false);
//         } else {
//             // Clear filtered values when no filters
//             // We'll keep filteredUniqueValues null to use allUniqueValues
//         }
//     }, [dispatch]);

//     // Handle filter change with cascading
//     // const handleFilterChange = useCallback((field, value) => {
//     //     // Update active filters
//     //     const newFilters = { ...activeFilters, [field]: value };

//     //     // Remove empty filters
//     //     Object.keys(newFilters).forEach(key => {
//     //         if (!newFilters[key] || newFilters[key] === '') {
//     //             delete newFilters[key];
//     //         }
//     //     });

//     //     setActiveFilters(newFilters);

//     //     // Clear dependent filters when parent filter changes
//     //     // Example: When type changes, clear subtype, size1, size2, etc.
//     //     if (field === 'type_name') {
//     //         // Clear dependent filters
//     //         ['subtype_name', 'size1_name', 'size2_name', 'material_name', 'description_name', 'thickness_1', 'thickness_2'].forEach(depField => {
//     //             if (activeFilters[depField]) {
//     //                 setActiveFilters(prev => {
//     //                     const updated = { ...prev };
//     //                     delete updated[depField];
//     //                     return updated;
//     //                 });
//     //                 // Also clear the filter in parent component
//     //                 if (onFilterChange) {
//     //                     onFilterChange(depField, '');
//     //                 }
//     //             }
//     //         });
//     //     }

//     //     if (field === 'subtype_name') {
//     //         // Clear size1, size2, material, description, thickness when subtype changes
//     //         ['size1_name', 'size2_name', 'material_name', 'description_name', 'thickness_1', 'thickness_2'].forEach(depField => {
//     //             if (activeFilters[depField]) {
//     //                 setActiveFilters(prev => {
//     //                     const updated = { ...prev };
//     //                     delete updated[depField];
//     //                     return updated;
//     //                 });
//     //                 if (onFilterChange) {
//     //                     onFilterChange(depField, '');
//     //                 }
//     //             }
//     //         });
//     //     }

//     //     // Fetch filtered unique values
//     //     updateFilteredUniqueValues(newFilters);
//     // }, [activeFilters, updateFilteredUniqueValues]);


//     // Old Code
//     // const handleFilterChange = useCallback((field, value) => {
//     //     // Update active filters
//     //     const newFilters = { ...activeFilters, [field]: value };

//     //     // Remove empty filters
//     //     Object.keys(newFilters).forEach(key => {
//     //         if (!newFilters[key] || newFilters[key] === '') {
//     //             delete newFilters[key];
//     //         }
//     //     });

//     //     setActiveFilters(newFilters);

//     //     // IMPORTANT: Update the filters that will be sent to backend
//     //     // This triggers the useEffect above
//     //     setFilters(newFilters);  // ← This is the key line
//     //     setCurrentPage(1);       // Reset to first page

//     //     // Clear dependent filters when parent filter changes
//     //     if (field === 'type_name') {
//     //         ['subtype_name', 'size1_name', 'size2_name', 'material_name', 'description_name', 'thickness_1', 'thickness_2'].forEach(depField => {
//     //             if (activeFilters[depField]) {
//     //                 setActiveFilters(prev => {
//     //                     const updated = { ...prev };
//     //                     delete updated[depField];
//     //                     return updated;
//     //                 });
//     //                 // Also clear from the main filters
//     //                 setFilters(prev => {
//     //                     const updated = { ...prev };
//     //                     delete updated[depField];
//     //                     return updated;
//     //                 });
//     //             }
//     //         });
//     //     }

//     //     if (field === 'subtype_name') {
//     //         ['size1_name', 'size2_name', 'material_name', 'description_name', 'thickness_1', 'thickness_2'].forEach(depField => {
//     //             if (activeFilters[depField]) {
//     //                 setActiveFilters(prev => {
//     //                     const updated = { ...prev };
//     //                     delete updated[depField];
//     //                     return updated;
//     //                 });
//     //                 setFilters(prev => {
//     //                     const updated = { ...prev };
//     //                     delete updated[depField];
//     //                     return updated;
//     //                 });
//     //             }
//     //         });
//     //     }

//     //     // Fetch filtered unique values for dropdowns
//     //     updateFilteredUniqueValues(newFilters);
//     // }, [activeFilters, updateFilteredUniqueValues]);

//     //New Code
//     const handleFilterChange = useCallback((field, value) => {
//         // Update filters - no clearing of dependent fields
//         setFilters(prev => {
//             const newFilters = { ...prev };
//             if (value && value !== '') {
//                 newFilters[field] = value;
//             } else {
//                 delete newFilters[field];
//             }
//             return newFilters;
//         });
//         setCurrentPage(1);
        
//         // Fetch filtered unique values for dropdowns (backend handles the logic)
//         const currentFilters = { ...filters, [field]: value };
//         Object.keys(currentFilters).forEach(key => {
//             if (!currentFilters[key] || currentFilters[key] === '') {
//                 delete currentFilters[key];
//             }
//         });
//         updateFilteredUniqueValues(currentFilters);
//     }, [filters, updateFilteredUniqueValues]);


//     // Get current unique values (filtered or all)
//     // const getCurrentUniqueValues = useCallback(() => {
//     //     const hasActiveFilters = Object.values(activeFilters).some(v => v && v !== '');
//     //     if (hasActiveFilters && filteredUniqueValues) {
//     //         return filteredUniqueValues;
//     //     }
//     //     return allUniqueValues;
//     // }, [activeFilters, filteredUniqueValues, allUniqueValues]);

//     const getCurrentUniqueValues = useCallback(() => {
//         // Just return filtered if exists, otherwise all
//         return filteredUniqueValues || allUniqueValues;
//     }, [filteredUniqueValues, allUniqueValues]);

//     // Remove this line:
//     // const [activeFilters, setActiveFilters] = useState({});

//     // Update clearFilter:
//     const clearFilter = (field) => {
//         setFilters(prev => {
//             const newFilters = { ...prev };
//             delete newFilters[field];
//             return newFilters;
//         });
//         setCurrentPage(1);
        
//         // Update unique values after clearing
//         const remainingFilters = { ...filters };
//         delete remainingFilters[field];
//         updateFilteredUniqueValues(remainingFilters);
//     };

//     // Update clearAllFilters:
//     const clearAllFilters = useCallback(() => {
//         setFilters({});
//         setCurrentPage(1);
//         updateFilteredUniqueValues({});
//     }, [updateFilteredUniqueValues]);


//     // ???????????????????????????????????????????????????????????????????????????







//     // Column definitions with display labels
//     // Stock columns - these keys are used in getNestedValue above
//     const stockColumns = [
//         { key: 'id', label: 'ID', visible: true, type: 'number' },
//         { key: 'stock_code', label: 'Stock Code', visible: true, type: 'text' },
//         { key: 'type_name', label: 'Type Name', visible: true, type: 'text' },      // <- This calls getNestedValue
//         { key: 'subtype_name', label: 'Subtype', visible: true, type: 'text' },     // <- This calls getNestedValue
//         { key: 'size1_name', label: 'Size 1', visible: true, type: 'text' },        // <- This calls getNestedValue
//         { key: 'size2_name', label: 'Size 2', visible: true, type: 'text' },        // <- This calls getNestedValue
//         { key: 'thickness_1', label: 'Thickness 1', visible: true, type: 'text' },  // <- This calls getNestedValue
//         { key: 'thickness_2', label: 'Thickness 2', visible: true, type: 'text' },  // <- This calls getNestedValue
//         { key: 'uom_name', label: 'UOM', visible: true, type: 'text' },             // <- This calls getNestedValue
//         { key: 'material_name', label: 'Material', visible: true, type: 'text' },   // <- This calls getNestedValue
//         { key: 'description_name', label: 'Description', visible: true, type: 'text' }, // <- This calls getNestedValue
//         { key: 'alternative_id', label: 'Alternative ID', visible: true, type: 'text' },
//         { key: 'old_code', label: 'Old Code', visible: true, type: 'text' },
//         { key: 'comment', label: 'Comment', visible: true, type: 'text' },
//     ];

//     const typeColumns = [
//         { key: 'id', label: 'ID', visible: true, type: 'number' },
//         { key: 'type_name', label: 'Type Name', visible: true, type: 'text' },
//         { key: 'subtype_name', label: 'Subtype', visible: true, type: 'text' },
//         { key: 'size1_name', label: 'Size 1', visible: true, type: 'text' },
//         { key: 'size2_name', label: 'Size 2', visible: true, type: 'text' },
//         { key: 'material_name', label: 'Material', visible: true, type: 'text' },
//         { key: 'description_name', label: 'Description', visible: true, type: 'text' },
//         { key: 'thickness_1', label: 'Thickness 1', visible: true, type: 'text' },
//         { key: 'thickness_2', label: 'Thickness 2', visible: true, type: 'text' },
//     ];

//     const getNestedValue = (item, columnKey) => {
//         // Same as before - this remains unchanged
//         if (columnKey === 'type_name') {
//             return item.item_type?.type?.name || item.type?.name || '-';
//         }
//         if (columnKey === 'subtype_name') {
//             return item.item_type?.subtype?.name || item.subtype?.name || '-';
//         }
//         if (columnKey === 'size1_name') {
//             return item.item_type?.size1?.name || item.size1?.name || '-';
//         }
//         if (columnKey === 'size2_name') {
//             return item.item_type?.size2?.name || item.size2?.name || '-';
//         }
//         if (columnKey === 'material_name') {
//             return item.item_type?.material?.name || item.material?.name || '-';
//         }
//         if (columnKey === 'description_name') {
//             return item.item_type?.description?.name || item.description?.name || '-';
//         }
//         if (columnKey === 'thickness_1') {
//             return item.item_type?.thickness_1 || item.thickness_1 || '-';
//         }
//         if (columnKey === 'thickness_2') {
//             return item.item_type?.thickness_2 || item.thickness_2 || '-';
//         }
//         if (columnKey === 'uom_name') {
//             return item.uom?.name || '-';
//         }
//         return item[columnKey] !== null && item[columnKey] !== undefined ? item[columnKey] : '-';
//     };

//     const getUniqueValues = useCallback((columnKey) => {
//         // Map column keys to uniqueValues data
//         const valueMap = {
//             // Stock tab columns
//             'stock_code': allUniqueValues.stock_codes?.map(item => item.stock_code) || [],
//             'alternative_id': allUniqueValues.stock_codes?.map(item => item.alternative_id).filter(Boolean) || [],
//             'old_code': allUniqueValues.stock_codes?.map(item => item.old_code).filter(Boolean) || [],
//             'comment': allUniqueValues.stock_codes?.map(item => item.comment).filter(Boolean) || [],
//             'type_name': allUniqueValues.item_types?.map(item => item.name) || [],
//             'uom_name': allUniqueValues.uoms?.map(item => item.name) || [],

//             // Type tab columns
//             'subtype_name': allUniqueValues.subtypes?.map(item => item.name) || [],
//             'size1_name': allUniqueValues.size1?.map(item => item.name) || [],
//             'size2_name': allUniqueValues.size2?.map(item => item.name) || [],
//             'material_name': allUniqueValues.materials?.map(item => item.name) || [],
//             'description_name': allUniqueValues.descriptions?.map(item => item.name) || [],
//             'thickness_1': allUniqueValues.thickness || [],
//             'thickness_2': allUniqueValues.thickness || [],
//         };

//         // For ID columns, return empty array (no filter needed)
//         if (columnKey === 'id') return [];

//         return valueMap[columnKey] || [];
//     }, [allUniqueValues]);

//     // Initialize visible columns
//     useEffect(() => {
//         if (activeTab === 'stock' && visibleColumns.stock.length === 0) {
//             setVisibleColumns(prev => ({
//                 ...prev,
//                 stock: stockColumns.filter(c => c.visible).map(c => c.key)
//             }));
//         } else if (activeTab === 'type' && visibleColumns.type.length === 0) {
//             setVisibleColumns(prev => ({
//                 ...prev,
//                 type: typeColumns.filter(c => c.visible).map(c => c.key)
//             }));
//         }
//     }, [activeTab]);

//     // Replace your existing fetch useEffect with this:
//     useEffect(() => {
//         const fetchData = async () => {
//             // Build params with current filters
//             const params = {
//                 page: currentPage,
//                 limit: pageSize,
//                 ...filters  // ← This sends filters to backend
//             };

//             if (activeTab === 'stock') {
//                 await dispatch(fetchStockData(params));
//             } else {
//                 await dispatch(fetchType(params));
//             }
//         };

//         fetchData();
//     }, [activeTab, filters, currentPage, pageSize, dispatch]); // ← filters included

//     // Fetch Uniqeu Values
//     useEffect(() => {
//         // Fetch unique values for stock and type related tables
//         // const tables = ['uoms', 'subtypes', 'size1', 'size2', 'materials', 'descriptions', 'item_types'];
//         // dispatch(fetchUniqueValues(tables));
//         dispatch(fetchUniqueValues(null));
//     }, [dispatch]);



    

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const handlePageSizeChange = (size) => {
//         setPageSize(size);
//         setCurrentPage(1);
//     };

//     const handleEdit = (item) => {
//         setEditingItem(item);
//         setShowEditModal(true);
//     };

//     const handleUpdateSubmit = async (formData) => {
//         try {
//             if (activeTab === 'stock') {
//                 await dispatch(updateStock({ id: editingItem.id, data: formData })).unwrap();
//             } else {
//                 await dispatch(updateType({ id: editingItem.id, data: formData })).unwrap();
//             }

//             // Refresh data
//             const params = { page: currentPage, limit: pageSize, ...filters };
//             if (activeTab === 'stock') {
//                 await dispatch(fetchStockData(params));
//             } else {
//                 await dispatch(fetchType(params));
//             }

//             setShowEditModal(false);
//             setEditingItem(null);
//         } catch (error) {
//             console.error('Update failed:', error);
//         }
//     };

//     const toggleColumn = (columnKey) => {
//         const currentVisible = [...visibleColumns[activeTab]];
//         if (currentVisible.includes(columnKey)) {
//             setVisibleColumns(prev => ({
//                 ...prev,
//                 [activeTab]: currentVisible.filter(k => k !== columnKey)
//             }));
//         } else {
//             setVisibleColumns(prev => ({
//                 ...prev,
//                 [activeTab]: [...currentVisible, columnKey]
//             }));
//         }
//     };

//     const getCurrentData = () => {
//         return activeTab === 'stock' ? stockData : typeData;
//     };

//     const getCurrentPagination = () => {
//         return activeTab === 'stock' ? stockPagination : typePagination;
//     };

//     const getCurrentColumns = () => {
//         return activeTab === 'stock' ? stockColumns : typeColumns;
//     };

//     const getCurrentVisibleColumns = () => {
//         return visibleColumns[activeTab];
//     };

//     const refreshData = () => {
//         const params = { page: currentPage, limit: pageSize, ...filters };
//         if (activeTab === 'stock') {
//             dispatch(fetchStockData(params));
//         } else {
//             dispatch(fetchType(params));
//         }
//     };

//     return {
//         // State
//         activeTab,
//         filters,
//         currentPage,
//         pageSize,
//         contextMenu,
//         editingItem,
//         showEditModal,
//         showColumnMenu,
//         currentData: getCurrentData(),
//         pagination: getCurrentPagination(),
//         currentColumns: getCurrentColumns(),
//         currentVisibleColumns: getCurrentVisibleColumns(),
//         loading,
//         // uniqueValues,
//         typeData,
//         typesWithoutStock,
//         fetchTypesWithoutStock,

//         activeFilters,
//         isFiltering,
//         getCurrentUniqueValues,
//         handleFilterChange, // Make sure to replace existing handleFilterChange

//         // Actions
//         setActiveTab,
//         setContextMenu,
//         setShowEditModal,
//         setEditingItem,
//         setShowColumnMenu,
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
//     };
// };