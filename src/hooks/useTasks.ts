import { useMemo } from 'react';
import { useTaskStore } from '@/store/taskStore';
import type { Priority } from '@/types';

export function useTasks() {
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const addTask = useTaskStore((s) => s.addTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const pendingTasks = useMemo(
    () => tasks.filter((t) => !t.completed),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.completed),
    [tasks]
  );

  const handleAdd = (title: string, priority: Priority, experience: number) => {
    addTask({ title, completed: false, priority, experience });
  };

  return {
    tasks,
    pendingTasks,
    completedTasks,
    toggleTask,
    addTask: handleAdd,
    deleteTask,
  };
}
