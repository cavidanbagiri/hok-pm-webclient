import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MapPin, Package, Ruler, FileText, Tag, Layers, Scale, Grid, Box, Database, PlusIcon
} from 'lucide-react';
import {
  createArea, createLocation, createUom, createSize1, createSize2,
  createMaterial, createDescription, createSubtype, createItemTypes,
  clearMessage, selectMessage
} from '../stores/common_slice';
import { useProjects } from '../hooks/useProjects';
import FormModal from '../components/common/FormModal';
import AreaForm from '../components/common/AreaForm';
import LocationForm from '../components/common/LocationForm';
import MessageBox from '../layouts/MessageBox';

// import DataTable from '../components/common/DataTable';
import DataTable from '../components/common/DataTable/index.jsx';

const DataManagement = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDataType, setCurrentDataType] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const { message, cond } = useSelector(selectMessage);
  const user = useSelector((state) => state.auth.user);
  const { projects, loading: projectsLoading } = useProjects();
  
  const userRole = user?.status_id;
  const userProjectId = user?.project_id;

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const dataConfigs = [
    {
      id: 'area', label: 'Area', icon: MapPin, createAction: createArea,
      color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-600',
      FormComponent: AreaForm,
      requiresProject: true
    },
    {
      id: 'location', label: 'Location', icon: Box, createAction: createLocation,
      color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-600',
      FormComponent: LocationForm,
      requiresProject: true
    },
    {
      id: 'uom', label: 'Unit of Measure', icon: Scale, createAction: createUom,
      color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-600',
      FormComponent: null,
      fields: [{ name: 'name', label: 'Unit Name', type: 'text', placeholder: 'e.g., Kilogram, Meter' }]
    },
    {
      id: 'size1', label: 'Size Type 1', icon: Ruler, createAction: createSize1,
      color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-600',
      FormComponent: null,
      fields: [{ name: 'name', label: 'Size Name', type: 'text', placeholder: 'Enter size name' }]
    },
    {
      id: 'size2', label: 'Size Type 2', icon: Grid, createAction: createSize2,
      color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50', textColor: 'text-pink-600',
      FormComponent: null,
      fields: [{ name: 'name', label: 'Size Name', type: 'text', placeholder: 'Enter size name' }]
    },
    {
      id: 'material', label: 'Material', icon: Package, createAction: createMaterial,
      color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600',
      FormComponent: null,
      fields: [{ name: 'name', label: 'Material Name', type: 'text', placeholder: 'e.g., Steel, Plastic' }]
    },
    {
      id: 'description', label: 'Description', icon: FileText, createAction: createDescription,
      color: 'from-teal-500 to-teal-600', bgColor: 'bg-teal-50', textColor: 'text-teal-600',
      FormComponent: null,
      fields: [{ name: 'name', label: 'Description', type: 'text', placeholder: 'Enter description' }]
    },
    {
      id: 'subtype', label: 'Subtype', icon: Layers, createAction: createSubtype,
      color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', textColor: 'text-red-600',
      FormComponent: null,
      fields: [{ name: 'name', label: 'Subtype Name', type: 'text', placeholder: 'Enter subtype name' }]
    },
    {
      id: 'item_types', label: 'Item Types', icon: Tag, createAction: createItemTypes,
      color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600',
      FormComponent: null,
      fields: [{ name: 'name', label: 'Item Type', type: 'text', placeholder: 'Enter item type' }]
    }
  ];

  const openModal = (dataType) => {
    setCurrentDataType(dataType);
    setFormData({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentDataType(null);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(currentDataType.createAction(formData)).unwrap();
      closeModal();
    } catch (error) {
      console.error('Error creating:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (!currentDataType) return null;
    
    if (currentDataType.FormComponent) {
      return (
        <currentDataType.FormComponent
          formData={formData}
          setFormData={setFormData}
          projects={projects}
          userRole={userRole}
          userProjectId={userProjectId}
        />
      );
    }
    
    // Default form for simple data types
    return (
      <div className="space-y-4">
        {currentDataType.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label} <span className="text-red-500">*</span>
            </label>
            <input
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder={field.placeholder}
              required
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="">
        <div className="py-6 px-6 flex items-center justify-between mb-2">
          <div className=''>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Data Management
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm">
            <Database className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{dataConfigs.length} Data Types</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3 mb-8 py-2 px-6 ">
        {dataConfigs.map((config) => (
        <div
            key={config.id}
            className={`${config.bgColor} ${config.borderColor} flex items-center justify-between rounded-xl px-3 py-2  cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
            onClick={() => openModal(config)}
            >
            {/* Левая часть: Иконка + Текст */}
            <div className="flex items-center gap-2.5 min-w-0">
                <config.icon className={`w-4 h-4 ${config.textColor} shrink-0`} />
                <p className="text-xs font-semibold text-gray-700 truncate">
                {config.label}
                </p>
            </div>

            {/* Правая часть: Маленький аккуратный плюс */}
            <PlusIcon className={`${config.textColor} w-3.5 h-3.5 shrink-0 ml-2 opacity-60 group-hover:opacity-100 transition-opacity`} />
            </div>
            ))}
      </div>

      {/* Modal */}
      <FormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        title={`Create New ${currentDataType?.label || ''}`}
        icon={currentDataType?.icon || MapPin}
        color={currentDataType?.color || 'from-blue-500 to-blue-600'}
        loading={loading}
      >
        {renderForm()}
      </FormModal>

      <div className='px-6'>
        <DataTable />
      </div>

      {/* MessageBox */}
      {showMessage && message && (
        <MessageBox
          msg={message}
          cond={cond}
          onClose={() => {
            setShowMessage(false);
            dispatch(clearMessage());
          }}
          autoClose={true}
          duration={1500}
        />
      )}
    </div>
  );
};

export default DataManagement;