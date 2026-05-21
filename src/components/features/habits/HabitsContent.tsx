'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HabitStats } from '@/components/features/habits/HabitStats';
import { HabitList } from '@/components/features/habits/HabitList';
import { HabitForm } from '@/components/features/habits/HabitForm';

const ANIMATION_DELAY_LIST = '50ms';

export function HabitsContent() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Habits
        </h1>
        <Button
          variant="gradient"
          onClick={() => setShowForm(true)}
          icon={<Plus size={16} />}
        >
          New Habit
        </Button>
      </div>

      <div className="animate-fade-in">
        <HabitStats />
      </div>

      <div
        className="animate-fade-in"
        style={{ animationDelay: ANIMATION_DELAY_LIST }}
      >
        <HabitList />
      </div>

      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
    </>
  );
}
