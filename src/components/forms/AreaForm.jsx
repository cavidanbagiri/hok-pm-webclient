import React, { useEffect } from 'react';
import ProjectSelector from '../common/ProjectSelector';

const AreaForm = ({ formData, setFormData, projects, userRole, userProjectId }) => {
  // Auto-set project_id for non-admin/manager users
  useEffect(() => {
    if (userRole && ![1, 2].includes(userRole)) {
      setFormData(prev => ({ ...prev, project_id: userProjectId }));
    }
  }, [userRole, userProjectId, setFormData]);

  const isAdminOrManager = userRole && [1, 2].includes(userRole);
  const isProjectDisabled = !isAdminOrManager;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Area Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Enter area name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
          rows="3"
          placeholder="Enter description"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Document Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.doc_no || ''}
          onChange={(e) => setFormData({ ...formData, doc_no: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="DOC-001"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Document Revision <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.doc_rev || ''}
          onChange={(e) => setFormData({ ...formData, doc_rev: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Rev 1.0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          ISO Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.say_iso_no || ''}
          onChange={(e) => setFormData({ ...formData, say_iso_no: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="ISO-9001"
          required
        />
      </div>

      <ProjectSelector
        value={formData.project_id}
        onChange={(value) => setFormData({ ...formData, project_id: parseInt(value) })}
        projects={projects}
        disabled={isProjectDisabled}
        required={true}
      />
    </div>
  );
};

export default AreaForm;