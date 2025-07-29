import React from 'react';
import { useSelector } from 'react-redux';
import { Users, Clock, Coffee, Video, WifiOff } from 'lucide-react';

const StatusSummary = () => {
  const members = useSelector(state => state.members.members);
  
  const statusCounts = members.reduce((counts, member) => {
    counts[member.status] = (counts[member.status] || 0) + 1;
    return counts;
  }, {});

  const totalTasks = members.reduce((total, member) => total + member.tasks.length, 0);
  const completedTasks = members.reduce((total, member) => 
    total + member.tasks.filter(task => task.completed).length, 0
  );

  const statusItems = [
    { status: 'Working', count: statusCounts.Working || 0, icon: Clock, color: 'text-green-600 bg-green-100' },
    { status: 'Break', count: statusCounts.Break || 0, icon: Coffee, color: 'text-yellow-600 bg-yellow-100' },
    { status: 'Meeting', count: statusCounts.Meeting || 0, icon: Video, color: 'text-blue-600 bg-blue-100' },
    { status: 'Offline', count: statusCounts.Offline || 0, icon: WifiOff, color: 'text-gray-600 bg-gray-100' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statusItems.map(({ status, count, icon: Icon, color }) => (
        <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{status}</p>
              <p className="text-2xl font-semibold text-gray-900">{count}</p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:col-span-2 lg:col-span-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-semibold text-gray-900">{members.length}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">{totalTasks}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">{completedTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSummary;