'use client';

import { Calendar, Flame, Trophy, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { useHabitStore } from '@/store/habitStore';

export function HabitStats() {
  const habits = useHabitStore((s) => s.habits);
  const completed = habits.filter((h) => h.completed).length;
  const total = habits.length;
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const bestStreak = Math.max(...habits.map((h) => h.bestStreak), 0);
  const totalExp = habits.reduce((sum, h) => sum + h.experience, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card hover>
        <div className="flex items-center gap-2 text-text-secondary">
          <Calendar size={18} className="text-primary" />
          <span className="text-sm font-medium">Today</span>
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight">
          {completed}
          <span className="text-sm font-normal text-text-secondary">
            {' '}
            / {total}
          </span>
        </span>
        <Progress value={completed} max={total} glow />
      </Card>

      <Card hover>
        <div className="flex items-center gap-2 text-text-secondary">
          <Flame size={18} className="text-orange-500" />
          <span className="text-sm font-medium">Streak</span>
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight">
          {totalStreak}
          <span className="text-sm font-normal text-text-secondary">
            {' '}
            days
          </span>
        </span>
      </Card>

      <Card hover>
        <div className="flex items-center gap-2 text-text-secondary">
          <Trophy size={18} className="text-yellow-500" />
          <span className="text-sm font-medium">Major Streak</span>
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight">
          {bestStreak}
          <span className="text-sm font-normal text-text-secondary">
            {' '}
            days
          </span>
        </span>
      </Card>

      <Card hover>
        <div className="flex items-center gap-2 text-text-secondary">
          <Sparkles size={18} className="text-purple-500" />
          <span className="text-sm font-medium">Available EXP</span>
        </div>
        <span className="text-xl font-bold text-foreground tracking-tight">
          {totalExp}
        </span>
      </Card>
    </div>
  );
}
