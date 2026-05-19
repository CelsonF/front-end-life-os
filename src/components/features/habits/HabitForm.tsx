'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useHabitStore } from '@/store/habitStore';

interface HabitFormProps {
  onClose: () => void;
}

export function HabitForm({ onClose }: HabitFormProps) {
  const addHabit = useHabitStore((s) => s.addHabit);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('✨');
  const [experience, setExperience] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addHabit({
      title: title.trim(),
      description: description.trim(),
      icon,
      experience,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl p-6 shadow-xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Create New Habit</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-hover text-text-secondary"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="habit-title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <input
              id="habit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Morning meditation"
              className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="habit-description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="habit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why this habit matters..."
              rows={2}
              className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="habit-icon" className="text-sm font-medium text-foreground">
              Icon (emoji)
            </label>
            <input
              id="habit-icon"
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="✨"
              maxLength={2}
              className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="habit-exp" className="text-sm font-medium text-foreground">
              Experience Points
            </label>
            <input
              id="habit-exp"
              type="number"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              min={5}
              max={100}
              step={5}
              className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Create Habit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
