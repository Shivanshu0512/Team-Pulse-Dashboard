import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';
import { Users, UserCog } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);

  const handleRoleSwitch = () => {
    const newRole = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">Team Pulse Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome back, <span className="font-semibold text-gray-900">{currentUser}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
              </span>
              
              <button
                onClick={handleRoleSwitch}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 bg-gray-200"
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;