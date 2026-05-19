import { create } from 'zustand';
import type { Task, TimeBlock } from '@/types';

interface TaskState {
  tasks: Task[];
  timeBlocks: TimeBlock[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (id: string) => void;
}

const today = new Date().toISOString().slice(0, 10);

const defaultTasks: Task[] = [
  { id: '1', title: 'Review pull request', completed: false, priority: 'high', experience: 50 },
  { id: '2', title: 'Update documentation', completed: false, priority: 'medium', experience: 30 },
  { id: '3', title: 'Fix login bug', completed: true, priority: 'high', experience: 80 },
  { id: '4', title: 'Write unit tests', completed: false, priority: 'low', experience: 20 },
  { id: '5', title: 'Refactor API client', completed: false, priority: 'high', experience: 60 },
];

const defaultTimeBlocks: TimeBlock[] = [
  { id: 'tb1', start: '08:00', end: '09:00', title: 'Morning review', color: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
  { id: 'tb2', start: '09:00', end: '10:30', title: 'Feature work', color: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
  { id: 'tb3', start: '11:00', end: '12:00', title: 'Team sync', color: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' },
  { id: 'tb4', start: '14:00', end: '15:30', title: 'Deep work', color: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400' },
  { id: 'tb5', start: '16:00', end: '17:00', title: 'Code review', color: 'bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400' },
];

export const useTaskStore = create<TaskState>((set) => ({
  tasks: defaultTasks,
  timeBlocks: defaultTimeBlocks,
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: String(Date.now()) }],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
