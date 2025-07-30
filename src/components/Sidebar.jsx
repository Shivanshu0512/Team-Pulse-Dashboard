import React from 'react';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  BarChart3, 
  Settings
} from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { currentRole } = useSelector(state => state.role);

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