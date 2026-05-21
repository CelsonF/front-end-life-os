import { Check } from 'lucide-react';
import type { Priority } from '@/types';

const PRIORITY_CONFIG: Record<Priority, { label: string; class: string }> = {
  low: { label: 'Low', class: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' },
  medium: { label: 'Med', class: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' },
  high: { label: 'High', class: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' },
};

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  experience: number;
  onToggle: (id: string) => void;
}

export function TaskItem({
  id,
  title,
  completed,
  priority,
  experience,
  onToggle,
}: TaskItemProps) {
  const priorityStyle = PRIORITY_CONFIG[priority];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        completed
          ? 'bg-primary-50 dark:bg-primary-50/10'
          : 'bg-surface border border-border hover:border-primary/30 hover:shadow-sm'
      }`}
    >
      <button
        onClick={() => onToggle(id)}
        aria-label={`${completed ? 'Mark incomplete' : 'Mark complete'}: ${title}`}
        aria-pressed={completed}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 ${
          completed
            ? 'bg-primary border-primary text-on-primary'
            : 'border-zinc-300 dark:border-zinc-600 hover:border-primary'
        }`}
      >
        {completed && <Check size={12} strokeWidth={3} />}
      </button>

      <span
        className={`flex-1 text-sm ${
          completed
            ? 'line-through text-text-secondary'
            : 'text-foreground'
        }`}
      >
        {title}
      </span>

      <span
        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle.class}`}
      >
        {priorityStyle.label}
      </span>

      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
        +{experience}XP
      </span>
    </div>
  );
}
