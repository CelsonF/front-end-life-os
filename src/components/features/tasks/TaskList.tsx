'use client';

import { useMemo } from 'react';
import { ListTodo } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';
import { TaskItem } from './TaskItem';

const ANIMATION_STAGGER_MS = 30;

export function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const pending = useMemo(
    () => tasks.filter((t) => !t.completed),
    [tasks]
  );
  const done = useMemo(
    () => tasks.filter((t) => t.completed),
    [tasks]
  );

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
            <div
              key={task.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * ANIMATION_STAGGER_MS}ms` }}
            >
              <TaskItem {...task} onToggle={toggleTask} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
