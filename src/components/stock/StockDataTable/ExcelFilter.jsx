import React, { useState, useEffect, useRef } from 'react';
import { Filter, FilterX, ChevronDown, Search, X, Check } from 'lucide-react';

const ExcelFilter = ({ column, value, options, onFilterChange, onClear, columnLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const filterRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value && value !== '') {
            setSelectedValues(value.split(',').filter(v => v));
        } else {
            setSelectedValues([]);
        }
    }, [value]);

    const filteredOptions = options.filter(opt =>
        String(opt).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleValue = (opt) => {
        const newValues = selectedValues.includes(opt)
            ? selectedValues.filter(v => v !== opt)
            : [...selectedValues, opt];
        setSelectedValues(newValues);
        onFilterChange(newValues.join(','));
    };

    const handleSelectAll = () => {
        if (selectedValues.length === options.length) {
            setSelectedValues([]);
            onFilterChange('');
        } else {
            setSelectedValues([...options]);
            onFilterChange(options.join(','));
        }
    };

    const hasFilter = value && value !== '';

    return (
        <div ref={filterRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-2 py-1.5 text-xs border rounded-md flex items-center justify-between transition-colors ${
                    hasFilter 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title={`Filter by ${columnLabel}`}
            >
                <div className="flex items-center gap-1 truncate">
                    {hasFilter ? (
                        <Filter className="w-3 h-3 flex-shrink-0" />
                    ) : (
                        <Filter className="w-3 h-3 opacity-50 flex-shrink-0" />
                    )}
                    <span className="truncate">
                        {hasFilter ? `${selectedValues.length} selected` : columnLabel}
                    </span>
                </div>
                <ChevronDown className="w-3 h-3 flex-shrink-0" />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[100]">
                    {/* Header */}
                    <div className="p-2 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-700">
                                Filter by {columnLabel}
                            </span>
                            {hasFilter && (
                                <button
                                    onClick={() => {
                                        onClear();
                                        setIsOpen(false);
                                    }}
                                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                                >
                                    <FilterX className="w-3 h-3" /> Clear
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search values..."
                                className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="max-h-64 overflow-y-auto">
                        <div className="p-1 border-b border-gray-100">
                            <button
                                onClick={handleSelectAll}
                                className="w-full px-2 py-1 text-left text-xs text-gray-600 hover:bg-gray-100 rounded flex items-center gap-2"
                            >
                                <div className={`w-3 h-3 border rounded flex items-center justify-center ${
                                    selectedValues.length === options.length ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                                }`}>
                                    {selectedValues.length === options.length && <Check className="w-2 h-2 text-white" />}
                                </div>
                                Select All ({options.length})
                            </button>
                        </div>
                        {/* {filteredOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => handleToggleValue(opt)}
                                className="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                            >
                                <div className={`w-3 h-3 border rounded flex items-center justify-center ${
                                    selectedValues.includes(opt) ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                                }`}>
                                    {selectedValues.includes(opt) && <Check className="w-2 h-2 text-white" />}
                                </div>
                                <span className="truncate">{opt}</span>
                            </button>
                        ))} */}
                        {filteredOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => handleToggleValue(opt)}
                                className="w-full px-2 py-1 text-left text-xs text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
                            >
                                <div className={`w-3 h-3 border rounded flex items-center justify-center ${
                                    selectedValues.includes(opt) ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                                }`}>
                                    {selectedValues.includes(opt) && <Check className="w-2 h-2 text-white" />}
                                </div>
                                <span className="truncate">{opt}</span>
                            </button>
                        ))}
                        {filteredOptions.length === 0 && (
                            <div className="px-2 py-2 text-xs text-gray-500 text-center">
                                No matching values
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-gray-200 flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExcelFilter;