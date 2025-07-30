import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';
import { Search, Bell, ChevronDown, UserCog, Users } from 'lucide-react';

const TopHeader = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);

  const handleRoleSwitch = () => {
    const newRole = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Role Toggle */}
          <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
            </span>
            
            <button
              onClick={handleRoleSwitch}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              style={{
                backgroundColor: currentRole === 'lead' ? '#3B82F6' : '#E5E7EB'
              }}
            >
              <span
                className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center"
                style={{
                  transform: currentRole === 'lead' ? 'translateX(20px)' : 'translateX(0px)'
                }}
              >
                {currentRole === 'lead' ? (
                  <UserCog className="h-3 w-3 text-blue-600" />
                ) : (
                  <Users className="h-3 w-3 text-gray-600" />
                )}
              </span>
            </button>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
            <img
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
              alt={currentUser}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{currentUser}</p>
              <p className="text-xs text-gray-500">Admin Profile</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;