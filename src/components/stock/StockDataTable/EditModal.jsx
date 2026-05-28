import React, { useState, useEffect } from 'react';
import { X, Check, RefreshCw, Package, Layers } from 'lucide-react';

const EditModal = ({ isOpen, onClose, item, activeTab, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (item) {
            if (activeTab === 'stock') {
                // Flatten stock data for editing
                setFormData({
                    id: item.id,
                    stock_code: item.stock_code || '',
                    alternative_id: item.alternative_id || '',
                    old_code: item.old_code || '',
                    comment: item.comment || '',
                    type_id: item.type_id || item.item_type?.id || '',
                    uom_id: item.uom_id || item.uom?.id || '',
                });
            } else {
                // Flatten type data for editing
                setFormData({
                    id: item.id,
                    type_id: item.type_id || item.type?.id || '',
                    subtype_id: item.subtype_id || item.subtype?.id || '',
                    size1_id: item.size1_id || item.size1?.id || '',
                    size2_id: item.size2_id || item.size2?.id || '',
                    material_id: item.material_id || item.material?.id || '',
                    description_id: item.description_id || item.description?.id || '',
                    thickness_1: item.thickness_1 || '',
                    thickness_2: item.thickness_2 || '',
                });
            }
        }
    }, [item, activeTab]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { id, ...updateData } = formData;
            await onSubmit(updateData);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type ID
                </label>
                <input
                    type="number"
                    value={formData.type_id || ''}
                    onChange={(e) => handleChange('type_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    UOM ID
                </label>
                <input
                    type="number"
                    value={formData.uom_id || ''}
                    onChange={(e) => handleChange('uom_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>
    );

    const renderTypeFields = () => (
        <>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type ID
                </label>
                <input
                    type="number"
                    value={formData.type_id || ''}
                    onChange={(e) => handleChange('type_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subtype ID
                </label>
                <input
                    type="number"
                    value={formData.subtype_id || ''}
                    onChange={(e) => handleChange('subtype_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size 1 ID
                </label>
                <input
                    type="number"
                    value={formData.size1_id || ''}
                    onChange={(e) => handleChange('size1_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size 2 ID
                </label>
                <input
                    type="number"
                    value={formData.size2_id || ''}
                    onChange={(e) => handleChange('size2_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Material ID
                </label>
                <input
                    type="number"
                    value={formData.material_id || ''}
                    onChange={(e) => handleChange('material_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description ID
                </label>
                <input
                    type="number"
                    value={formData.description_id || ''}
                    onChange={(e) => handleChange('description_id', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thickness 1
                </label>
                <input
                    type="text"
                    value={formData.thickness_1 || ''}
                    onChange={(e) => handleChange('thickness_1', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
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
                        <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1">
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