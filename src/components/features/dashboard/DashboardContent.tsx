'use client';

import { useMemo } from 'react';
import { Trophy, ListTodo, Brain, Zap } from 'lucide-react';
import { MetricCard } from '@/components/features/metrics/MetricCard';
import { TaskList } from '@/components/features/tasks/TaskList';
import { ScheduleTimeline } from '@/components/features/agenda/ScheduleTimeline';
import { HabitList } from '@/components/features/habits/HabitList';
import { useUserStore } from '@/store/userStore';
import { useTaskStore } from '@/store/taskStore';
import { useHabitStore } from '@/store/habitStore';

const ANIMATION_DELAY_SECTION = '50ms';
const ANIMATION_DELAY_TASKS = '100ms';

export function DashboardContent() {
  const user = useUserStore((s) => s.user);
  const tasks = useTaskStore((s) => s.tasks);
  const habits = useHabitStore((s) => s.habits);

  const pendingTasks = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );
  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedHabits = useMemo(
    () => habits.filter((h) => h.completed).length,
    [habits]
  );
  const totalHabits = useMemo(() => habits.length, [habits]);

  const now = new Date();
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const day = now.getDate();
  const month = now.toLocaleDateString('en-US', { month: 'long' });

  return (
    <>
      <div className="mb-1">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Welcome, {user.name}!
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          {dayOfWeek}, {day} {month}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon={<Trophy size={18} />}
          label="Level"
          value={user.level}
          max={20}
        />
        <MetricCard
          icon={<ListTodo size={18} />}
          label="Tasks"
          value={pendingTasks}
          max={totalTasks}
        />
        <MetricCard
          icon={<Brain size={18} />}
          label="Habits"
          value={completedHabits}
          max={totalHabits}
        />
        <MetricCard
          icon={<Zap size={18} />}
          label="XP"
          value={user.experience}
          max={user.experienceToNextLevel}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-fade-in">
            <HabitList />
          </div>
        </div>
        <div className="space-y-6">
          <div
            className="animate-fade-in"
            style={{ animationDelay: ANIMATION_DELAY_SECTION }}
          >
            <ScheduleTimeline />
          </div>
        </div>
      </div>

      <div
        className="mt-6 animate-fade-in"
        style={{ animationDelay: ANIMATION_DELAY_TASKS }}
      >
        <TaskList />
      </div>
    </>
  );
}
