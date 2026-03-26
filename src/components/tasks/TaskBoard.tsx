'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Task, TaskStatus, Priority, statusLabels, priorityColors } from '@/lib/types';

const columns: { status: TaskStatus; color: string }[] = [
  { status: 'not_started', color: '#64748B' },
  { status: 'in_progress', color: '#3B82F6' },
  { status: 'on_hold', color: '#F59E0B' },
  { status: 'completed', color: '#22C55E' },
];

export default function TaskBoard() {
  const { tasks, setTasks, team } = useApp();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const getMemberName = (id: string) => team.find(m => m.id === id)?.name || 'Unknown';
  const getMemberAvatar = (id: string) => team.find(m => m.id === id)?.avatar || '?';

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assigneeId === assigneeFilter;
    return matchesSearch && matchesPriority && matchesAssignee;
  });

  const getTasksByStatus = (status: TaskStatus) => filteredTasks.filter(t => t.status === status);

  const handleSaveTask = (task: Partial<Task>) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...task } as Task : t));
    } else {
      const newTask: Task = {
        id: String(Date.now()),
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'not_started',
        priority: task.priority || 'medium',
        assigneeId: task.assigneeId || team[0].id,
        projectId: task.projectId || '1',
        dueDate: task.dueDate || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, newTask]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Tasks</h1>
        <button
          onClick={() => { setEditingTask(null); setShowModal(true); }}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
        >
          + New Task
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Assignees</option>
          {team.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-0">
        {columns.map((col) => (
          <div key={col.status} className="bg-slate-50 rounded-lg p-4 flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: col.color }} />
              <h3 className="font-semibold text-slate-700">{statusLabels[col.status]}</h3>
              <span className="ml-auto bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full">
                {getTasksByStatus(col.status).length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3">
              {getTasksByStatus(col.status).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  memberName={getMemberName(task.assigneeId)}
                  memberAvatar={getMemberAvatar(task.assigneeId)}
                  onEdit={() => { setEditingTask(task); setShowModal(true); }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}

function TaskCard({ task, memberName, memberAvatar, onEdit }: { task: Task; memberName: string; memberAvatar: string; onEdit: () => void }) {
  return (
    <div
      onClick={onEdit}
      className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-slate-700 text-sm line-clamp-2">{task.title}</h4>
      </div>
      <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{ backgroundColor: `${priorityColors[task.priority]}20`, color: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{new Date(task.dueDate).toLocaleDateString()}</span>
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
            {memberAvatar}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskModal({ task, onSave, onClose }: { task: Task | null; onSave: (task: Partial<Task>) => void; onClose: () => void }) {
  const [form, setForm] = useState<Partial<Task>>(task || {
    title: '',
    description: '',
    status: 'not_started',
    priority: 'medium',
    assigneeId: '1',
    projectId: '1',
    dueDate: new Date().toISOString().split('T')[0],
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">{task ? 'Edit Task' : 'New Task'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-800">Cancel</button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}