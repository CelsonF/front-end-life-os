'use client';

import { useMemo } from 'react';
import { Brain } from 'lucide-react';
import { useHabitStore } from '@/store/habitStore';
import { HabitItem } from './HabitItem';

const ANIMATION_STAGGER_MS = 30;

export function HabitList() {
  const habits = useHabitStore((s) => s.habits);
  const toggleHabit = useHabitStore((s) => s.toggleHabit);
  const done = useMemo(
    () => habits.filter((h) => h.completed).length,
    [habits]
  );

  if (habits.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-foreground">
          <Brain size={18} className="text-primary" />
          <h3 className="font-semibold text-sm tracking-tight">Daily Habits</h3>
        </div>
        <p className="text-sm text-text-secondary py-4 text-center">
          No habits yet. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-foreground">
        <Brain size={18} className="text-primary" />
        <h3 className="font-semibold text-sm tracking-tight">Daily Habits</h3>
        <span className="text-xs text-text-secondary ml-auto">
          {done}/{habits.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {habits.map((habit, i) => (
          <div
            key={habit.id}
            className="animate-fade-in"
            style={{ animationDelay: `${i * ANIMATION_STAGGER_MS}ms` }}
          >
            <HabitItem {...habit} onToggle={toggleHabit} />
          </div>
        ))}
      </div>
    </div>
  );
}
