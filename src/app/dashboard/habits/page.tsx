'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { Button } from '@/components/ui/Button';
import { HabitStats } from '@/components/features/habits/HabitStats';
import { HabitList } from '@/components/features/habits/HabitList';
import { HabitForm } from '@/components/features/habits/HabitForm';

export default function HabitsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Shell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Habits</h1>
          <Button variant="gradient" onClick={() => setShowForm(true)} icon={<Plus size={16} />}>
            New Habit
          </Button>
        </div>

        <div className="animate-fade-in">
          <HabitStats />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
          <HabitList />
        </div>

        {showForm && <HabitForm onClose={() => setShowForm(false)} />}
      </div>
    </Shell>
  );
}
