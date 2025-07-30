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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 w-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${config.dotColor}`}></div>
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{member.name}</h3>
            <p className="text-sm text-gray-600 break-all">{member.email}</p>
          </div>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border flex-shrink-0 ${config.color}`}>
          <StatusIcon className="h-4 w-4 mr-1" />
          {member.status}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{member.tasks.filter(t => t.completed).length} completed</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{activeTasks} active</span>
            </div>
          </div>
        </div>
        
        {isCurrentUser && onStatusChange && (
          <div className="pt-2 border-t border-gray-100">
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(statusConfig).map(status => {
                const isActive = member.status === status;
                const statusIcon = statusConfig[status].icon;
                const StatusIconComponent = statusIcon;
                
                return (
                  <button
                    key={status}
                    onClick={() => onStatusChange(status)}
                    className={`p-3 rounded-lg transition-colors duration-200 flex flex-col items-center justify-center space-y-1 ${
                      isActive 
                        ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                    title={status}
                  >
                    <StatusIconComponent className="h-4 w-4" />
                    <span className="text-xs font-medium">{status}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;