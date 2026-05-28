


import React from 'react';
import { MoreVertical, Edit, Trash2, Package, Layers } from 'lucide-react';

const StockDataBody = ({ 
    data, 
    columns,
    visibleColumns, 
    loading, 
    onContextMenu, 
    onEdit, 
    activeTab,
    getNestedValue 
}) => {
    
    const visibleColumnObjects = columns.filter(col => visibleColumns.includes(col.key));

    if (loading) {
        return (
            <tbody>
                <tr>
                    <td colSpan={visibleColumnObjects.length + 2} className="px-4 py-20 text-center">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                        <p className="mt-4 text-gray-500">Loading {activeTab === 'stock' ? 'stock' : 'type'} data...</p>
                    </td>
                </tr>
            </tbody>
        );
    }

    if (data.length === 0) {
        return (
            <tbody>
                <tr>
                    <td colSpan={visibleColumnObjects.length + 2} className="px-4 py-12 text-center">
                        <div className="text-center">
                            <div className="inline-flex p-4 rounded-full bg-gray-100">
                                {activeTab === 'stock' ? (
                                    <Package className="w-8 h-8 text-gray-400" />
                                ) : (
                                    <Layers className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No data found</h3>
                            <p className="mt-1 text-gray-500">
                                No {activeTab === 'stock' ? 'stock' : 'type'} records available
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, idx) => (
                <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors cursor-context-menu"
                    onContextMenu={(e) => onContextMenu(e, item)}
                >
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                        <button
                            onClick={(e) => onContextMenu(e, item)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                    </td>
                    
                    {visibleColumnObjects.map((column) => (
                        <td key={column.key} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {getNestedValue(item, column.key)}
                        </td>
                    ))}
                    
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                            <button
                                onClick={() => onEdit(item)}
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
            ))}
        </tbody>
    );
};

export default StockDataBody;