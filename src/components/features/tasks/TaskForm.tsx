'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Priority } from '@/types';

interface TaskFormProps {
  onAdd: (title: string, priority: Priority, experience: number) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [experience, setExperience] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), priority, experience);
    setTitle('');
    setPriority('medium');
    setExperience(20);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3 p-4 bg-surface border border-border rounded-xl shadow-sm"
    >
      <div className="flex-1 min-w-[200px]">
        <label className="block text-xs font-medium text-text-secondary mb-1.5">
          Task title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">
          XP
        </label>
        <input
          type="number"
          min={5}
          max={200}
          value={experience}
          onChange={(e) => setExperience(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        />
      </div>

      <Button type="submit" variant="gradient" icon={<Plus size={16} />}>
        Add
      </Button>
    </form>
  );
}
