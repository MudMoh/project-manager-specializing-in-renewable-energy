'use client';

import { AppProvider, useApp } from '@/lib/store';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import TaskBoard from '@/components/tasks/TaskBoard';
import CalendarView from '@/components/calendar/CalendarView';
import ProjectsView from '@/components/projects/ProjectsView';
import TeamView from '@/components/team/TeamView';

function MainContent() {
  const { currentView } = useApp();

  const views = {
    dashboard: <Dashboard />,
    tasks: <TaskBoard />,
    calendar: <CalendarView />,
    projects: <ProjectsView />,
    team: <TeamView />,
  };

  return (
    <main className="ml-[280px] p-8 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {views[currentView]}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <Sidebar />
        <MainContent />
      </div>
    </AppProvider>
  );
}