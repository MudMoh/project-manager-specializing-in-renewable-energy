'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { priorityColors } from '@/lib/types';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function CalendarView() {
  const { tasks, team } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(2026, 1, 25);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTasksForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.dueDate === dateStr);
  };

  const isToday = (day: number) => 
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const selectedDateTasks = selectedDate 
    ? tasks.filter(t => t.dueDate === selectedDate)
    : [];

  const getMemberName = (id: string) => team.find(m => m.id === id)?.name || 'Unknown';

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Calendar</h1>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="flex-1 bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-slate-800">
              {monthNames[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              const dayTasks = day ? getTasksForDate(day) : [];
              const dateStr = day ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : '';
              const isSelected = selectedDate === dateStr;
              
              return (
                <div
                  key={idx}
                  onClick={() => day && setSelectedDate(dateStr)}
                  className={`min-h-[80px] p-2 border border-slate-100 rounded-lg cursor-pointer transition-colors ${
                    day ? 'hover:bg-slate-50' : 'bg-slate-50'
                  } ${isSelected ? 'bg-amber-50 border-amber-500' : ''} ${isToday(day!) ? 'ring-2 ring-amber-500' : ''}`}
                >
                  {day && (
                    <>
                      <span className={`text-sm font-medium ${isToday(day) ? 'text-amber-600' : 'text-slate-700'}`}>
                        {day}
                      </span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {dayTasks.slice(0, 3).map((task) => (
                          <div
                            key={task.id}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: priorityColors[task.priority] }}
                          />
                        ))}
                        {dayTasks.length > 3 && (
                          <span className="text-xs text-slate-400">+{dayTasks.length - 3}</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="w-80 bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            {selectedDateTasks.length === 0 ? (
              <p className="text-sm text-slate-500">No tasks for this date</p>
            ) : (
              <div className="space-y-3">
                {selectedDateTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div
                        className="w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: priorityColors[task.priority] }}
                      />
                      <div>
                        <p className="font-medium text-slate-700 text-sm">{task.title}</p>
                        <p className="text-xs text-slate-500 mt-1">Assigned to: {getMemberName(task.assigneeId)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}