import React from 'react';
import { useSelector } from 'react-redux';
import { Users, Clock, Coffee, Video, WifiOff, TrendingUp, CheckCircle } from 'lucide-react';
import MetricCard from './MetricCard';

const TeamOverview = () => {
  const members = useSelector(state => state.members.members);
  
  const statusCounts = members.reduce((counts, member) => {
    counts[member.status] = (counts[member.status] || 0) + 1;
    return counts;
  }, {});

  const totalTasks = members.reduce((total, member) => total + member.tasks.length, 0);
  const completedTasks = members.reduce((total, member) => 
    total + member.tasks.filter(task => task.completed).length, 0
  );
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Team Members"
          value={members.length}
          subtitle="Active employees"
          icon={Users}
          color="blue"
          trend={{ direction: 'up', value: '+2 this month' }}
        />
        
        <MetricCard
          title="Active Tasks"
          value={activeTasks}
          subtitle="In progress"
          icon={Clock}
          color="yellow"
          trend={{ direction: 'up', value: `${completionRate}% complete` }}
        />
        
        <MetricCard
          title="Completed Tasks"
          value={completedTasks}
          subtitle="This month"
          icon={CheckCircle}
          color="green"
          trend={{ direction: 'up', value: '+15% vs last month' }}
        />
        
        <MetricCard
          title="Team Productivity"
          value={`${completionRate}%`}
          subtitle="Overall completion rate"
          icon={TrendingUp}
          color="purple"
          trend={{ direction: 'up', value: '+5% this week' }}
        />
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Status Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Working</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Working || 0}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Coffee className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Break</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Break || 0}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Meeting</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Meeting || 0}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-gray-100 rounded-lg">
                <WifiOff className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Offline</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.Offline || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Sarah Wilson completed "Q4 Report"</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Mike Johnson joined a meeting</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Emily Davis took a break</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New task assigned to John Doe</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;