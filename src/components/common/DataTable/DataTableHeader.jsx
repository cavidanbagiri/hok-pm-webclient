import React from 'react';
import { RefreshCw, Import } from 'lucide-react';

import { CiImport } from "react-icons/ci";


import DataTablePagination from './DataTablePagination';

const DataTableHeader = ({ onRefresh }) => {
  
  return (
    <div className="flex justify-end border-b border-gray-200 bg-gradient-to-r from-white to-white p-1">
      <div className="flex items-center bg-gradient-to-r from-white to-white rounded-xl">
        
        <button
          onClick={onRefresh}
          className="ml-6 flex items-center p-2 mr-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          title="Refresh"
        >
          <Import className="w-4 h-4" />
          <span className='pl-2 text-xs'>Import CSV</span>
        </button>

        <button
          onClick={onRefresh}
          className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
          <span className='pl-2 text-xs'>Refresh Table</span>
        </button>
        
      </div>
    </div>
  );
};

export default DataTableHeader;