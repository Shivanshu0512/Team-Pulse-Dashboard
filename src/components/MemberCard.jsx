import React from 'react';
import { Clock, CheckCircle, AlertCircle, Users, Coffee, Video, WifiOff } from 'lucide-react';

const MemberCard = ({ member, isCurrentUser, onStatusChange }) => {
  const statusConfig = {
    Working: { 
      color: 'bg-green-100 text-green-800 border-green-200', 
      icon: Clock, 
      dotColor: 'bg-green-400' 
    },
    Break: { 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      icon: Coffee, 
      dotColor: 'bg-yellow-400' 
    },
    Meeting: { 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      icon: Video, 
      dotColor: 'bg-blue-400' 
    },
    Offline: { 
      color: 'bg-gray-100 text-gray-800 border-gray-200', 
      icon: WifiOff, 
      dotColor: 'bg-gray-400' 
    }
  };

  const config = statusConfig[member.status];
  const StatusIcon = config.icon;
  const activeTasks = member.tasks.filter(task => !task.completed).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${config.dotColor}`}></div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.email}</p>
          </div>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
          <StatusIcon className="h-4 w-4 mr-1" />
          {member.status}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>{member.tasks.filter(t => t.completed).length} completed</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>{activeTasks} active</span>
          </div>
        </div>
        
        {isCurrentUser && onStatusChange && (
          <div className="flex space-x-1">
            {Object.keys(statusConfig).map(status => {
              const isActive = member.status === status;
              const statusIcon = statusConfig[status].icon;
              const StatusIconComponent = statusIcon;
              
              return (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                  title={status}
                >
                  <StatusIconComponent className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;