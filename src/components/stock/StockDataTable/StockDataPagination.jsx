import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StockDataPagination = ({ pagination, currentPage, pageSize, onPageChange }) => {
    const { total_count, total_pages } = pagination;
    
    if (total_count === 0) return null;

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, total_count);

    return (
        <div className="px-3 py-2 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1 text-sm">
                    {Array.from({ length: Math.min(5, total_pages) }, (_, i) => {
                        let pageNum;
                        if (total_pages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= total_pages - 2) {
                            pageNum = total_pages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`px-3 py-1 rounded-lg transition-colors ${
                                    currentPage === pageNum
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>
                
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === total_pages}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            <div className="text-xs text-gray-500">
                Showing {startItem} to {endItem} of {total_count} entries
                <span className="ml-2 text-gray-400">(Page size: {pageSize})</span>
            </div>
        </div>
    );
};

export default StockDataPagination;