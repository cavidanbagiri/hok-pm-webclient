import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  MapPin,
  Package,
  Ruler,
  FileText,
  Tag,
  Layers,
  Scale,
  Grid,
  Box,
  X,
  Check,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  fetchArea,
  fetchLocation,
  fetchUom,
  fetchSize1,
  fetchSize2,
  fetchMaterial,
  fetchDescription,
  fetchSubtype,
  fetchItemTypes,
  createArea,
  createLocation,
  createUom,
  createSize1,
  createSize2,
  createMaterial,
  createDescription,
  createSubtype,
  createItemTypes,
  selectAreas,
  selectLocations,
  selectUoms,
  selectSize1,
  selectSize2,
  selectMaterials,
  selectDescriptions,
  selectSubtypes,
  selectItemTypes,
  selectLoading
} from '../../stores/common_slice';
import { useProjects } from '../../hooks/useProjects';
import FormModal from '../common/FormModal';
import MessageBox from '../../layouts/MessageBox';

// Debounce helper
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// Context Menu Component
const ContextMenu = ({ x, y, onClose, onEdit, onDelete, onView, customActions = [] }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[160px] animate-fadeIn"
      style={{ top: y, left: x }}
    >
      <button
        onClick={() => { onView(); onClose(); }}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <Eye className="w-4 h-4" /> View Details
      </button>
      <button
        onClick={() => { onEdit(); onClose(); }}
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
      >
        <Edit className="w-4 h-4" /> Edit
      </button>
      {customActions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => { action.onClick(); onClose(); }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          {action.icon} {action.label}
        </button>
      ))}
      <div className="border-t border-gray-100 my-1"></div>
      <button
        onClick={() => { onDelete(); onClose(); }}
        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" /> Delete
      </button>
    </div>
  );
};

// Main DataTable Component
const DataTable = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('area');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [contextMenu, setContextMenu] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [localMessage, setLocalMessage] = useState({ msg: '', cond: '' });

  // Fetch projects for name mapping
  const { projects } = useProjects();

  // Get data from Redux
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

  // Tab configuration with field definitions
  const tabs = [
    {
      id: 'area',
      label: 'Areas',
      icon: MapPin,
      color: 'blue',
      data: areas,
      fetchAction: fetchArea,
      createAction: createArea,
      fields: ['id', 'name', 'description', 'doc_no', 'doc_rev', 'say_iso_no', 'project_id'],
      displayFields: ['id', 'name', 'description', 'doc_no', 'doc_rev', 'say_iso_no', 'project_name'],
      getRelatedName: (item) => {
        const project = projects?.find(p => p.id === item.project_id);
        return { ...item, project_name: project?.name || 'N/A' };
      }
    },
    {
      id: 'location',
      label: 'Locations',
      icon: Box,
      color: 'green',
      data: locations,
      fetchAction: fetchLocation,
      createAction: createLocation,
      fields: ['id', 'name', 'project_id'],
      displayFields: ['id', 'name', 'project_name'],
      getRelatedName: (item) => {
        const project = projects?.find(p => p.id === item.project_id);
        return { ...item, project_name: project?.name || 'N/A' };
      }
    },
    {
      id: 'uom',
      label: 'Units of Measure',
      icon: Scale,
      color: 'purple',
      data: uoms,
      fetchAction: fetchUom,
      createAction: createUom,
      fields: ['id', 'name'],
      displayFields: ['id', 'name']
    },
    {
      id: 'size1',
      label: 'Size Type 1',
      icon: Ruler,
      color: 'orange',
      data: size1,
      fetchAction: fetchSize1,
      createAction: createSize1,
      fields: ['id', 'name'],
      displayFields: ['id', 'name']
    },
    {
      id: 'size2',
      label: 'Size Type 2',
      icon: Grid,
      color: 'pink',
      data: size2,
      fetchAction: fetchSize2,
      createAction: createSize2,
      fields: ['id', 'name'],
      displayFields: ['id', 'name']
    },
    {
      id: 'material',
      label: 'Materials',
      icon: Package,
      color: 'indigo',
      data: materials,
      fetchAction: fetchMaterial,
      createAction: createMaterial,
      fields: ['id', 'name'],
      displayFields: ['id', 'name']
    },
    {
      id: 'description',
      label: 'Descriptions',
      icon: FileText,
      color: 'teal',
      data: descriptions,
      fetchAction: fetchDescription,
      createAction: createDescription,
      fields: ['id', 'name'],
      displayFields: ['id', 'name']
    },
    {
      id: 'subtype',
      label: 'Subtypes',
      icon: Layers,
      color: 'red',
      data: subtypes,
      fetchAction: fetchSubtype,
      createAction: createSubtype,
      fields: ['id', 'name'],
      displayFields: ['id', 'name']
    },
    {
      id: 'item_types',
      label: 'Item Types',
      icon: Tag,
      color: 'yellow',
      data: itemTypes,
      fetchAction: fetchItemTypes,
      createAction: createItemTypes,
      fields: ['id', 'name'],
      displayFields: ['id', 'name']
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);
  
  // Process data with related names
  const processedData = useMemo(() => {
    if (!currentTab?.data) return [];
    if (currentTab.getRelatedName) {
      return currentTab.data.map(item => currentTab.getRelatedName(item));
    }
    return currentTab.data;
  }, [currentTab?.data, projects, currentTab]);

  // Apply filters
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

  // Apply sorting
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
      
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Fetch data when tab changes
  useEffect(() => {
    dispatch(currentTab?.fetchAction());
    setFilters({});
    setCurrentPage(1);
    setSortConfig({ key: 'id', direction: 'asc' });
  }, [activeTab, dispatch]);

  // Show message from Redux
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
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const handleUpdateSubmit = async (formData) => {
    // For now, we'll use create action (will be replaced with update endpoint)
    try {
      await dispatch(currentTab.createAction(formData)).unwrap();
      await dispatch(currentTab.fetchAction());
      setShowEditModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const getSortIcon = (field) => {
    if (sortConfig.key !== field) return <ArrowUpDown className="w-3 h-3 opacity-50" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
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

  const displayColumns = currentTab?.displayFields || [];

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Data Management</h2>
            <p className="text-gray-500 mt-1">View and manage all your warehouse data</p>
          </div>
          <button
            onClick={() => dispatch(currentTab?.fetchAction())}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200
                ${activeTab === tab.id
                  ? `border-b-2 border-${tab.color}-500 text-${tab.color}-600`
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id 
                  ? `bg-${tab.color}-100 text-${tab.color}-600`
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.data?.length || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading[`fetch${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`] ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            {/* Header Row */}
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ☰
                </th>
                {displayColumns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors"
                    onClick={() => handleSort(column)}
                  >
                    <div className="flex items-center gap-1">
                      {column.replace(/_/g, ' ').toUpperCase()}
                      {getSortIcon(column)}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                  Actions
                </th>
              </tr>
              {/* Filter Row */}
              <tr className="bg-gray-50 border-t border-gray-200">
                <th className="px-4 py-2"></th>
                {displayColumns.map((column) => (
                  <th key={`filter-${column}`} className="px-4 py-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                      <input
                        type="text"
                        value={filters[column] || ''}
                        onChange={(e) => handleFilterChange(column, e.target.value)}
                        placeholder={`Filter ${column.replace(/_/g, ' ')}`}
                        className="w-full pl-7 pr-7 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {filters[column] && (
                        <button
                          onClick={() => clearFilter(column)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <X className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            {/* Body Rows */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={displayColumns.length + 2} className="px-4 py-12 text-center">
                    <div className={`inline-flex p-4 rounded-full ${getColorClasses(currentTab?.color)}`}>
                      {currentTab?.icon && React.createElement(currentTab.icon, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No data found</h3>
                    <p className="mt-1 text-gray-500">
                      {Object.keys(filters).length > 0 
                        ? 'Try adjusting your filters' 
                        : `No ${currentTab?.label?.toLowerCase()} available`}
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors cursor-context-menu"
                    onContextMenu={(e) => handleContextMenu(e, item)}
                  >
                    {/* Context Menu Trigger Column */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        onClick={(e) => handleContextMenu(e, item)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                    
                    {/* Data Columns */}
                    {displayColumns.map((column) => (
                      <td key={column} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item[column] !== null && item[column] !== undefined ? item[column] : '-'}
                      </td>
                    ))}
                    
                    {/* Action Buttons */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleEdit(item)}
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
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {sortedData.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onEdit={() => handleEdit(contextMenu.item)}
          onView={() => console.log('View:', contextMenu.item)}
          onDelete={() => console.log('Delete:', contextMenu.item)}
          customActions={[
            { label: 'Go to MTF', icon: <Package className="w-4 h-4" />, onClick: () => console.log('MTF:', contextMenu.item) },
            { label: 'Go to Warehouse', icon: <MapPin className="w-4 h-4" />, onClick: () => console.log('Warehouse:', contextMenu.item) }
          ]}
        />
      )}

      {/* Edit Modal */}
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
          projects={projects}
        />
      )}

      {/* MessageBox */}
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

// Edit Modal Component
const EditModal = ({ isOpen, onClose, item, tab, onSubmit, projects }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    if (field === 'project_id' && projects) {
      return (
        <div key={field}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Project <span className="text-red-500">*</span>
          </label>
          <select
            value={formData[field] || ''}
            onChange={(e) => setFormData({ ...formData, [field]: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name} - {project.country}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field === 'id') return null;

    return (
      <div key={field}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {field.replace(/_/g, ' ').toUpperCase()}
        </label>
        {field.includes('description') ? (
          <textarea
            value={formData[field] || ''}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
          />
        ) : (
          <input
            type="text"
            value={formData[field] || ''}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className={`bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                <tab.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Edit {tab.label}</h3>
                <p className="text-white text-opacity-90 text-sm mt-1">
                  Update the information below
                </p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-4">
            {tab.fields.map(field => renderField(field))}
          </div>
        </form>

        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;