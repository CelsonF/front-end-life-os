import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task } from '@/types';

interface TaskState {
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  deleteTask: (id: string) => void;
}

const DEFAULT_TASKS: Task[] = [
  { id: '1', title: 'Review pull request', completed: false, priority: 'high', experience: 50 },
  { id: '2', title: 'Update documentation', completed: false, priority: 'medium', experience: 30 },
  { id: '3', title: 'Fix login bug', completed: true, priority: 'high', experience: 80 },
  { id: '4', title: 'Write unit tests', completed: false, priority: 'low', experience: 20 },
  { id: '5', title: 'Refactor API client', completed: false, priority: 'high', experience: 60 },
];

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: DEFAULT_TASKS,
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
    }),
    { name: 'life-os-tasks' }
  )
);
