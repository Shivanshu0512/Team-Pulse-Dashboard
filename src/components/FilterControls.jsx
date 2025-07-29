import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setSortBy } from '../redux/slices/membersSlice';
import { Filter, ArrowUpDown } from 'lucide-react';

const FilterControls = () => {
  const dispatch = useDispatch();
  const { filter, sortBy } = useSelector(state => state.members);

  const filterOptions = [
    { value: 'all', label: 'All Members' },
    { value: 'Working', label: 'Working' },
    { value: 'Break', label: 'On Break' },
    { value: 'Meeting', label: 'In Meeting' },
    { value: 'Offline', label: 'Offline' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'tasks', label: 'Active Tasks' },
    { value: 'status', label: 'Status' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <label className="text-sm font-medium text-gray-700 mr-2">Filter:</label>
            <select
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center">
          <ArrowUpDown className="h-4 w-4 text-gray-500 mr-2" />
          <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;