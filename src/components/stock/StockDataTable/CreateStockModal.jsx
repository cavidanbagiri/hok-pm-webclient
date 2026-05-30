

import React, { useState, useEffect } from 'react';
import { X, Check, RefreshCw, Plus, Package } from 'lucide-react';

const CreateStockModal = ({ isOpen, onClose, onSubmit, typesWithoutStock, loading }) => {
    const [formData, setFormData] = useState({
        stock_code: '',
        alternative_id: '',
        old_code: '',
        comment: '',
        type_id: '',
        uom_id: ''
    });

    const [errors, setErrors] = useState({});

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                stock_code: '',
                alternative_id: '',
                old_code: '',
                comment: '',
                type_id: '',
                uom_id: ''
            });
            setErrors({});
        }
    }, [isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.stock_code) newErrors.stock_code = 'Stock code is required';
        if (!formData.type_id) newErrors.type_id = 'Type is required';
        if (!formData.uom_id) newErrors.uom_id = 'UOM is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const submitData = {
                stock_code: formData.stock_code,
                alternative_id: formData.alternative_id || null,
                old_code: formData.old_code || null,
                comment: formData.comment || null,
                type_id: parseInt(formData.type_id),
                uom_id: parseInt(formData.uom_id)
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

    // Get display text for type option (from typesWithoutStock)
    const getTypeDisplayText = (type) => {
        if (!type) return '';
        const parts = [
            type.type_name,
            type.subtype_name,
            type.size1_name,
            type.size2_name && type.size2_name !== '-' ? type.size2_name : null,
            type.material_name,
            // type.description_name,
            type.thickness_1 && type.thickness_1 !== '-' ? type.thickness_1 : null,
            type.thickness_2 && type.thickness_2 !== '-' ? type.thickness_2 : null
        ].filter(p => p && p !== '-');
        
        return parts.join(' | ');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md border border-white/30 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white bg-opacity-20 rounded-xl">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Create New Stock</h3>
                                <p className="text-white text-opacity-90 text-sm mt-1">
                                    Create stock for types that don't have a stock code yet
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
                    <div className="space-y-4">
                        {/* Stock Code */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Stock Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.stock_code}
                                onChange={(e) => handleChange('stock_code', e.target.value)}
                                placeholder="e.g., 00000ABCQ530EE"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.stock_code ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.stock_code && <p className="mt-1 text-xs text-red-500">{errors.stock_code}</p>}
                        </div>

                        {/* Type - Only show types WITHOUT stock */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.type_id}
                                onChange={(e) => handleChange('type_id', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.type_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select a type (only types without stock)</option>
                                {typesWithoutStock?.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {getTypeDisplayText(type)}
                                    </option>
                                ))}
                            </select>
                            {errors.type_id && <p className="mt-1 text-xs text-red-500">{errors.type_id}</p>}
                            {typesWithoutStock?.length === 0 && (
                                <p className="mt-1 text-xs text-green-600">
                                    All types already have stock codes!
                                </p>
                            )}
                        </div>

                        {/* UOM */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Unit of Measure <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.uom_id}
                                onChange={(e) => handleChange('uom_id', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.uom_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select UOM</option>
                                <option value="1">PCS</option>
                                <option value="2">KG</option>
                                <option value="3">M</option>
                            </select>
                            {errors.uom_id && <p className="mt-1 text-xs text-red-500">{errors.uom_id}</p>}
                        </div>

                        {/* Alternative ID */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Alternative ID <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.alternative_id}
                                onChange={(e) => handleChange('alternative_id', e.target.value)}
                                placeholder="Alternative identifier"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Old Code */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Old Code <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.old_code}
                                onChange={(e) => handleChange('old_code', e.target.value)}
                                placeholder="Previous code if any"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Comment <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <textarea
                                value={formData.comment}
                                onChange={(e) => handleChange('comment', e.target.value)}
                                placeholder="Additional notes"
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
                            disabled={loading || typesWithoutStock?.length === 0}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Create Stock
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateStockModal;









// import React, { useState, useEffect } from 'react';
// import { X, Check, RefreshCw, Plus, Package } from 'lucide-react';

// const CreateStockModal = ({ isOpen, onClose, onSubmit, typeOptions, loading, uniqueValues }) => {
//     const [formData, setFormData] = useState({
//         stock_code: '',
//         alternative_id: '',
//         old_code: '',
//         comment: '',
//         type_id: '',
//         uom_id: ''
//     });
//     const [errors, setErrors] = useState({});

//     // Reset form when modal opens
//     useEffect(() => {
//         if (isOpen) {
//             setFormData({
//                 stock_code: '',
//                 alternative_id: '',
//                 old_code: '',
//                 comment: '',
//                 type_id: '',
//                 uom_id: ''
//             });
//             setErrors({});
//         }
//     }, [isOpen]);

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.stock_code) newErrors.stock_code = 'Stock code is required';
//         if (!formData.type_id) newErrors.type_id = 'Type is required';
//         if (!formData.uom_id) newErrors.uom_id = 'UOM is required';
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             const submitData = {
//                 stock_code: formData.stock_code,
//                 alternative_id: formData.alternative_id || null,
//                 old_code: formData.old_code || null,
//                 comment: formData.comment || null,
//                 type_id: parseInt(formData.type_id),
//                 uom_id: parseInt(formData.uom_id)
//             };
//             await onSubmit(submitData);
//         }
//     };

//     const handleChange = (field, value) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//         if (errors[field]) {
//             setErrors(prev => ({ ...prev, [field]: '' }));
//         }
//     };

//     // Get display text for type option
//     const getTypeDisplayText = (type) => {
//         if (!type) return '';
//         const parts = [
//             type.type?.name,
//             type.subtype?.name,
//             type.size1?.name,
//             type.size2?.name !== '-' ? type.size2?.name : null,
//             type.material?.name,
//             type.description?.name,
//             type.thickness_1 !== '-' ? type.thickness_1 : null,
//             type.thickness_2 !== '-' ? type.thickness_2 : null
//         ].filter(p => p && p !== '-');
        
//         return parts.join(' | ');
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className="p-2 bg-white bg-opacity-20 rounded-xl">
//                                 <Package className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-white">Create New Stock</h3>
//                                 <p className="text-white text-opacity-90 text-sm mt-1">
//                                     Fill in the details to create a new stock item
//                                 </p>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={onClose} 
//                             className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all"
//                         >
//                             <X className="w-6 h-6" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//                     <div className="space-y-4">
//                         {/* Stock Code */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Stock Code <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.stock_code}
//                                 onChange={(e) => handleChange('stock_code', e.target.value)}
//                                 placeholder="e.g., 00000ABCQ530EE"
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.stock_code ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                             />
//                             {errors.stock_code && <p className="mt-1 text-xs text-red-500">{errors.stock_code}</p>}
//                         </div>

//                         {/* Type - Now from TypeModel (combinations) */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Type Combination <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                                 value={formData.type_id}
//                                 onChange={(e) => handleChange('type_id', e.target.value)}
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.type_id ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                             >
//                                 <option value="">Select Type Combination</option>
//                                 {typeOptions?.map((type) => (
//                                     <option key={type.id} value={type.id}>
//                                         {getTypeDisplayText(type)}
//                                     </option>
//                                 ))}
//                             </select>
//                             {errors.type_id && <p className="mt-1 text-xs text-red-500">{errors.type_id}</p>}
//                             <p className="mt-1 text-xs text-gray-500">
//                                 Select a type combination (Type | Subtype | Size1 | Size2 | Material | Description)
//                             </p>
//                         </div>

//                         {/* UOM */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Unit of Measure <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                                 value={formData.uom_id}
//                                 onChange={(e) => handleChange('uom_id', e.target.value)}
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.uom_id ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                             >
//                                 <option value="">Select UOM</option>
//                                 {uniqueValues?.uoms?.map((uom) => (
//                                     <option key={uom.id} value={uom.id}>
//                                         {uom.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             {errors.uom_id && <p className="mt-1 text-xs text-red-500">{errors.uom_id}</p>}
//                         </div>

//                         {/* Alternative ID */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Alternative ID <span className="text-gray-400 text-xs">(Optional)</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.alternative_id}
//                                 onChange={(e) => handleChange('alternative_id', e.target.value)}
//                                 placeholder="Alternative identifier"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Old Code */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Old Code <span className="text-gray-400 text-xs">(Optional)</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.old_code}
//                                 onChange={(e) => handleChange('old_code', e.target.value)}
//                                 placeholder="Previous code if any"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Comment */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Comment <span className="text-gray-400 text-xs">(Optional)</span>
//                             </label>
//                             <textarea
//                                 value={formData.comment}
//                                 onChange={(e) => handleChange('comment', e.target.value)}
//                                 placeholder="Additional notes"
//                                 rows="3"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                             />
//                         </div>
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
//                             className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2"
//                         >
//                             {loading ? (
//                                 <>
//                                     <RefreshCw className="w-4 h-4 animate-spin" />
//                                     Creating...
//                                 </>
//                             ) : (
//                                 <>
//                                     <Plus className="w-4 h-4" />
//                                     Create Stock
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateStockModal;





// import React, { useState, useEffect } from 'react';
// import { X, Check, RefreshCw, Plus, Package } from 'lucide-react';

// const CreateStockModal = ({ isOpen, onClose, onSubmit, uniqueValues, loading }) => {
//     const [formData, setFormData] = useState({
//         stock_code: '',
//         alternative_id: '',
//         old_code: '',
//         comment: '',
//         type_id: '',
//         uom_id: ''
//     });
//     const [errors, setErrors] = useState({});

//     // Reset form when modal opens
//     useEffect(() => {
//         if (isOpen) {
//             setFormData({
//                 stock_code: '',
//                 alternative_id: '',
//                 old_code: '',
//                 comment: '',
//                 type_id: '',
//                 uom_id: ''
//             });
//             setErrors({});
//         }
//     }, [isOpen]);

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.stock_code) newErrors.stock_code = 'Stock code is required';
//         if (!formData.type_id) newErrors.type_id = 'Type is required';
//         if (!formData.uom_id) newErrors.uom_id = 'UOM is required';
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             const submitData = {
//                 stock_code: formData.stock_code,
//                 alternative_id: formData.alternative_id || null,
//                 old_code: formData.old_code || null,
//                 comment: formData.comment || null,
//                 type_id: parseInt(formData.type_id),
//                 uom_id: parseInt(formData.uom_id)
//             };
//             await onSubmit(submitData);
//         }
//     };

//     const handleChange = (field, value) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//         if (errors[field]) {
//             setErrors(prev => ({ ...prev, [field]: '' }));
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/20 backdrop-blur-md border border-white/30 animate-fadeIn">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className="p-2 bg-white bg-opacity-20 rounded-xl">
//                                 <Package className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                                 <h3 className="text-xl font-bold text-white">Create New Stock</h3>
//                                 <p className="text-white text-opacity-90 text-sm mt-1">
//                                     Fill in the details to create a new stock item
//                                 </p>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={onClose} 
//                             className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-all"
//                         >
//                             <X className="w-6 h-6" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//                     <div className="space-y-4">
//                         {/* Stock Code */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Stock Code <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.stock_code}
//                                 onChange={(e) => handleChange('stock_code', e.target.value)}
//                                 placeholder="e.g., 00000ABCQ530EE"
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.stock_code ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                             />
//                             {errors.stock_code && <p className="mt-1 text-xs text-red-500">{errors.stock_code}</p>}
//                         </div>

//                         {/* Type */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Type <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                                 value={formData.type_id}
//                                 onChange={(e) => handleChange('type_id', e.target.value)}
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.type_id ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                             >
//                                 <option value="">Select Type</option>
//                                 {uniqueValues.item_types?.map((type) => (
//                                     <option key={type.id} value={type.id}>
//                                         {type.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             {errors.type_id && <p className="mt-1 text-xs text-red-500">{errors.type_id}</p>}
//                         </div>

//                         {/* UOM */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Unit of Measure <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                                 value={formData.uom_id}
//                                 onChange={(e) => handleChange('uom_id', e.target.value)}
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                     errors.uom_id ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                             >
//                                 <option value="">Select UOM</option>
//                                 {uniqueValues.uoms?.map((uom) => (
//                                     <option key={uom.id} value={uom.id}>
//                                         {uom.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             {errors.uom_id && <p className="mt-1 text-xs text-red-500">{errors.uom_id}</p>}
//                         </div>

//                         {/* Alternative ID */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Alternative ID <span className="text-gray-400 text-xs">(Optional)</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.alternative_id}
//                                 onChange={(e) => handleChange('alternative_id', e.target.value)}
//                                 placeholder="Alternative identifier"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Old Code */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Old Code <span className="text-gray-400 text-xs">(Optional)</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.old_code}
//                                 onChange={(e) => handleChange('old_code', e.target.value)}
//                                 placeholder="Previous code if any"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Comment */}
//                         <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Comment <span className="text-gray-400 text-xs">(Optional)</span>
//                             </label>
//                             <textarea
//                                 value={formData.comment}
//                                 onChange={(e) => handleChange('comment', e.target.value)}
//                                 placeholder="Additional notes"
//                                 rows="3"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                             />
//                         </div>
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
//                             className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2"
//                         >
//                             {loading ? (
//                                 <>
//                                     <RefreshCw className="w-4 h-4 animate-spin" />
//                                     Creating...
//                                 </>
//                             ) : (
//                                 <>
//                                     <Plus className="w-4 h-4" />
//                                     Create Stock
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateStockModal;