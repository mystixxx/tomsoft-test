import React, { useMemo, useState } from "react";
import { 
  ChevronUpIcon, 
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';

function Table({ title = 'Tomsoft Tablica', headers, data, renderRow }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (header) => {
    if (header.toLowerCase() === 'id') return;
    
    setSortConfig(prevSort => ({
      key: header,
      direction: prevSort.key === header && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = useMemo(() => {
    let sortedArray = [...data];

    if (headers.some(header => header.toLowerCase() === 'id')) {
      sortedArray.sort((a, b) => a.id - b.id);
    }

    if (sortConfig.key && sortConfig.key.toLowerCase() !== 'id') {
      sortedArray.sort((a, b) => {
        const aValue = a[sortConfig.key.toLowerCase()];
        const bValue = b[sortConfig.key.toLowerCase()];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return sortedArray;
  }, [data, headers, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#21222D] rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <table className="w-full">
        <thead>
          <tr className="text-light-gray">
            {headers.map((header) => (
              <th
                key={header}
                className={`text-left py-3 px-4 font-medium text-xl ${
                  header.toLowerCase() !== 'id' ? 'cursor-pointer hover:text-white' : ''
                }`}
                onClick={() => handleSort(header)}
              >
                <div className="flex items-center gap-2">
                  {header}
                  {sortConfig.key === header && (
                    sortConfig.direction === 'asc' 
                      ? <ChevronUpIcon className="h-5 w-5" />
                      : <ChevronDownIcon className="h-5 w-5" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className="border-t border-[#2C2D33]">
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </table>
        <div className="mt-6 flex items-center text-light-gray justify-end">
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'hover:bg-[#2C2D33] hover:text-white'
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-[#A9DFD8] text-black font-semibold'
                    : 'hover:bg-[#2C2D33] hover:text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages 
                  ? 'text-gray-500 cursor-not-allowed' 
                  : 'hover:bg-[#2C2D33] hover:text-white'
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
      </div>
    </div>
  );
}

export default Table;
