'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTimeBlockStore } from '@/store/timeBlockStore';

interface TimeBlockFormProps {
  onClose: () => void;
}

const colorOptions = [
  { label: 'Blue', value: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
  { label: 'Purple', value: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
  { label: 'Green', value: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' },
  { label: 'Orange', value: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400' },
  { label: 'Pink', value: 'bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400' },
  { label: 'Teal', value: 'bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400' },
];

export function TimeBlockForm({ onClose }: TimeBlockFormProps) {
  const addTimeBlock = useTimeBlockStore((s) => s.addTimeBlock);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('10:00');
  const [color, setColor] = useState(colorOptions[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTimeBlock({
      title: title.trim(),
      start,
      end,
      color,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl p-6 shadow-xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Add Time Block</h2>
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
            <label htmlFor="block-title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <input
              id="block-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Deep work session"
              className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="block-start" className="text-sm font-medium text-foreground">
                Start Time
              </label>
              <input
                id="block-start"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="block-end" className="text-sm font-medium text-foreground">
                End Time
              </label>
              <input
                id="block-end"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="px-3 py-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${opt.value} ${
                    color === opt.value ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              Add Block
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
