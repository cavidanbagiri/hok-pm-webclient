import React, { useState, useEffect } from 'react';
import { X, Check, RefreshCw } from 'lucide-react';
import { useProjects } from '../../../hooks/useProjects';

const EditModal = ({ isOpen, onClose, item, tab, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { projects } = useProjects();

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await onSubmit(formData);
  //     onClose();
  //   } finally {
  //     setLoading(false);
  //   }
  // };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
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
                {project.name} - {project.country} ({project.code})
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md border border-white/30 animate-fadeIn">
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

export default EditModal;