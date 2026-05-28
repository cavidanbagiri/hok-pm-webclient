import React from 'react';
import { RefreshCw, Import, Settings } from 'lucide-react';

import { CiImport } from "react-icons/ci";


import DataTablePagination from './DataTablePagination';

const DataTableHeader = ({ onRefresh, pageSize, onPageSizeChange }) => {

  const pageSizeOptions = [10, 20, 30, 50, 100];

  return (
    <div className="flex justify-start border-b border-gray-200 bg-gradient-to-r from-white to-white p-1">
      
      <div className="flex items-center bg-gradient-to-r from-white to-white rounded-xl">

        {/* Import CSV Button */}
        <button
          onClick={onRefresh}
          className=" flex items-center p-2 mr-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          title="Refresh"
        >
          <Import className="w-4 h-4" />
          <span className='pl-2 text-xs'>Import CSV</span>
        </button>

       {/* Refresh Button */}
        <button
          onClick={onRefresh}
          className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
          <span className='pl-2 text-xs'>Refresh Table</span>
        </button>


      {/* Page Size Selector */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 ">
          <Settings className="w-4 h-4 text-gray-400" />
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="text-sm text-gray-600 bg-transparent outline-none cursor-pointer hover:text-gray-800"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size} rows per page
              </option>
            ))}
          </select>
        </div>

      </div>
      
    </div>
  );
};

export default DataTableHeader;