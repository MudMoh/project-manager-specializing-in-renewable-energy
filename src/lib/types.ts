export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'not_started' | 'in_progress' | 'on_hold' | 'completed';
export type ProjectPhase = 'planning' | 'procurement' | 'installation' | 'testing' | 'commissioning';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  projectId: string;
  dueDate: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  phase: ProjectPhase;
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  capacity: number;
  installed: number;
}

export interface Activity {
  id: string;
  type: 'task' | 'project' | 'team';
  action: string;
  description: string;
  timestamp: string;
}

export const mockTeam: TeamMember[] = [
  { id: '1', name: 'Sarah Chen', role: 'Project Manager', avatar: 'SC', email: 'sarah@solarpm.com' },
  { id: '2', name: 'Mike Rodriguez', role: 'Lead Installer', avatar: 'MR', email: 'mike@solarpm.com' },
  { id: '3', name: 'Emily Johnson', role: 'Electrical Engineer', avatar: 'EJ', email: 'emily@solarpm.com' },
  { id: '4', name: 'David Kim', role: 'Site Surveyor', avatar: 'DK', email: 'david@solarpm.com' },
  { id: '5', name: 'Lisa Thompson', role: 'Permit Specialist', avatar: 'LT', email: 'lisa@solarpm.com' },
];

export const mockProjects: Project[] = [
  { id: '1', name: 'Riverside Residential', client: 'John Smith', location: '123 Riverside Dr', phase: 'installation', progress: 65, startDate: '2026-01-15', endDate: '2026-02-28', team: ['1', '2', '3'], capacity: 8500, installed: 5500 },
  { id: '2', name: 'TechCorp Office', client: 'TechCorp Inc', location: '500 Innovation Blvd', phase: 'commissioning', progress: 95, startDate: '2026-01-01', endDate: '2026-02-15', team: ['1', '2', '3', '4'], capacity: 25000, installed: 23750 },
  { id: '3', name: 'Sunny Acres Farm', client: 'Green Farms LLC', location: '45 Meadow Lane', phase: 'planning', progress: 20, startDate: '2026-03-01', endDate: '2026-04-30', team: ['1', '4', '5'], capacity: 15000, installed: 0 },
  { id: '4', name: 'Marina Bay Condos', client: 'Marina Developments', location: '78 Coastal Way', phase: 'procurement', progress: 40, startDate: '2026-02-01', endDate: '2026-04-15', team: ['1', '2', '5'], capacity: 42000, installed: 0 },
  { id: '5', name: 'Oakwood High School', client: 'Oakwood School District', location: '1000 Education Pkwy', phase: 'testing', progress: 85, startDate: '2025-12-01', endDate: '2026-02-01', team: ['1', '2', '3', '4'], capacity: 75000, installed: 63750 },
];

export const mockTasks: Task[] = [
  { id: '1', title: 'Complete electrical wiring inspection', description: 'Final inspection of all electrical connections', status: 'in_progress', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-10', createdAt: '2026-01-20' },
  { id: '2', title: 'Install panel mounting rails', description: 'Mount rails for solar panel installation', status: 'in_progress', priority: 'high', assigneeId: '2', projectId: '1', dueDate: '2026-02-12', createdAt: '2026-01-25' },
  { id: '3', title: 'Submit permit application', description: 'Submit revised permit documents', status: 'completed', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-02-01', createdAt: '2026-01-15' },
  { id: '4', title: 'Conduct site survey', description: 'Final site assessment for installation planning', status: 'not_started', priority: 'medium', assigneeId: '4', projectId: '3', dueDate: '2026-03-05', createdAt: '2026-01-28' },
  { id: '5', title: 'Order inverter equipment', description: 'Purchase and schedule delivery of inverters', status: 'on_hold', priority: 'medium', assigneeId: '1', projectId: '4', dueDate: '2026-02-20', createdAt: '2026-01-22' },
  { id: '6', title: 'Connect grid tie system', description: 'Install and connect grid interconnection', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-02-08', createdAt: '2026-01-30' },
  { id: '7', title: 'Safety equipment check', description: 'Verify all safety equipment is present', status: 'completed', priority: 'low', assigneeId: '2', projectId: '1', dueDate: '2026-01-30', createdAt: '2026-01-20' },
  { id: '8', title: 'Client walkthrough', description: 'Final client demonstration', status: 'not_started', priority: 'medium', assigneeId: '1', projectId: '2', dueDate: '2026-02-14', createdAt: '2026-01-28' },
  { id: '9', title: 'Documentation review', description: 'Review all project documentation', status: 'in_progress', priority: 'low', assigneeId: '5', projectId: '5', dueDate: '2026-02-05', createdAt: '2026-01-25' },
  { id: '10', title: 'Panel alignment calibration', description: 'Calibrate panel positioning system', status: 'on_hold', priority: 'medium', assigneeId: '2', projectId: '1', dueDate: '2026-02-18', createdAt: '2026-01-27' },
];

export const mockActivities: Activity[] = [
  { id: '1', type: 'task', action: 'completed', description: 'Safety equipment check completed', timestamp: '2026-01-30T14:30:00' },
  { id: '2', type: 'project', action: 'updated', description: 'TechCorp Office moved to Commissioning', timestamp: '2026-01-30T11:15:00' },
  { id: '3', type: 'task', action: 'created', description: 'New task: Client walkthrough', timestamp: '2026-01-28T16:45:00' },
  { id: '4', type: 'team', action: 'assigned', description: 'David Kim assigned to Sunny Acres Farm', timestamp: '2026-01-28T10:20:00' },
  { id: '5', type: 'project', action: 'started', description: 'Marina Bay Condos project initiated', timestamp: '2026-01-27T09:00:00' },
];

export const priorityColors: Record<Priority, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#22C55E',
};

export const statusLabels: Record<TaskStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
};

export const phaseLabels: Record<ProjectPhase, string> = {
  planning: 'Planning',
  procurement: 'Procurement',
  installation: 'Installation',
  testing: 'Testing',
  commissioning: 'Commissioning',
};

export const phaseColors: Record<ProjectPhase, string> = {
  planning: '#3B82F6',
  procurement: '#8B5CF6',
  installation: '#F59E0B',
  testing: '#06B6D4',
  commissioning: '#22C55E',
};
