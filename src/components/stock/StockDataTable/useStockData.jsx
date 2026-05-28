import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchStockData, 
    fetchType, 
    updateStock, 
    updateType,
    selectStockData,
    selectStockPagination,
    selectTypeData,
    selectTypePagination,
    selectStockLoading,
    clearMessage
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

    // Column visibility state - initialize with all columns visible
    const [visibleColumns, setVisibleColumns] = useState({
        stock: ['stock_code', 'type_name', 'uom_name', 'subtype_name', 'size1_name', 'size2_name', 'thickness_1', 'thickness_2'],
        type: ['type_name', 'subtype_name', 'size1_name', 'size2_name',  'thickness_1', 'thickness_2']
    });

    // Selectors
    const stockData = useSelector(selectStockData);
    const stockPagination = useSelector(selectStockPagination);
    const typeData = useSelector(selectTypeData);
    const typePagination = useSelector(selectTypePagination);
    const loading = useSelector(selectStockLoading);

    // Column definitions with display labels
    // Stock columns - these keys are used in getNestedValue above
    const stockColumns = [
        { key: 'id', label: 'ID', visible: true, type: 'number' },
        { key: 'stock_code', label: 'Stock Code', visible: true, type: 'text' },
        { key: 'type_name', label: 'Type Name', visible: true, type: 'text' },      // <- This calls getNestedValue
        { key: 'subtype_name', label: 'Subtype', visible: true, type: 'text' },     // <- This calls getNestedValue
        { key: 'size1_name', label: 'Size 1', visible: true, type: 'text' },        // <- This calls getNestedValue
        { key: 'size2_name', label: 'Size 2', visible: true, type: 'text' },        // <- This calls getNestedValue
        { key: 'material_name', label: 'Material', visible: true, type: 'text' },   // <- This calls getNestedValue
        { key: 'description_name', label: 'Description', visible: true, type: 'text' }, // <- This calls getNestedValue
        { key: 'thickness_1', label: 'Thickness 1', visible: true, type: 'text' },  // <- This calls getNestedValue
        { key: 'thickness_2', label: 'Thickness 2', visible: true, type: 'text' },  // <- This calls getNestedValue
        { key: 'uom_name', label: 'UOM', visible: true, type: 'text' },             // <- This calls getNestedValue
        { key: 'alternative_id', label: 'Alternative ID', visible: true, type: 'text' },
        { key: 'old_code', label: 'Old Code', visible: true, type: 'text' },
        { key: 'comment', label: 'Comment', visible: true, type: 'text' },
    ];

    const typeColumns = [
        { key: 'id', label: 'ID', visible: true, type: 'number' },
        { key: 'type_name', label: 'Type Name', visible: true, type: 'text' },
        { key: 'subtype_name', label: 'Subtype', visible: true, type: 'text' },
        { key: 'size1_name', label: 'Size 1', visible: true, type: 'text' },
        { key: 'size2_name', label: 'Size 2', visible: true, type: 'text' },
        { key: 'material_name', label: 'Material', visible: true, type: 'text' },
        { key: 'description_name', label: 'Description', visible: true, type: 'text' },
        { key: 'thickness_1', label: 'Thickness 1', visible: true, type: 'text' },
        { key: 'thickness_2', label: 'Thickness 2', visible: true, type: 'text' },
    ];

const getNestedValue = (item, columnKey) => {
    // For Stock Data - has item_type wrapper
    // For Type Data - direct relationships
    
    if (columnKey === 'type_name') {
        // Check if it's Stock data (has item_type) or Type data (direct)
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
    
    // Regular properties
    return item[columnKey] !== null && item[columnKey] !== undefined ? item[columnKey] : '-';
};

    // Get unique values for a column (for Excel filter)
    const getUniqueValues = useCallback((columnKey) => {
        const data = activeTab === 'stock' ? stockData : typeData;
        if (!data || data.length === 0) return [];
        
        const values = new Set();
        data.forEach(item => {
            let value = getNestedValue(item, columnKey);
            if (value !== '-' && value !== null && value !== undefined) {
                values.add(String(value));
            }
        });
        
        return Array.from(values).sort();
    }, [activeTab, stockData, typeData]);

    // Initialize visible columns
    useEffect(() => {
        if (activeTab === 'stock' && visibleColumns.stock.length === 0) {
            setVisibleColumns(prev => ({
                ...prev,
                stock: stockColumns.filter(c => c.visible).map(c => c.key)
            }));
        } else if (activeTab === 'type' && visibleColumns.type.length === 0) {
            setVisibleColumns(prev => ({
                ...prev,
                type: typeColumns.filter(c => c.visible).map(c => c.key)
            }));
        }
    }, [activeTab]);

    // Fetch data when filters or page changes
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

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    const clearFilter = (field) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[field];
            return newFilters;
        });
        setCurrentPage(1);
    };

    const clearAllFilters = () => {
        setFilters({});
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

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
        getUniqueValues,
        getNestedValue,
    };
};