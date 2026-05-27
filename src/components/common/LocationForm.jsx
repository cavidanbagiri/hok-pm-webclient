import React, { useEffect } from 'react';
import ProjectSelector from './ProjectSelector';

const LocationForm = ({ formData, setFormData, projects, userRole, userProjectId }) => {
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
          Location Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          placeholder="Enter location name"
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

export default LocationForm;