'use client';

import { ListTodo } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const pending = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-foreground">
        <ListTodo size={18} className="text-primary" />
        <h3 className="font-semibold text-sm tracking-tight">
          Tasks{' '}
          <span className="font-normal text-text-secondary">
            ({pending.length} pending, {done.length} done)
          </span>
        </h3>
      </div>

      {pending.length === 0 ? (
        <p className="text-sm text-text-secondary py-4 text-center">
          All tasks completed!
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {pending.map((task, i) => (
            <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
              <TaskItem {...task} onToggle={toggleTask} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
