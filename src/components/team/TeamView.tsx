'use client';

import { useApp } from '@/lib/store';

export default function TeamView() {
  const { team, tasks } = useApp();

  const getMemberStats = (memberId: string) => {
    const memberTasks = tasks.filter(t => t.assigneeId === memberId);
    const assigned = memberTasks.length;
    const inProgress = memberTasks.filter(t => t.status === 'in_progress').length;
    const completed = memberTasks.filter(t => t.status === 'completed').length;
    return { assigned, inProgress, completed };
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Team</h1>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
          + Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {team.map((member) => {
          const stats = getMemberStats(member.id);
          
          return (
            <div key={member.id} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-slate-800 text-lg">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-slate-800">{stats.assigned}</p>
                  <p className="text-xs text-slate-500">Assigned</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-blue-600">{stats.inProgress}</p>
                  <p className="text-xs text-slate-500">In Progress</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-lg font-bold text-emerald-600">{stats.completed}</p>
                  <p className="text-xs text-slate-500">Completed</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-amber-600 transition-colors justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {member.email}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}