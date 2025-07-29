import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';
import { Plus, Calendar, User } from 'lucide-react';

const TaskForm = () => {
  const dispatch = useDispatch();
  const members = useSelector(state => state.members.members);
  
  const [formData, setFormData] = useState({
    memberId: '',
    title: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.memberId && formData.title && formData.dueDate) {
      dispatch(assignTask({
        memberId: parseInt(formData.memberId),
        task: {
          title: formData.title,
          dueDate: formData.dueDate
        }
      }));
      
      setFormData({ memberId: '', title: '', dueDate: '' });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Plus className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Assign New Task</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="h-4 w-4 inline mr-1" />
            Assign to Member
          </label>
          <select
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          >
            <option value="">Select a team member...</option>
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.status})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter task description..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Due Date
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            min={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;