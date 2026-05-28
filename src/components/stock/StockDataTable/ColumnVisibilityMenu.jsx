import React, { useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ColumnVisibilityMenu = ({ columns, visibleColumns, onToggleColumn, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div 
            ref={menuRef}
            className="w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-[100]"
        >
            <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="text-sm font-semibold text-gray-700">Show/Hide Columns</h3>
                <p className="text-xs text-gray-500 mt-1">Select which columns to display</p>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
                {columns.map((column) => (
                    <button
                        key={column.key}
                        onClick={() => onToggleColumn(column.key)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-between transition-colors"
                    >
                        <span>{column.label}</span>
                        {visibleColumns.includes(column.key) ? (
                            <div className="flex items-center gap-1 text-green-600">
                                <Eye className="w-4 h-4" />
                                <span className="text-xs">Visible</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 text-gray-400">
                                <EyeOff className="w-4 h-4" />
                                <span className="text-xs">Hidden</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
            <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <button
                    onClick={onClose}
                    className="w-full px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ColumnVisibilityMenu;