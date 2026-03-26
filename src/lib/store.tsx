'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { Task, Project, TeamMember, Activity, mockTasks, mockProjects, mockTeam, mockActivities } from './types';

type View = 'dashboard' | 'tasks' | 'calendar' | 'projects' | 'team';

interface AppContextType {
  currentView: View;
  setCurrentView: (view: View) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  team: TeamMember[];
  activities: Activity[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const data = loadFromStorage('solarpm-data', { tasks: null });
    return data.tasks ?? mockTasks;
  });
  const [projects, setProjects] = useState<Project[]>(() => {
    const data = loadFromStorage('solarpm-data', { projects: null });
    return data.projects ?? mockProjects;
  });
  const [team] = useState<TeamMember[]>(mockTeam);
  const [activities] = useState<Activity[]>(mockActivities);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('solarpm-data', JSON.stringify({ tasks, projects }));
  }, [tasks, projects]);

  return (
    <AppContext.Provider value={{ currentView, setCurrentView, tasks, setTasks, projects, setProjects, team, activities }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}