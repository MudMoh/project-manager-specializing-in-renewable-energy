# Solar Project Manager - Specification

## 1. Project Overview

**Project Name**: Solar Project Manager
**Type**: Web Application (Dashboard/Project Management)
**Core Functionality**: A comprehensive project management tool for solar installation companies to track projects, tasks, teams, and schedules.
**Target Users**: Solar installation project managers, team leads, and administrators.

---

## 2. UI/UX Specification

### Layout Structure

- **Sidebar**: Fixed left sidebar (280px width), dark theme (#0F172A), collapsible on mobile
- **Main Content**: Flexible width, scrollable content area
- **Header**: Sticky top bar with search, notifications, and user profile

### Responsive Breakpoints
- Mobile: < 768px (sidebar becomes hamburger menu)
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette**:
- Primary: #F59E0B (Amber/Solar)
- Primary Dark: #D97706
- Secondary: #10B981 (Emerald/Success)
- Accent: #3B82F6 (Blue)
- Background: #F8FAFC
- Card Background: #FFFFFF
- Sidebar: #0F172A (Slate 900)
- Text Primary: #1E293B
- Text Secondary: #64748B
- Border: #E2E8F0

**Typography**:
- Font Family: "Outfit", system-ui, sans-serif
- Headings: 
  - H1: 32px, font-weight 700
  - H2: 24px, font-weight 600
  - H3: 18px, font-weight 600
- Body: 14px, font-weight 400
- Small: 12px

**Spacing System**: 4px base unit (4, 8, 12, 16, 24, 32, 48)

**Visual Effects**:
- Card shadows: 0 1px 3px rgba(0,0,0,0.1)
- Hover transitions: 200ms ease
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)

### Components

**Sidebar**:
- Logo at top (Sun icon + "SolarPM")
- Navigation items with icons
- Active state: amber background highlight
- Hover: slight background lighten

**Dashboard Cards**:
- Stats cards with icon, value, label, and trend indicator
- White background, subtle shadow
- Hover: elevate shadow

**Task Board (Kanban)**:
- 4 columns: Not Started, In Progress, On Hold, Completed
- Column headers with task count badges
- Task cards with: title, priority badge, assignee avatar, due date
- Drag-and-drop visual feedback (not functional in this version)

**Calendar**:
- Month view grid
- Navigation arrows for prev/next month
- Days with task indicators (colored dots)
- Today highlighted

**Projects View**:
- Grid of project cards (3 columns desktop)
- Each card shows: project name, client, phase, progress bar, stats
- Phase badges: Planning (blue), Procurement (purple), Installation (amber), Testing (cyan), Commissioning (green)

**Team View**:
- Grid of team member cards
- Avatar, name, role
- Task statistics: assigned, in progress, completed

---

## 3. Functionality Specification

### Core Features

1. **Dashboard**
   - Display 4 stat cards: Total Projects, Active Tasks, Team Members, Completion Rate
   - Show project progress chart (horizontal bars)
   - Recent activity feed (last 5 items)
   - Upcoming deadlines (next 5 tasks)

2. **Task Management**
   - View tasks in Kanban board format
   - Filter by priority (All, High, Medium, Low)
   - Filter by assignee
   - Search tasks by title
   - Create new task (modal form)
   - Edit existing task

3. **Calendar**
   - Month view with task indicators
   - Navigate between months
   - Click on day to see tasks

4. **Projects**
   - Grid view of all projects
   - Track project phases
   - Show completion percentage

5. **Team**
   - View team members
   - See individual task statistics

### Data Handling
- All data stored in React state (useState)
- Initial mock data provided
- LocalStorage persistence for state

### User Interactions
- Click navigation items to switch views
- Click task cards to view details
- Use filters to narrow down tasks
- Form inputs for creating/editing tasks

---

## 4. Acceptance Criteria

1. Application loads without errors
2. Sidebar navigation switches between all 5 views (Dashboard, Tasks, Calendar, Projects, Team)
3. Dashboard displays stats, progress, activity, and deadlines
4. Task board shows tasks in 4 columns with filtering working
5. Calendar displays month view with navigation
6. Projects view shows project cards with phases
7. Team view shows member cards
8. All colors match specification
9. Responsive layout works on different screen sizes
10. No TypeScript or ESLint errors
