import { createSlice } from '@reduxjs/toolkit';

const initialMembers = [
  {
    id: 1,
    name: 'Yash',
    email: 'yash.rajput@company.com',
    status: 'Working',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    tasks: []
  },
  {
    id: 2,
    name: 'Anjali Singh',
    email: 'anjalisingh@company.com',
    status: 'Break',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    tasks: [
      {
        id: 1,
        title: 'Complete Q4 Report',
        dueDate: '2025-01-15',
        progress: 60,
        completed: false
      }
    ]
  },
  {
    id: 3,
    name: 'Yashovardhan',
    email: 'yashovardhan@company.com',
    status: 'Meeting',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    tasks: [
      {
        id: 2,
        title: 'Client Presentation',
        dueDate: '2025-01-12',
        progress: 90,
        completed: false
      },
      {
        id: 3,
        title: 'Code Review',
        dueDate: '2025-01-10',
        progress: 100,
        completed: true
      }
    ]
  },
  {
    id: 4,
    name: 'Shreya Bhargava',
    email: 'shreyabhargava@company.com',
    status: 'Offline',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    tasks: []
  }
];

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: initialMembers,
    filter: 'all', // 'all', 'Working', 'Break', 'Meeting', 'Offline'
    sortBy: 'name' // 'name', 'tasks', 'status'
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        member.status = status;
      }
    },
    assignTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        const newTask = {
          id: Date.now(),
          title: task.title,
          dueDate: task.dueDate,
          progress: 0,
          completed: false
        };
        member.tasks.push(newTask);
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload;
      const member = state.members.find(m => m.id === memberId);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress));
          task.completed = task.progress === 100;
        }
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    }
  }
});

export const { 
  updateMemberStatus, 
  assignTask, 
  updateTaskProgress, 
  setFilter, 
  setSortBy 
} = membersSlice.actions;
export default membersSlice.reducer;