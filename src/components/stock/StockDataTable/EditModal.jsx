
import React, { useState, useEffect } from 'react';
import { X, Check, RefreshCw, Package, Layers } from 'lucide-react';

const EditModal = ({ isOpen, onClose, item, activeTab, onSubmit, uniqueValues, typeOptions }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) {
            if (activeTab === 'stock') {
                // Find the type display text from typeOptions
                const selectedType = typeOptions?.find(t => t.id === item.type_id);
                
                setFormData({
                    id: item.id,
                    stock_code: item.stock_code || '',
                    alternative_id: item.alternative_id || '',
                    old_code: item.old_code || '',
                    comment: item.comment || '',
                    type_id: item.type_id || '',
                    type_display: selectedType ? getTypeDisplayText(selectedType) : '',
                    uom_id: item.uom_id || '',
                    uom_name: uniqueValues?.uoms?.find(u => u.id === item.uom_id)?.name || '',
                });
            } else {
                // For Type tab - find all related names
                const typeName = uniqueValues.item_types?.find(t => t.id === item.type_id)?.name || '';
                const subtypeName = uniqueValues.subtypes?.find(s => s.id === item.subtype_id)?.name || '';
                const size1Name = uniqueValues.size1?.find(s => s.id === item.size1_id)?.name || '';
                const size2Name = uniqueValues.size2?.find(s => s.id === item.size2_id)?.name || '';
                const materialName = uniqueValues.materials?.find(m => m.id === item.material_id)?.name || '';
                const descriptionName = uniqueValues.descriptions?.find(d => d.id === item.description_id)?.name || '';
                
                setFormData({
                    id: item.id,
                    type_id: item.type_id || '',
                    type_name: typeName,
                    subtype_id: item.subtype_id || '',
                    subtype_name: subtypeName,
                    size1_id: item.size1_id || '',
                    size1_name: size1Name,
                    size2_id: item.size2_id || '',
                    size2_name: size2Name,
                    material_id: item.material_id || '',
                    material_name: materialName,
                    description_id: item.description_id || '',
                    description_name: descriptionName,
                    thickness_1: item.thickness_1 || '',
                    thickness_2: item.thickness_2 || '',
                });
            }
        }
    }, [item, activeTab, uniqueValues]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Prepare data for API (send IDs, not names)
            let updateData;
            if (activeTab === 'stock') {
                updateData = {
                    stock_code: formData.stock_code,
                    alternative_id: formData.alternative_id || null,
                    old_code: formData.old_code || null,
                    comment: formData.comment || null,
                    type_id: parseInt(formData.type_id),
                    uom_id: parseInt(formData.uom_id)
                };
            } else {
                updateData = {
                    type_id: parseInt(formData.type_id),
                    subtype_id: parseInt(formData.subtype_id),
                    size1_id: parseInt(formData.size1_id),
                    size2_id: formData.size2_id ? parseInt(formData.size2_id) : null,
                    material_id: parseInt(formData.material_id),
                    description_id: parseInt(formData.description_id),
                    thickness_1: formData.thickness_1 || null,
                    thickness_2: formData.thickness_2 || null
                };
            }
            await onSubmit(updateData);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        // For dropdowns, also update the corresponding name field
        if (field === 'type_id' && activeTab === 'stock') {
            const typeName = uniqueValues.item_types?.find(t => t.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                type_name: typeName
            }));
        } else if (field === 'uom_id' && activeTab === 'stock') {
            const uomName = uniqueValues.uoms?.find(u => u.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                uom_name: uomName
            }));
        } else if (field === 'type_id' && activeTab === 'type') {
            const typeName = uniqueValues.item_types?.find(t => t.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                type_name: typeName
            }));
        } else if (field === 'subtype_id') {
            const subtypeName = uniqueValues.subtypes?.find(s => s.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                subtype_name: subtypeName
            }));
        } else if (field === 'size1_id') {
            const size1Name = uniqueValues.size1?.find(s => s.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                size1_name: size1Name
            }));
        } else if (field === 'size2_id') {
            const size2Name = uniqueValues.size2?.find(s => s.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                size2_name: size2Name
            }));
        } else if (field === 'material_id') {
            const materialName = uniqueValues.materials?.find(m => m.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                material_name: materialName
            }));
        } else if (field === 'description_id') {
            const descriptionName = uniqueValues.descriptions?.find(d => d.id === parseInt(value))?.name || '';
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                description_name: descriptionName
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    // Add helper function
    const getTypeDisplayText = (type) => {
        if (!type) return '';
        const parts = [
            type.type?.name,
            type.subtype?.name,
            type.size1?.name,
            type.size2?.name !== '-' ? type.size2?.name : null,
            type.material?.name,
            type.description?.name,
            type.thickness_1 !== '-' ? type.thickness_1 : null,
            type.thickness_2 !== '-' ? type.thickness_2 : null
        ].filter(p => p && p !== '-');
        
        return parts.join(' | ');
    };

    const renderStockFields = () => (
        <>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Code <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={formData.stock_code || ''}
                    onChange={(e) => handleChange('stock_code', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type Combination <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.type_id || ''}
                    onChange={(e) => handleChange('type_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Type Combination</option>
                    {typeOptions?.map((type) => (
                        <option key={type.id} value={type.id}>
                            {getTypeDisplayText(type)}
                        </option>
                    ))}
                </select>
                {formData.type_display && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.type_display}</p>
                )}
            </div> */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type Combination <span className="text-red-500">*</span>
                </label>
                {/* Show as read-only text instead of select */}
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                    {formData.type_display || 'No type selected'}
                </div>
                <input type="hidden" value="Null" //value={formData?.type_id}
                 />
                <p className="mt-1 text-xs text-gray-500">
                    Type cannot be changed after stock is created
                </p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    UOM <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.uom_id || ''}
                    onChange={(e) => handleChange('uom_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select UOM</option>
                    {uniqueValues.uoms?.map((uom) => (
                        <option key={uom.id} value={uom.id}>
                            {uom.name}
                        </option>
                    ))}
                </select>
                {formData.uom_name && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.uom_name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternative ID
                </label>
                <input
                    type="text"
                    value={formData.alternative_id || ''}
                    onChange={(e) => handleChange('alternative_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Old Code
                </label>
                <input
                    type="text"
                    value={formData.old_code || ''}
                    onChange={(e) => handleChange('old_code', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Comment
                </label>
                <textarea
                    value={formData.comment || ''}
                    onChange={(e) => handleChange('comment', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                />
            </div>
        </>
    );

    const renderTypeFields = () => (
        <>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.type_id || ''}
                    onChange={(e) => handleChange('type_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="">Select Type</option>
                    {uniqueValues.item_types?.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
                {formData.type_name && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.type_name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtype <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.subtype_id || ''}
                    onChange={(e) => handleChange('subtype_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="">Select Subtype</option>
                    {uniqueValues.subtypes?.map((subtype) => (
                        <option key={subtype.id} value={subtype.id}>
                            {subtype.name}
                        </option>
                    ))}
                </select>
                {formData.subtype_name && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.subtype_name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size 1 <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.size1_id || ''}
                    onChange={(e) => handleChange('size1_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="">Select Size 1</option>
                    {uniqueValues.size1?.map((size) => (
                        <option key={size.id} value={size.id}>
                            {size.name}
                        </option>
                    ))}
                </select>
                {formData.size1_name && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.size1_name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size 2 <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <select
                    value={formData.size2_id || ''}
                    onChange={(e) => handleChange('size2_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Select Size 2 (Optional)</option>
                    {uniqueValues.size2?.map((size) => (
                        <option key={size.id} value={size.id}>
                            {size.name}
                        </option>
                    ))}
                </select>
                {formData.size2_name && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.size2_name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Material <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.material_id || ''}
                    onChange={(e) => handleChange('material_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="">Select Material</option>
                    {uniqueValues.materials?.map((material) => (
                        <option key={material.id} value={material.id}>
                            {material.name}
                        </option>
                    ))}
                </select>
                {formData.material_name && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.material_name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.description_id || ''}
                    onChange={(e) => handleChange('description_id', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                >
                    <option value="">Select Description</option>
                    {uniqueValues.descriptions?.map((desc) => (
                        <option key={desc.id} value={desc.id}>
                            {desc.name}
                        </option>
                    ))}
                </select>
                {formData.description_name && (
                    <p className="mt-1 text-xs text-green-600">Current: {formData.description_name}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Thickness 1
                    </label>
                    <input
                        type="text"
                        value={formData.thickness_1 || ''}
                        onChange={(e) => handleChange('thickness_1', e.target.value)}
                        placeholder="e.g., 2.5, 3.0, -"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Thickness 2
                    </label>
                    <input
                        type="text"
                        value={formData.thickness_2 || ''}
                        onChange={(e) => handleChange('thickness_2', e.target.value)}
                        placeholder="e.g., 2.5, 3.0, -"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            </div>
        </>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md border border-white/30 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className={`bg-gradient-to-r ${activeTab === 'stock' ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600'} p-6`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                                {activeTab === 'stock' ? (
                                    <Package className="w-6 h-6 text-white" />
                                ) : (
                                    <Layers className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    Edit {activeTab === 'stock' ? 'Stock' : 'Type'}
                                </h3>
                                <p className="text-white text-opacity-90 text-sm mt-1">
                                    Update the information below
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    <div className="space-y-4">
                        {activeTab === 'stock' ? renderStockFields() : renderTypeFields()}
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



























// import React, { useState, useEffect } from 'react';
// import { X, Check, RefreshCw, Package, Layers } from 'lucide-react';

// const EditModal = ({ isOpen, onClose, item, activeTab, onSubmit }) => {
//     const [formData, setFormData] = useState({});
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (item) {
//             if (activeTab === 'stock') {
//                 // Flatten stock data for editing
//                 setFormData({
//                     id: item.id,
//                     stock_code: item.stock_code || '',
//                     alternative_id: item.alternative_id || '',
//                     old_code: item.old_code || '',
//                     comment: item.comment || '',
//                     type_id: item.type_id || item.item_type?.id || '',
//                     uom_id: item.uom_id || item.uom?.id || '',
//                 });
//             } else {
//                 // Flatten type data for editing
//                 setFormData({
//                     id: item.id,
//                     type_id: item.type_id || item.type?.id || '',
//                     subtype_id: item.subtype_id || item.subtype?.id || '',
//                     size1_id: item.size1_id || item.size1?.id || '',
//                     size2_id: item.size2_id || item.size2?.id || '',
//                     material_id: item.material_id || item.material?.id || '',
//                     description_id: item.description_id || item.description?.id || '',
//                     thickness_1: item.thickness_1 || '',
//                     thickness_2: item.thickness_2 || '',
//                 });
//             }
//         }
//     }, [item, activeTab]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const { id, ...updateData } = formData;
//             await onSubmit(updateData);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (field, value) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };

//     const renderStockFields = () => (
//         <>
//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Stock Code <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                     type="text"
//                     value={formData.stock_code || ''}
//                     onChange={(e) => handleChange('stock_code', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     required
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Alternative ID
//                 </label>
//                 <input
//                     type="text"
//                     value={formData.alternative_id || ''}
//                     onChange={(e) => handleChange('alternative_id', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Old Code
//                 </label>
//                 <input
//                     type="text"
//                     value={formData.old_code || ''}
//                     onChange={(e) => handleChange('old_code', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Comment
//                 </label>
//                 <textarea
//                     value={formData.comment || ''}
//                     onChange={(e) => handleChange('comment', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
//                     rows="3"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Type ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.type_id || ''}
//                     onChange={(e) => handleChange('type_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     UOM ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.uom_id || ''}
//                     onChange={(e) => handleChange('uom_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>
//         </>
//     );

//     const renderTypeFields = () => (
//         <>
//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Type ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.type_id || ''}
//                     onChange={(e) => handleChange('type_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Subtype ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.subtype_id || ''}
//                     onChange={(e) => handleChange('subtype_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Size 1 ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.size1_id || ''}
//                     onChange={(e) => handleChange('size1_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Size 2 ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.size2_id || ''}
//                     onChange={(e) => handleChange('size2_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Material ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.material_id || ''}
//                     onChange={(e) => handleChange('material_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Description ID
//                 </label>
//                 <input
//                     type="number"
//                     value={formData.description_id || ''}
//                     onChange={(e) => handleChange('description_id', parseInt(e.target.value))}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Thickness 1
//                 </label>
//                 <input
//                     type="text"
//                     value={formData.thickness_1 || ''}
//                     onChange={(e) => handleChange('thickness_1', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>

//             <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Thickness 2
//                 </label>
//                 <input
//                     type="text"
//                     value={formData.thickness_2 || ''}
//                     onChange={(e) => handleChange('thickness_2', e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>
//         </>
//     );

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
//                 {/* Header */}
//                 <div className={`bg-gradient-to-r ${activeTab === 'stock' ? 'from-blue-500 to-blue-600' : 'from-purple-500 to-purple-600'} p-6`}>
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className="p-2 bg-white bg-opacity-20 rounded-xl">
//                                 {activeTab === 'stock' ? (
//                                     <Package className="w-6 h-6 text-white" />
//                                 ) : (
//                                     <Layers className="w-6 h-6 text-white" />
//                                 )}
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-white">
//                                     Edit {activeTab === 'stock' ? 'Stock' : 'Type'}
//                                 </h3>
//                                 <p className="text-white text-opacity-90 text-sm mt-1">
//                                     Update the information below
//                                 </p>
//                             </div>
//                         </div>
//                         <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1">
//                             <X className="w-6 h-6" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//                     <div className="space-y-4">
//                         {activeTab === 'stock' ? renderStockFields() : renderTypeFields()}
//                     </div>
//                 </form>

//                 {/* Footer */}
//                 <div className="border-t border-gray-100 p-6 bg-gray-50">
//                     <div className="flex gap-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             onClick={handleSubmit}
//                             disabled={loading}
//                             className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2"
//                         >
//                             {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
//                             {loading ? 'Updating...' : 'Update'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditModal;