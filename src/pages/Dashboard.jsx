import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMemberStatus } from '../redux/slices/membersSlice';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import MemberCard from '../components/MemberCard';
import TaskForm from '../components/Taskform';
import TaskList from '../components/TaskList';
import TeamOverview from '../components/TeamOverview';
import UpcomingTasks from '../components/UpcomingTasks';
import FilterControls from '../components/FilterControls';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('overview');
  const { currentRole, currentUser } = useSelector(state => state.role);
  const { members, filter, sortBy } = useSelector(state => state.members);

  // Find current user member data
  const currentUserMember = members.find(member => member.name === currentUser);

  // Filter members based on status filter
  const filteredMembers = filter === 'all' 
    ? members 
    : members.filter(member => member.status === filter);

  // Sort members based on sort criteria
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'tasks':
        const aActiveTasks = a.tasks.filter(task => !task.completed).length;
        const bActiveTasks = b.tasks.filter(task => !task.completed).length;
        return bActiveTasks - aActiveTasks;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleStatusChange = (status) => {
    if (currentUserMember) {
      dispatch(updateMemberStatus({
        memberId: currentUserMember.id,
        status
      }));
    }
  };

  const renderContent = () => {
    if (currentRole === 'lead') {
      switch (activeSection) {
        case 'overview':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Overview</h1>
                <p className="text-gray-600">Monitor your team's performance and productivity</p>
              </div>
              <TeamOverview />
              <UpcomingTasks />
            </div>
          );
        case 'team':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Members</h1>
                <p className="text-gray-600">Manage your team members and their status</p>
              </div>
              <FilterControls />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedMembers.map(member => (
                  <MemberCard 
                    key={member.id} 
                    member={member}
                    isCurrentUser={false}
                  />
                ))}
              </div>
            </div>
          );
        case 'tasks':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
                <p className="text-gray-600">Assign and manage tasks for your team</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <UpcomingTasks />
                </div>
                <div>
                  <TaskForm />
                </div>
              </div>
            </div>
          );
        case 'analytics':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
                <p className="text-gray-600">Detailed insights into team performance</p>
              </div>
              <TeamOverview />
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (activeSection) {
        case 'overview':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
                <p className="text-gray-600">Update your status and manage your tasks</p>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">My Status</h2>
                    {currentUserMember && (
                      <MemberCard 
                        member={currentUserMember}
                        isCurrentUser={true}
                        onStatusChange={handleStatusChange}
                      />
                    )}
                  </div>
                </div>
                <div className="xl:col-span-2">
                  {currentUserMember && (
                    <TaskList memberId={currentUserMember.id} />
                  )}
                </div>
              </div>
            </div>
          );
        case 'tasks':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
                <p className="text-gray-600">Manage your assigned tasks and track progress</p>
              </div>
              {currentUserMember && (
                <TaskList memberId={currentUserMember.id} />
              )}
            </div>
          );
        default:
          return null;
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-1 flex flex-col">
        <TopHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;