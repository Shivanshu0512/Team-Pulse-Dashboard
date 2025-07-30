import React from 'react';
import { useSelector } from 'react-redux';
import { Calendar, Clock, User, AlertTriangle } from 'lucide-react';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';

const UpcomingTasks = () => {
  const members = useSelector(state => state.members.members);
  
  // Get all tasks from all members
  const allTasks = members.flatMap(member => 
    member.tasks
      .filter(task => !task.completed)
      .map(task => ({
        ...task,
        memberName: member.name,
        memberAvatar: member.avatar
      }))
  );

  // Sort by due date
  const sortedTasks = allTasks.sort((a, b) => 
    new Date(a.dueDate) - new Date(b.dueDate)
  );

  const getTaskUrgency = (dueDate) => {
    const today = new Date();
    const due = parseISO(dueDate);
    const threeDaysFromNow = addDays(today, 3);
    
    if (isBefore(due, today)) return 'overdue';
    if (isBefore(due, threeDaysFromNow)) return 'urgent';
    return 'normal';
  };

  const getUrgencyStyle = (urgency) => {
    switch (urgency) {
      case 'overdue':
        return 'border-l-red-500 bg-red-50';
      case 'urgent':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-white';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
          {sortedTasks.length} active
        </span>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No upcoming tasks</p>
          </div>
        ) : (
          sortedTasks.map(task => {
            const urgency = getTaskUrgency(task.dueDate);
            const dueDate = parseISO(task.dueDate);
            
            return (
              <div
                key={`${task.memberName}-${task.id}`}
                className={`border-l-4 p-4 rounded-r-lg ${getUrgencyStyle(urgency)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={task.memberAvatar}
                        alt={task.memberName}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {task.memberName}
                      </span>
                      {urgency === 'overdue' && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {format(dueDate, 'MMM dd')}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <div className="w-full bg-gray-200 rounded-full h-2 max-w-20">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{task.progress}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {urgency === 'overdue' && (
                      <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                        Overdue
                      </span>
                    )}
                    {urgency === 'urgent' && (
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                        Due Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;