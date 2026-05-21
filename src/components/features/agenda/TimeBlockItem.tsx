import { Clock, Trash2 } from 'lucide-react';

interface TimeBlockItemProps {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  onDelete: (id: string) => void;
}

export function TimeBlockItem({
  id,
  title,
  start,
  end,
  color,
  onDelete,
}: TimeBlockItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${color}`}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5">
        <Clock size={14} className="opacity-70" />
      </div>

      <div className="flex-1 min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        <span className="block text-xs opacity-70 font-mono">
          {start} – {end}
        </span>
      </div>

      <button
        onClick={() => onDelete(id)}
        className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-60 hover:opacity-100"
        aria-label={`Delete ${title}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
