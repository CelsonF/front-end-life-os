import { useMemo } from 'react';
import { useHabitStore } from '@/store/habitStore';

export function useHabits() {
  const habits = useHabitStore((s) => s.habits);
  const toggleHabit = useHabitStore((s) => s.toggleHabit);
  const addHabit = useHabitStore((s) => s.addHabit);

  const { completedHabits, totalStreak, bestStreak, totalExp } = useMemo(() => {
    const completed = habits.filter((h) => h.completed);
    const streakSum = habits.reduce((sum, h) => sum + h.streak, 0);
    const best = Math.max(...habits.map((h) => h.bestStreak), 0);
    const expSum = habits.reduce((sum, h) => sum + h.experience, 0);
    return { completedHabits: completed, totalStreak: streakSum, bestStreak: best, totalExp: expSum };
  }, [habits]);

  return {
    habits,
    completedHabits,
    completedCount: completedHabits.length,
    totalCount: habits.length,
    toggleHabit,
    addHabit,
    totalStreak,
    bestStreak,
    totalExp,
  };
}
