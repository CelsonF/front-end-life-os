'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Shell } from '@/components/layout/Shell';
import { Button } from '@/components/ui/Button';
import { TaskList } from '@/components/features/tasks/TaskList';
import { TaskForm } from '@/components/features/tasks/TaskForm';
import { useTaskStore } from '@/store/taskStore';
import type { Priority } from '@/types';

export default function TasksPage() {
  const addTask = useTaskStore((s) => s.addTask);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (title: string, priority: Priority, experience: number) => {
    addTask({ title, completed: false, priority, experience });
  };

  return (
    <Shell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Tasks</h1>
          <Button variant="gradient" onClick={() => setShowForm(!showForm)} icon={<Plus size={16} />}>
            New Task
          </Button>
        </div>

        {showForm && (
          <div className="animate-fade-in-up">
            <TaskForm onAdd={handleAdd} />
          </div>
        )}

        <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
          <TaskList />
        </div>
      </div>
    </Shell>
  );
}
