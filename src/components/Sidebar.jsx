import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchRole } from '../redux/slices/roleSlice';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings,
  UserCog,
  User
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);

  const handleRoleSwitch = () => {
    const newRole = currentRole === 'lead' ? 'member' : 'lead';
    dispatch(switchRole(newRole));
  };

  const leadNavItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'tasks', label: 'Task Management', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const memberNavItems = [
    { id: 'overview', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: ClipboardList },
  ];

  const navItems = currentRole === 'lead' ? leadNavItems : memberNavItems;

  return (
    <div className="bg-slate-800 text-white w-64 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Team Pulse</h1>
            <p className="text-slate-400 text-sm">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Role Switch Section */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {currentRole === 'lead' ? (
                <UserCog className="h-5 w-5 text-blue-400" />
              ) : (
                <User className="h-5 w-5 text-green-400" />
              )}
              <span className="text-sm font-medium">
                {currentRole === 'lead' ? 'Team Lead' : 'Team Member'}
              </span>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 mb-3">{currentUser}</p>
          
          <button
            onClick={handleRoleSwitch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Switch to {currentRole === 'lead' ? 'Member' : 'Lead'} View
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;