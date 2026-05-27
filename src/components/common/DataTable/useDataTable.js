import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MapPin, Package, Ruler, FileText, Tag, Layers, Scale, Grid, Box,  ArrowUpDown, ArrowUp, ArrowDown 
} from 'lucide-react';
import {
  fetchArea, fetchLocation, fetchUom, fetchSize1, fetchSize2,
  fetchMaterial, fetchDescription, fetchSubtype, fetchItemTypes,
  createArea, createLocation, createUom, createSize1, createSize2,
  createMaterial, createDescription, createSubtype, createItemTypes,
  selectAreas, selectLocations, selectUoms, selectSize1, selectSize2,
  selectMaterials, selectDescriptions, selectSubtypes, selectItemTypes,
  selectLoading,updateArea, updateLocation, updateUom, updateSize1,
  updateSize2, updateMaterial, updateDescription, updateSubtype, updateItemTypes
} from '../../../stores/common_slice';
import { useProjects } from '../../../hooks/useProjects';

export const useDataTable = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('area');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [contextMenu, setContextMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [localMessage, setLocalMessage] = useState({ msg: '', cond: '' });

  const { projects } = useProjects();
  
  const areas = useSelector(selectAreas) || [];
  const locations = useSelector(selectLocations) || [];
  const uoms = useSelector(selectUoms) || [];
  const size1 = useSelector(selectSize1) || [];
  const size2 = useSelector(selectSize2) || [];
  const materials = useSelector(selectMaterials) || [];
  const descriptions = useSelector(selectDescriptions) || [];
  const subtypes = useSelector(selectSubtypes) || [];
  const itemTypes = useSelector(selectItemTypes) || [];
  const loading = useSelector(selectLoading);
  const { message, cond } = useSelector((state) => state.common);

  const tabs = [
    {
      id: 'area', label: 'Areas', icon: MapPin, color: 'blue',
      data: areas, fetchAction: fetchArea, createAction: createArea,
      fields: ['id', 'name', 'description', 'doc_no', 'doc_rev', 'say_iso_no', 'project_id'],
      displayFields: ['id', 'name', 'description', 'doc_no', 'doc_rev', 'say_iso_no', 'project_name'],
      getRelatedName: (item) => {
        const project = projects?.find(p => p.id === item.project_id);
        return { ...item, project_name: project?.name || 'N/A' };
      }
    },
    {
      id: 'location', label: 'Locations', icon: Box, color: 'green',
      data: locations, fetchAction: fetchLocation, createAction: createLocation,
      fields: ['id', 'name', 'project_id'],
      displayFields: ['id', 'name', 'project_name'],
      getRelatedName: (item) => {
        const project = projects?.find(p => p.id === item.project_id);
        return { ...item, project_name: project?.name || 'N/A' };
      }
    },
    {
      id: 'uom', label: 'Units of Measure', icon: Scale, color: 'purple',
      data: uoms, fetchAction: fetchUom, createAction: createUom,
      fields: ['id', 'name'], displayFields: ['id', 'name']
    },
    {
      id: 'size1', label: 'Size Type 1', icon: Ruler, color: 'orange',
      data: size1, fetchAction: fetchSize1, createAction: createSize1,
      fields: ['id', 'name'], displayFields: ['id', 'name']
    },
    {
      id: 'size2', label: 'Size Type 2', icon: Grid, color: 'pink',
      data: size2, fetchAction: fetchSize2, createAction: createSize2,
      fields: ['id', 'name'], displayFields: ['id', 'name']
    },
    {
      id: 'material', label: 'Materials', icon: Package, color: 'indigo',
      data: materials, fetchAction: fetchMaterial, createAction: createMaterial,
      fields: ['id', 'name'], displayFields: ['id', 'name']
    },
    {
      id: 'description', label: 'Descriptions', icon: FileText, color: 'teal',
      data: descriptions, fetchAction: fetchDescription, createAction: createDescription,
      fields: ['id', 'name'], displayFields: ['id', 'name']
    },
    {
      id: 'subtype', label: 'Subtypes', icon: Layers, color: 'red',
      data: subtypes, fetchAction: fetchSubtype, createAction: createSubtype,
      fields: ['id', 'name'], displayFields: ['id', 'name']
    },
    {
      id: 'item_types', label: 'Item Types', icon: Tag, color: 'yellow',
      data: itemTypes, fetchAction: fetchItemTypes, createAction: createItemTypes,
      fields: ['id', 'name'], displayFields: ['id', 'name']
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);
  
  const processedData = useMemo(() => {
    if (!currentTab?.data) return [];
    if (currentTab.getRelatedName) {
      return currentTab.data.map(item => currentTab.getRelatedName(item));
    }
    return currentTab.data;
  }, [currentTab?.data, projects, currentTab]);

  const filteredData = useMemo(() => {
    if (!processedData.length) return [];
    return processedData.filter(item => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        const itemValue = item[key];
        if (!itemValue) return false;
        return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
      });
    });
  }, [processedData, filters]);

  const sortedData = useMemo(() => {
    if (!filteredData.length) return [];
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return sortConfig.direction === 'asc' 
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const displayColumns = currentTab?.displayFields || [];

  const getColumnOptions = (column) => {
    const uniqueValues = [...new Set(processedData.map(item => item[column]))];
    return uniqueValues.filter(v => v !== null && v !== undefined).sort();
  };

  useEffect(() => {
    dispatch(currentTab?.fetchAction());
    setFilters({});
    setCurrentPage(1);
    setSortConfig({ key: 'id', direction: 'asc' });
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (message) {
      setLocalMessage({ msg: message, cond });
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, cond]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

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
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

const handleUpdateSubmit = async (formData) => {
    try {
        const updateActionMap = {
            area: updateArea,
            location: updateLocation,
            uom: updateUom,
            size1: updateSize1,
            size2: updateSize2,
            material: updateMaterial,
            description: updateDescription,
            subtype: updateSubtype,
            item_types: updateItemTypes
        };
        
        const updateAction = updateActionMap[activeTab];
        
        if (updateAction) {
            await dispatch(updateAction({ 
                id: editingItem.id, 
                data: formData 
            })).unwrap();
            
            // Refresh the data after successful update
            await dispatch(currentTab.fetchAction());
            
            setShowEditModal(false);
            setEditingItem(null);
        }
    } catch (error) {
        console.error('Update failed:', error);
    }
};

  const refreshData = () => {
    dispatch(currentTab?.fetchAction());
  };

  const getSortIcon = (field) => {
    if (sortConfig.key !== field) return 'unsorted';
    return sortConfig.direction === 'asc' ? 'asc' : 'desc';
  };

  return {
    // State
    activeTab, currentPage, filters, sortConfig, contextMenu,
    showEditModal, editingItem, showMessage, localMessage,
    itemsPerPage, 
    // Data
    tabs, currentTab, displayColumns, processedData,
    filteredData, sortedData, currentItems, totalPages,
    indexOfFirstItem, indexOfLastItem, loading,
    // Actions
    setActiveTab, setCurrentPage, setFilters, setSortConfig,
    setContextMenu, setShowEditModal, setEditingItem,
    setShowMessage, setLocalMessage, handleSort, handleFilterChange,
    clearFilter, handleContextMenu, handleEdit, handleUpdateSubmit,
    refreshData, getSortIcon, getColumnOptions, setItemsPerPage
  };
};