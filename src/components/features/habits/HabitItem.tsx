import { Flame, Star } from 'lucide-react';

interface HabitItemProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
  streak: number;
  experience: number;
  onToggle: (id: string) => void;
}

export function HabitItem({
  id,
  title,
  description,
  completed,
  icon,
  streak,
  experience,
  onToggle,
}: HabitItemProps) {
  return (
    <label
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
        completed
          ? 'bg-primary-50 dark:bg-primary-50/10'
          : 'bg-surface border border-border hover:border-primary/30 hover:shadow-sm'
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="w-4 h-4 rounded-full border-zinc-300 dark:border-zinc-600 text-primary focus:ring-primary accent-primary transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-90"
      />

      <span className="text-xl">{icon}</span>

      <div className="flex-1 min-w-0">
        <span
          className={`block text-sm font-medium ${
            completed ? 'line-through text-text-secondary' : 'text-foreground'
          }`}
        >
          {title}
        </span>
        {description && (
          <span className="block text-xs text-text-secondary truncate">
            {description}
          </span>
        )}
      </div>

      <span className="flex items-center gap-1 text-xs font-medium text-orange-500 dark:text-orange-400">
        <Flame size={14} />
        {streak}
      </span>

      <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
        <Star size={14} />
        {experience} EXP
      </span>
    </label>
  );
}
