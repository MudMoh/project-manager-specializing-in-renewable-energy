export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'not_started' | 'in_progress' | 'on_hold' | 'completed';
export type ProjectPhase = 'site_survey' | 'design' | 'permitting' | 'procurement' | 'installation' | 'testing' | 'commissioning' | 'fat';

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
  phase: ProjectPhase;
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
  { id: '3', name: 'Sunny Acres Farm', client: 'Green Farms LLC', location: '45 Meadow Lane', phase: 'site_survey', progress: 20, startDate: '2026-03-01', endDate: '2026-04-30', team: ['1', '4', '5'], capacity: 15000, installed: 0 },
  { id: '4', name: 'Marina Bay Condos', client: 'Marina Developments', location: '78 Coastal Way', phase: 'procurement', progress: 40, startDate: '2026-02-01', endDate: '2026-04-15', team: ['1', '2', '5'], capacity: 42000, installed: 0 },
  { id: '5', name: 'Oakwood High School', client: 'Oakwood School District', location: '1000 Education Pkwy', phase: 'testing', progress: 85, startDate: '2025-12-01', endDate: '2026-02-01', team: ['1', '2', '3', '4'], capacity: 75000, installed: 63750 },
];

export const mockTasks: Task[] = [
  // ── Phase 1: Site Survey & Assessment ──────────────────────────
  { id: '101', title: 'Initial client meeting & requirements gathering', description: 'Meet with client to understand energy goals, budget, timeline, and project constraints', status: 'completed', priority: 'high', assigneeId: '1', projectId: '3', dueDate: '2026-03-02', createdAt: '2026-01-20', phase: 'site_survey' },
  { id: '102', title: 'Site access & roof inspection', description: 'Inspect roof condition, age, orientation, tilt, and structural integrity', status: 'completed', priority: 'high', assigneeId: '4', projectId: '3', dueDate: '2026-03-03', createdAt: '2026-01-20', phase: 'site_survey' },
  { id: '103', title: 'Shading analysis', description: 'Perform shading analysis using Solmetric or similar tool; document obstructions', status: 'in_progress', priority: 'high', assigneeId: '4', projectId: '3', dueDate: '2026-03-04', createdAt: '2026-01-22', phase: 'site_survey' },
  { id: '104', title: 'Electrical infrastructure assessment', description: 'Evaluate existing main panel, sub-panels, service size, and available breaker space', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-05', createdAt: '2026-01-22', phase: 'site_survey' },
  { id: '105', title: 'Utility interconnection review', description: 'Contact utility, review interconnection requirements, and net metering eligibility', status: 'not_started', priority: 'medium', assigneeId: '1', projectId: '3', dueDate: '2026-03-06', createdAt: '2026-01-24', phase: 'site_survey' },
  { id: '106', title: 'GPS & sun-path data collection', description: 'Capture GPS coordinates, altitude, and generate sun-path diagram for site', status: 'not_started', priority: 'medium', assigneeId: '4', projectId: '3', dueDate: '2026-03-06', createdAt: '2026-01-24', phase: 'site_survey' },
  { id: '107', title: 'Site photos & drone survey', description: 'Capture aerial and ground-level photos; create roof dimension sketch', status: 'not_started', priority: 'medium', assigneeId: '4', projectId: '3', dueDate: '2026-03-07', createdAt: '2026-01-24', phase: 'site_survey' },
  { id: '108', title: 'Structural engineering assessment', description: 'Engage structural engineer for roof load analysis and wind uplift calculations', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-08', createdAt: '2026-01-26', phase: 'site_survey' },
  { id: '109', title: 'Energy consumption analysis', description: 'Analyze 12 months of utility bills; calculate annual kWh usage and peak demand', status: 'in_progress', priority: 'medium', assigneeId: '1', projectId: '3', dueDate: '2026-03-05', createdAt: '2026-01-26', phase: 'site_survey' },
  { id: '110', title: 'Site survey report compilation', description: 'Compile all survey data into comprehensive site assessment report', status: 'not_started', priority: 'high', assigneeId: '4', projectId: '3', dueDate: '2026-03-10', createdAt: '2026-01-28', phase: 'site_survey' },

  // ── Phase 2: Design & Engineering ─────────────────────────────
  { id: '201', title: 'System sizing & energy modeling', description: 'Size system using PVsyst or Helioscope; model annual energy production', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-12', createdAt: '2026-01-28', phase: 'design' },
  { id: '202', title: 'Panel layout & string design', description: 'Create detailed panel layout, string configuration, and DC wiring diagram', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-14', createdAt: '2026-01-28', phase: 'design' },
  { id: '203', title: 'Inverter & BOS selection', description: 'Select inverter(s), combiner boxes, disconnects, conduit, and wiring', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-15', createdAt: '2026-01-28', phase: 'design' },
  { id: '204', title: 'AC electrical design', description: 'Design AC wiring from inverter to main panel; calculate voltage drop', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-16', createdAt: '2026-01-28', phase: 'design' },
  { id: '205', title: 'Racking & mounting design', description: 'Select racking system; design mounting layout with wind/snow load calculations', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-17', createdAt: '2026-01-28', phase: 'design' },
  { id: '206', title: 'NEC code compliance review', description: 'Verify design meets NEC 2023 Article 690, 705, and 710 requirements', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-18', createdAt: '2026-01-28', phase: 'design' },
  { id: '207', title: 'Grounding & bonding design', description: 'Design equipment grounding, system grounding, and bonding per NEC 250', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '3', dueDate: '2026-03-18', createdAt: '2026-01-28', phase: 'design' },
  { id: '208', title: 'Rapid shutdown design', description: 'Design module-level rapid shutdown per NEC 690.12 requirements', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-19', createdAt: '2026-01-28', phase: 'design' },
  { id: '209', title: 'Battery storage design (if applicable)', description: 'Design battery system including enclosure, BMS integration, and backup loads', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '3', dueDate: '2026-03-20', createdAt: '2026-01-28', phase: 'design' },
  { id: '210', title: 'Single-line diagram (SLD)', description: 'Create electrical single-line diagram showing all system components', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '3', dueDate: '2026-03-20', createdAt: '2026-01-28', phase: 'design' },
  { id: '211', title: 'Engineering stamp & PE review', description: 'Submit design package for Professional Engineer review and stamp', status: 'not_started', priority: 'high', assigneeId: '1', projectId: '3', dueDate: '2026-03-22', createdAt: '2026-01-28', phase: 'design' },
  { id: '212', title: 'Client design review & approval', description: 'Present final design to client; obtain written approval to proceed', status: 'not_started', priority: 'high', assigneeId: '1', projectId: '3', dueDate: '2026-03-24', createdAt: '2026-01-28', phase: 'design' },

  // ── Phase 3: Permitting & Approvals ───────────────────────────
  { id: '301', title: 'Prepare permit package', description: 'Compile all permit documents: SLD, site plan, structural calc, specs', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-03-26', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '302', title: 'Submit building permit application', description: 'Submit permit application to local building department with fee', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-03-27', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '303', title: 'Submit utility interconnection application', description: 'Submit interconnection request to utility company with SLD', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-03-27', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '304', title: 'HOA approval (if applicable)', description: 'Submit design to HOA for architectural review and approval', status: 'not_started', priority: 'medium', assigneeId: '5', projectId: '3', dueDate: '2026-03-28', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '305', title: 'Environmental review', description: 'Complete environmental impact assessment if required by jurisdiction', status: 'not_started', priority: 'low', assigneeId: '5', projectId: '3', dueDate: '2026-03-30', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '306', title: 'Plan check & corrections', description: 'Respond to plan check comments; submit revisions as needed', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-04-05', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '307', title: 'Obtain building permit', description: 'Receive approved building permit from local jurisdiction', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-04-08', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '308', title: 'Obtain utility approval (PTO)', description: 'Receive Permission to Operate (PTO) or interconnection approval from utility', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-04-10', createdAt: '2026-01-28', phase: 'permitting' },
  { id: '309', title: 'Fire department approval', description: 'Obtain fire department review and approval per local fire code', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '3', dueDate: '2026-04-10', createdAt: '2026-01-28', phase: 'permitting' },

  // ── Phase 4: Procurement & Supply ─────────────────────────────
  { id: '401', title: 'Solar panel procurement', description: 'Place order for solar modules; confirm delivery schedule and specs', status: 'in_progress', priority: 'high', assigneeId: '1', projectId: '4', dueDate: '2026-02-10', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '402', title: 'Inverter procurement', description: 'Purchase string/microinverters; verify warranty and delivery date', status: 'in_progress', priority: 'high', assigneeId: '1', projectId: '4', dueDate: '2026-02-12', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '403', title: 'Racking & mounting procurement', description: 'Order racking system, rails, clamps, and flashing hardware', status: 'not_started', priority: 'high', assigneeId: '1', projectId: '4', dueDate: '2026-02-15', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '404', title: 'Balance of system (BOS) procurement', description: 'Order conduit, wiring, connectors, combiner boxes, disconnects', status: 'not_started', priority: 'medium', assigneeId: '1', projectId: '4', dueDate: '2026-02-18', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '405', title: 'Monitoring system procurement', description: 'Order energy monitoring hardware and communication equipment', status: 'not_started', priority: 'medium', assigneeId: '1', projectId: '4', dueDate: '2026-02-20', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '406', title: 'Battery storage procurement (if applicable)', description: 'Purchase battery system, enclosure, and BMS components', status: 'not_started', priority: 'low', assigneeId: '1', projectId: '4', dueDate: '2026-02-22', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '407', title: 'Equipment receiving & inspection', description: 'Receive all equipment; inspect for damage and verify against PO', status: 'not_started', priority: 'high', assigneeId: '2', projectId: '4', dueDate: '2026-02-25', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '408', title: 'Equipment staging & organization', description: 'Stage equipment at site; organize by installation sequence', status: 'not_started', priority: 'medium', assigneeId: '2', projectId: '4', dueDate: '2026-02-26', createdAt: '2026-01-22', phase: 'procurement' },
  { id: '409', title: 'Warranty documentation', description: 'Collect and file all manufacturer warranty certificates', status: 'not_started', priority: 'low', assigneeId: '1', projectId: '4', dueDate: '2026-02-28', createdAt: '2026-01-22', phase: 'procurement' },

  // ── Phase 5: Installation ─────────────────────────────────────
  { id: '501', title: 'Pre-installation safety briefing', description: 'Conduct safety meeting; review JHA, PPE requirements, and emergency plan', status: 'completed', priority: 'high', assigneeId: '2', projectId: '1', dueDate: '2026-01-16', createdAt: '2026-01-10', phase: 'installation' },
  { id: '502', title: 'Scaffold & fall protection setup', description: 'Install safety scaffolding, guardrails, and fall arrest systems', status: 'completed', priority: 'high', assigneeId: '2', projectId: '1', dueDate: '2026-01-17', createdAt: '2026-01-10', phase: 'installation' },
  { id: '503', title: 'Roof preparation & penetrations', description: 'Mark roof layout; drill mounting penetrations; apply sealant flashing', status: 'completed', priority: 'high', assigneeId: '2', projectId: '1', dueDate: '2026-01-18', createdAt: '2026-01-10', phase: 'installation' },
  { id: '504', title: 'Racking & rail installation', description: 'Install mounting feet, rails, and mid/end clamps per design layout', status: 'in_progress', priority: 'high', assigneeId: '2', projectId: '1', dueDate: '2026-01-25', createdAt: '2026-01-10', phase: 'installation' },
  { id: '505', title: 'Solar panel installation', description: 'Lift and mount solar panels onto racking system; torque clamps', status: 'not_started', priority: 'high', assigneeId: '2', projectId: '1', dueDate: '2026-01-28', createdAt: '2026-01-10', phase: 'installation' },
  { id: '506', title: 'DC wiring & string connections', description: 'Connect DC strings per design; install MC4 connectors and combiner box', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '1', dueDate: '2026-01-30', createdAt: '2026-01-10', phase: 'installation' },
  { id: '507', title: 'Inverter mounting & AC wiring', description: 'Mount inverter(s); run AC conduit from inverter to main panel', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '1', dueDate: '2026-02-01', createdAt: '2026-01-10', phase: 'installation' },
  { id: '508', title: 'Grounding system installation', description: 'Install equipment grounding conductors, ground rods, and bonding jumpers', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '1', dueDate: '2026-02-03', createdAt: '2026-01-10', phase: 'installation' },
  { id: '509', title: 'Rapid shutdown device installation', description: 'Install rapid shutdown initiator and module-level shutdown devices', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '1', dueDate: '2026-02-05', createdAt: '2026-01-10', phase: 'installation' },
  { id: '510', title: 'Main panel upgrade (if needed)', description: 'Upgrade main electrical panel if required for solar interconnection', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '1', dueDate: '2026-02-05', createdAt: '2026-01-10', phase: 'installation' },
  { id: '511', title: 'Utility meter & production meter installation', description: 'Install production meter and configure utility meter for net metering', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '1', dueDate: '2026-02-07', createdAt: '2026-01-10', phase: 'installation' },
  { id: '512', title: 'Battery system installation (if applicable)', description: 'Mount battery enclosure; connect DC battery to hybrid inverter', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '1', dueDate: '2026-02-08', createdAt: '2026-01-10', phase: 'installation' },
  { id: '513', title: 'Monitoring system installation', description: 'Install energy monitoring hardware; configure Wi-Fi/cellular communication', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '1', dueDate: '2026-02-10', createdAt: '2026-01-10', phase: 'installation' },
  { id: '514', title: 'Labels & placards', description: 'Apply all NEC-required labels, danger signs, and system placards', status: 'not_started', priority: 'high', assigneeId: '2', projectId: '1', dueDate: '2026-02-11', createdAt: '2026-01-10', phase: 'installation' },
  { id: '515', title: 'Site cleanup & final inspection prep', description: 'Clean work area; remove debris; prepare site for inspection', status: 'not_started', priority: 'medium', assigneeId: '2', projectId: '1', dueDate: '2026-02-12', createdAt: '2026-01-10', phase: 'installation' },

  // ── Phase 6: Testing & Commissioning ──────────────────────────
  { id: '601', title: 'Visual inspection', description: 'Complete visual inspection of all connections, mountings, and wiring', status: 'in_progress', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-01-28', createdAt: '2026-01-20', phase: 'testing' },
  { id: '602', title: 'DC string voltage & polarity test', description: 'Measure open-circuit voltage and verify polarity of each DC string', status: 'in_progress', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-01-29', createdAt: '2026-01-20', phase: 'testing' },
  { id: '603', title: 'Insulation resistance test (Megger)', description: 'Perform insulation resistance test on DC wiring per NEC 690', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-01-30', createdAt: '2026-01-20', phase: 'testing' },
  { id: '604', title: 'Ground continuity test', description: 'Verify ground continuity for all equipment grounding conductors', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-01-30', createdAt: '2026-01-20', phase: 'testing' },
  { id: '605', title: 'I-V curve tracing', description: 'Perform I-V curve tracing on strings to verify performance', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '5', dueDate: '2026-01-31', createdAt: '2026-01-20', phase: 'testing' },
  { id: '606', title: 'AC voltage & frequency verification', description: 'Measure AC output voltage and frequency at inverter and main panel', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-02-01', createdAt: '2026-01-20', phase: 'testing' },
  { id: '607', title: 'Rapid shutdown functional test', description: 'Test rapid shutdown activation and verify voltage reduction at modules', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-02-01', createdAt: '2026-01-20', phase: 'testing' },
  { id: '608', title: 'Anti-islanding test', description: 'Verify inverter anti-islanding protection disconnects during outage', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-02-02', createdAt: '2026-01-20', phase: 'testing' },
  { id: '609', title: 'System energization', description: 'Energize system; monitor startup sequence; verify inverter operation', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '5', dueDate: '2026-02-03', createdAt: '2026-01-20', phase: 'testing' },
  { id: '610', title: 'Monitoring system verification', description: 'Verify monitoring platform receives data; confirm kWh reporting accuracy', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '5', dueDate: '2026-02-03', createdAt: '2026-01-20', phase: 'testing' },
  { id: '611', title: 'Battery system commissioning (if applicable)', description: 'Commission battery system; configure charge/discharge settings', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '5', dueDate: '2026-02-04', createdAt: '2026-01-20', phase: 'testing' },
  { id: '612', title: 'Performance ratio verification', description: 'Calculate and verify system performance ratio against design expectations', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '5', dueDate: '2026-02-05', createdAt: '2026-01-20', phase: 'testing' },
  { id: '613', title: 'Building department inspection', description: 'Schedule and pass local building department final inspection', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '5', dueDate: '2026-02-06', createdAt: '2026-01-20', phase: 'testing' },
  { id: '614', title: 'Utility final inspection', description: 'Schedule and pass utility company final interconnection inspection', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '5', dueDate: '2026-02-07', createdAt: '2026-01-20', phase: 'testing' },

  // ── Phase 7: Commissioning ────────────────────────────────────
  { id: '701', title: 'System performance baseline', description: 'Establish 30-day performance baseline; document expected output', status: 'not_started', priority: 'high', assigneeId: '1', projectId: '2', dueDate: '2026-02-10', createdAt: '2026-01-28', phase: 'commissioning' },
  { id: '702', title: 'Customer training', description: 'Train customer on system operation, monitoring app, and emergency shutdown', status: 'not_started', priority: 'high', assigneeId: '1', projectId: '2', dueDate: '2026-02-11', createdAt: '2026-01-28', phase: 'commissioning' },
  { id: '703', title: 'Operation & maintenance manual', description: 'Provide O&M manual including inspection schedule and warranty info', status: 'not_started', priority: 'medium', assigneeId: '1', projectId: '2', dueDate: '2026-02-12', createdAt: '2026-01-28', phase: 'commissioning' },
  { id: '704', title: 'Final as-built documentation', description: 'Prepare as-built drawings, final SLD, and equipment specifications', status: 'in_progress', priority: 'high', assigneeId: '5', projectId: '2', dueDate: '2026-02-12', createdAt: '2026-01-28', phase: 'commissioning' },
  { id: '705', title: 'Utility PTO application submission', description: 'Submit final PTO application to utility with all inspection approvals', status: 'not_started', priority: 'high', assigneeId: '5', projectId: '2', dueDate: '2026-02-13', createdAt: '2026-01-28', phase: 'commissioning' },
  { id: '706', title: 'Warranty registration', description: 'Register all equipment warranties with manufacturers', status: 'not_started', priority: 'medium', assigneeId: '1', projectId: '2', dueDate: '2026-02-14', createdAt: '2026-01-28', phase: 'commissioning' },
  { id: '707', title: 'Customer sign-off & project closeout', description: 'Obtain final customer sign-off; handover project documentation', status: 'not_started', priority: 'high', assigneeId: '1', projectId: '2', dueDate: '2026-02-15', createdAt: '2026-01-28', phase: 'commissioning' },

  // ── Phase 8: FAT (Factory Acceptance Testing) ─────────────────
  { id: '801', title: 'FAT test plan preparation', description: 'Create comprehensive FAT test plan with acceptance criteria', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-16', createdAt: '2026-01-28', phase: 'fat' },
  { id: '802', title: 'Inverter FAT - Power conversion test', description: 'Verify inverter DC-to-AC conversion efficiency at rated load', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-17', createdAt: '2026-01-28', phase: 'fat' },
  { id: '803', title: 'Inverter FAT - Grid synchronization test', description: 'Verify grid synchronization, frequency, and voltage regulation', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-17', createdAt: '2026-01-28', phase: 'fat' },
  { id: '804', title: 'Inverter FAT - Protection relay test', description: 'Test over/under voltage, over/under frequency, and ground fault protection', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-18', createdAt: '2026-01-28', phase: 'fat' },
  { id: '805', title: 'Inverter FAT - Communication test', description: 'Verify RS485/Ethernet/Wi-Fi communication to monitoring platform', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '2', dueDate: '2026-02-18', createdAt: '2026-01-28', phase: 'fat' },
  { id: '806', title: 'Battery FAT - Charge/discharge cycle test', description: 'Verify battery charge/discharge cycles within specified parameters', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-19', createdAt: '2026-01-28', phase: 'fat' },
  { id: '807', title: 'Battery FAT - Capacity verification', description: 'Verify battery capacity meets rated kWh specifications', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-19', createdAt: '2026-01-28', phase: 'fat' },
  { id: '808', title: 'Battery FAT - BMS function test', description: 'Verify BMS monitoring, cell balancing, and thermal management', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-20', createdAt: '2026-01-28', phase: 'fat' },
  { id: '809', title: 'Monitoring system FAT', description: 'Verify all sensors, meters, and data logging functionality', status: 'not_started', priority: 'medium', assigneeId: '3', projectId: '2', dueDate: '2026-02-20', createdAt: '2026-01-28', phase: 'fat' },
  { id: '810', title: 'Safety systems FAT', description: 'Test rapid shutdown, arc fault detection, and ground fault protection', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-21', createdAt: '2026-01-28', phase: 'fat' },
  { id: '811', title: 'FAT report & documentation', description: 'Compile FAT results, pass/fail status, and corrective actions', status: 'not_started', priority: 'high', assigneeId: '3', projectId: '2', dueDate: '2026-02-22', createdAt: '2026-01-28', phase: 'fat' },
  { id: '812', title: 'Client FAT acceptance', description: 'Present FAT results to client; obtain signed acceptance certificate', status: 'not_started', priority: 'high', assigneeId: '1', projectId: '2', dueDate: '2026-02-23', createdAt: '2026-01-28', phase: 'fat' },
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
  site_survey: 'Site Survey',
  design: 'Design & Engineering',
  permitting: 'Permitting',
  procurement: 'Procurement',
  installation: 'Installation',
  testing: 'Testing',
  commissioning: 'Commissioning',
  fat: 'FAT (Factory Acceptance Testing)',
};

export const phaseColors: Record<ProjectPhase, string> = {
  site_survey: '#06B6D4',
  design: '#8B5CF6',
  permitting: '#3B82F6',
  procurement: '#F59E0B',
  installation: '#10B981',
  testing: '#EF4444',
  commissioning: '#22C55E',
  fat: '#EC4899',
};

export const phaseOrder: ProjectPhase[] = [
  'site_survey',
  'design',
  'permitting',
  'procurement',
  'installation',
  'testing',
  'commissioning',
  'fat',
];
