'use client';

import { useApp } from '@/lib/store';
import { phaseLabels, phaseColors } from '@/lib/types';

export default function ProjectsView() {
  const { projects, team, tasks } = useApp();

  const getMemberName = (id: string) => team.find(m => m.id === id)?.name || 'Unknown';
  const getProjectTasks = (projectId: string) => tasks.filter(t => t.projectId === projectId);
  const getProjectStats = (projectId: string) => {
    const projectTasks = getProjectTasks(projectId);
    const total = projectTasks.length;
    const completed = projectTasks.filter(t => t.status === 'completed').length;
    const inProgress = projectTasks.filter(t => t.status === 'in_progress').length;
    return { total, completed, inProgress };
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Projects</h1>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const stats = getProjectStats(project.id);
          
          return (
            <div key={project.id} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">{project.name}</h3>
                  <p className="text-sm text-slate-500">{project.client}</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${phaseColors[project.phase]}20`, color: phaseColors[project.phase] }}
                >
                  {phaseLabels[project.phase]}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium text-slate-700">{project.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${project.progress}%`, backgroundColor: phaseColors[project.phase] }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-slate-800">{stats.total}</p>
                  <p className="text-xs text-slate-500">Total</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-blue-600">{stats.inProgress}</p>
                  <p className="text-xs text-slate-500">Active</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2">
                  <p className="text-lg font-semibold text-emerald-600">{stats.completed}</p>
                  <p className="text-xs text-slate-500">Done</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400 mb-2">Team</p>
                <div className="flex -space-x-2">
                  {project.team.slice(0, 4).map((memberId) => (
                    <div
                      key={memberId}
                      className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600"
                      title={getMemberName(memberId)}
                    >
                      {team.find(m => m.id === memberId)?.avatar}
                    </div>
                  ))}
                  {project.team.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-500">
                      +{project.team.length - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{project.location}</span>
                <span>{new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}