'use client';

import { useApp } from '@/lib/store';
import { phaseLabels, phaseColors } from '@/lib/types';

export default function Dashboard() {
  const { projects, tasks, team, activities } = useApp();

  const totalProjects = projects.length;
  const activeTasks = tasks.filter(t => t.status === 'in_progress').length;
  const teamMembers = team.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completionRate = Math.round((completedTasks / tasks.length) * 100);

  const upcomingTasks = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const getMemberName = (id: string) => team.find(m => m.id === id)?.name || 'Unknown';

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <span className="text-sm text-slate-500">Welcome back, Sarah</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Projects" value={totalProjects} icon="📊" trend="+2 this month" />
        <StatCard label="Active Tasks" value={activeTasks} icon="⚡" trend="8 due this week" />
        <StatCard label="Team Members" value={teamMembers} icon="👥" trend="All active" />
        <StatCard label="Completion Rate" value={`${completionRate}%`} icon="🎯" trend="+5% from last month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Project Progress</h2>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700">{project.name}</span>
                  <span className="text-xs text-slate-500">{project.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${project.progress}%`, backgroundColor: phaseColors[project.phase] }}
                  />
                </div>
                <span className="text-xs text-slate-400 mt-1 inline-block">{phaseLabels[project.phase]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'task' ? 'bg-amber-500' : activity.type === 'project' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <div>
                  <p className="text-sm text-slate-700">{activity.description}</p>
                  <span className="text-xs text-slate-400">{formatTime(activity.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Upcoming Deadlines</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-500 uppercase">
                <th className="pb-3 font-medium">Task</th>
                <th className="pb-3 font-medium">Assignee</th>
                <th className="pb-3 font-medium">Due Date</th>
                <th className="pb-3 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {upcomingTasks.map((task) => (
                <tr key={task.id} className="border-t border-slate-100">
                  <td className="py-3 text-slate-700">{task.title}</td>
                  <td className="py-3 text-slate-500">{getMemberName(task.assigneeId)}</td>
                  <td className="py-3 text-slate-500">{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: { label: string; value: string | number; icon: string; trend: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
          <p className="text-xs text-slate-400 mt-2">{trend}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}