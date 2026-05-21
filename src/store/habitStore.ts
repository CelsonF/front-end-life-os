import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Habit } from '@/types';

interface HabitState {
  habits: Habit[];
  toggleHabit: (id: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'completed' | 'streak' | 'bestStreak'>) => void;
}

const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', title: 'Morning meditation', description: 'Start the day with 10 minutes of mindfulness', completed: true, icon: '🧘', streak: 12, bestStreak: 30, experience: 25 },
  { id: 'h2', title: 'Read 30 minutes', description: 'Read a book or article for personal growth', completed: false, icon: '📖', streak: 5, bestStreak: 20, experience: 20 },
  { id: 'h3', title: 'Exercise', description: 'Physical activity for health and energy', completed: false, icon: '🏋️', streak: 8, bestStreak: 45, experience: 30 },
  { id: 'h4', title: 'Drink 8 glasses of water', description: 'Stay hydrated throughout the day', completed: true, icon: '💧', streak: 15, bestStreak: 50, experience: 15 },
  { id: 'h5', title: 'Write journal', description: 'Reflect on the day and track progress', completed: false, icon: '✍️', streak: 3, bestStreak: 10, experience: 20 },
];

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: DEFAULT_HABITS,
      toggleHabit: (id) =>
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id ? { ...h, completed: !h.completed } : h
          ),
        })),
      addHabit: ({ title, description, icon, experience }) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              id: `h${Date.now()}`,
              title,
              description,
              icon,
              experience,
              completed: false,
              streak: 0,
              bestStreak: 0,
            },
          ],
        })),
    }),
    { name: 'life-os-habits' }
  )
);
