import React, { useState, useEffect } from 'react';
import { X, Check, RefreshCw, Plus } from 'lucide-react';

const CreateTypeModal = ({ isOpen, onClose, onSubmit, uniqueValues, loading }) => {

    const [formData, setFormData] = useState({
        type_id: '',
        subtype_id: '',
        size1_id: '',
        size2_id: '',
        material_id: '',
        description_id: '',
        thickness_1: '',
        thickness_2: ''
    });
    const [errors, setErrors] = useState({});

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                type_id: '',
                subtype_id: '',
                size1_id: '',
                size2_id: '',
                material_id: '',
                description_id: '',
                thickness_1: '',
                thickness_2: ''
            });
            setErrors({});
        }
    }, [isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.type_id) newErrors.type_id = 'Type is required';
        if (!formData.subtype_id) newErrors.subtype_id = 'Subtype is required';
        if (!formData.size1_id) newErrors.size1_id = 'Size 1 is required';
        if (!formData.material_id) newErrors.material_id = 'Material is required';
        if (!formData.description_id) newErrors.description_id = 'Description is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const submitData = {
                type_id: parseInt(formData.type_id),
                subtype_id: parseInt(formData.subtype_id),
                size1_id: parseInt(formData.size1_id),
                size2_id: formData.size2_id ? parseInt(formData.size2_id) : null,
                material_id: parseInt(formData.material_id),
                description_id: parseInt(formData.description_id),
                thickness_1: formData.thickness_1 || null,
                thickness_2: formData.thickness_2 || null
            };
            await onSubmit(submitData);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md border border-white/30 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Create New Type</h3>
                                <p className="text-white text-opacity-90 text-sm mt-1">
                                    Fill in the details to create a new item type
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.type_id}
                                onChange={(e) => handleChange('type_id', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    errors.type_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Type</option>
                                {uniqueValues?.item_types?.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            {errors.type_id && <p className="mt-1 text-xs text-red-500">{errors.type_id}</p>}
                        </div>

                        {/* Subtype */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Subtype <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.subtype_id}
                                onChange={(e) => handleChange('subtype_id', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    errors.subtype_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Subtype</option>
                                {uniqueValues?.subtypes?.map((subtype) => (
                                    <option key={subtype.id} value={subtype.id}>
                                        {subtype.name}
                                    </option>
                                ))}
                            </select>
                            {errors.subtype_id && <p className="mt-1 text-xs text-red-500">{errors.subtype_id}</p>}
                        </div>

                        {/* Size 1 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Size 1 <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.size1_id}
                                onChange={(e) => handleChange('size1_id', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    errors.size1_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Size 1</option>
                                {uniqueValues?.size1?.map((size) => (
                                    <option key={size.id} value={size.id}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                            {errors.size1_id && <p className="mt-1 text-xs text-red-500">{errors.size1_id}</p>}
                        </div>

                        {/* Size 2 (Optional) */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Size 2 <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <select
                                value={formData.size2_id}
                                onChange={(e) => handleChange('size2_id', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="">Select Size 2 (Optional)</option>
                                {uniqueValues?.size2?.map((size) => (
                                    <option key={size.id} value={size.id}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Material */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Material <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.material_id}
                                onChange={(e) => handleChange('material_id', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    errors.material_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Material</option>
                                {uniqueValues?.materials?.map((material) => (
                                    <option key={material.id} value={material.id}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                            {errors.material_id && <p className="mt-1 text-xs text-red-500">{errors.material_id}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.description_id}
                                onChange={(e) => handleChange('description_id', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                                    errors.description_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Description</option>
                                {uniqueValues?.descriptions?.map((desc) => (
                                    <option key={desc.id} value={desc.id}>
                                        {desc.name}
                                    </option>
                                ))}
                            </select>
                            {errors.description_id && <p className="mt-1 text-xs text-red-500">{errors.description_id}</p>}
                        </div>

                        {/* Thickness 1 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Thickness 1 <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.thickness_1}
                                onChange={(e) => handleChange('thickness_1', e.target.value)}
                                placeholder="e.g., 2.5, 3.0, -"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        {/* Thickness 2 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Thickness 2 <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.thickness_2}
                                onChange={(e) => handleChange('thickness_2', e.target.value)}
                                placeholder="e.g., 2.5, 3.0, -"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </form>

                {/* Footer */}
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
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Create Type
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTypeModal;