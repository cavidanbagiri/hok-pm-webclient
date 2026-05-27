import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DataTablePagination = ({
  sortedData,
  currentPage,
  totalPages,
  indexOfFirstItem,
  indexOfLastItem,
  onPageChange,
  itemsPerPage
}) => {
  if (sortedData.length === 0) return null;

  return (
    <div className="px-2 py-1 border-gray-200 bg-gray-50 flex items-center justify-between">
      <div className="text-xs text-gray-500">
        {/* Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries */}
        <div className="text-xs text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
          <span className="ml-2 text-gray-400">(Page size: {itemsPerPage})</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1 text-sm">
          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 10) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded-lg transition-colors ${currentPage === pageNum
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
          onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default DataTablePagination;