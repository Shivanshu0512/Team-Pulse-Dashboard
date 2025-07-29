import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskProgress } from '../redux/slices/membersSlice';
import { Calendar, CheckCircle, Clock, Minus, Plus } from 'lucide-react';
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';

const TaskList = ({ memberId }) => {
  const dispatch = useDispatch();
  const members = useSelector(state => state.members.members);
  const member = members.find(m => m.id === memberId);
  
  if (!member || member.tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No tasks assigned yet.</p>
      </div>
    );
  }

  const handleProgressChange = (taskId, delta) => {
    const task = member.tasks.find(t => t.id === taskId);
    if (task) {
      const newProgress = Math.max(0, Math.min(100, task.progress + delta));
      dispatch(updateTaskProgress({
        memberId,
        taskId,
        progress: newProgress
      }));
    }
  };

  const getTaskStatus = (task) => {
    const today = new Date();
    const dueDate = parseISO(task.dueDate);
    const threeDaysFromNow = addDays(today, 3);
    
    if (task.completed) return 'completed';
    if (isBefore(dueDate, today)) return 'overdue';
    if (isBefore(dueDate, threeDaysFromNow)) return 'due-soon';
    return 'normal';
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'overdue':
        return 'bg-red-50 border-red-200';
      case 'due-soon':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <Clock className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
        <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
          {member.tasks.filter(t => !t.completed).length} active
        </span>
      </div>
      
      {member.tasks.map(task => {
        const status = getTaskStatus(task);
        const dueDate = parseISO(task.dueDate);
        
        return (
          <div
            key={task.id}
            className={`rounded-lg shadow-sm border p-6 transition-all duration-200 ${getStatusStyle(status)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Due: {format(dueDate, 'MMM dd, yyyy')}</span>
                  
                  {status === 'overdue' && (
                    <span className="ml-2 text-red-600 font-medium">Overdue</span>
                  )}
                  {status === 'due-soon' && (
                    <span className="ml-2 text-yellow-600 font-medium">Due Soon</span>
                  )}
                  {status === 'completed' && (
                    <span className="ml-2 text-green-600 font-medium">Completed</span>
                  )}
                </div>
              </div>
              
              {task.completed && (
                <CheckCircle className="h-8 w-8 text-green-500" />
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-semibold text-gray-900">{task.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    task.completed ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
              
              {!task.completed && (
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleProgressChange(task.id, -10)}
                    disabled={task.progress <= 0}
                    className="flex items-center px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4 mr-1" />
                    -10%
                  </button>
                  
                  <button
                    onClick={() => handleProgressChange(task.id, 10)}
                    disabled={task.progress >= 100}
                    className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    +10%
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;