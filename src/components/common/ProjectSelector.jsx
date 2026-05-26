import React from 'react';
import { Building2 } from 'lucide-react';

const ProjectSelector = ({ value, onChange, projects, disabled, required, error }) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Project {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name} - {project.country} ({project.code})
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {disabled && (
        <p className="mt-1 text-xs text-gray-500">
          Project is automatically assigned based on your user role
        </p>
      )}
    </div>
  );
};

export default ProjectSelector;