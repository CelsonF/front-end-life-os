'use client';

import { useCallback, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TaskList } from '@/components/features/tasks/TaskList';
import { TaskForm } from '@/components/features/tasks/TaskForm';
import { useTaskStore } from '@/store/taskStore';
import type { Priority } from '@/types';

const ANIMATION_DELAY_LIST = '50ms';

export function TasksContent() {
  const addTask = useTaskStore((s) => s.addTask);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = useCallback(
    (title: string, priority: Priority, experience: number) => {
      addTask({ title, completed: false, priority, experience });
    },
    [addTask]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Tasks
        </h1>
        <Button
          variant="gradient"
          onClick={() => setShowForm((prev) => !prev)}
          icon={<Plus size={16} />}
        >
          New Task
        </Button>
      </div>

      {showForm && (
        <div className="animate-fade-in-up">
          <TaskForm onAdd={handleAdd} />
        </div>
      )}

      <div
        className="animate-fade-in"
        style={{ animationDelay: ANIMATION_DELAY_LIST }}
      >
        <TaskList />
      </div>
    </>
  );
}
