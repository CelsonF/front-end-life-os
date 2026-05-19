'use client';

import { useMemo } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { useTimeBlockStore } from '@/store/timeBlockStore';

function getCategoryLabel(color: string): string {
  if (color.includes('blue')) return 'Planning';
  if (color.includes('purple')) return 'Deep Work';
  if (color.includes('green')) return 'Sync';
  if (color.includes('orange')) return 'Focus';
  if (color.includes('pink')) return 'Review';
  if (color.includes('teal')) return 'Personal';
  return 'Other';
}

function getColorDot(color: string): string {
  if (color.includes('blue')) return 'bg-blue-500';
  if (color.includes('purple')) return 'bg-purple-500';
  if (color.includes('green')) return 'bg-green-500';
  if (color.includes('orange')) return 'bg-orange-500';
  if (color.includes('pink')) return 'bg-pink-500';
  if (color.includes('teal')) return 'bg-teal-500';
  return 'bg-zinc-500';
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function TimeBlockOverview() {
  const timeBlocks = useTimeBlockStore((s) => s.timeBlocks);

  const { dateInfo, totalPlanned, totalSpent, categories, nextBlock } = useMemo(() => {
    const sorted = [...timeBlocks].sort((a, b) => a.start.localeCompare(b.start));
    const now = new Date();
    const curMin = now.getHours() * 60 + now.getMinutes();

    const dateInfo = {
      dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'short' }),
      day: now.getDate(),
      month: now.toLocaleDateString('en-US', { month: 'long' }),
      year: now.getFullYear(),
    };

    let totalPlanned = 0;
    let totalSpent = 0;
    const catMap = new Map<string, { planned: number; spent: number }>();
    let nextBlock: { title: string; start: string } | null = null;

    for (const block of sorted) {
      const startMin = toMinutes(block.start);
      const endMin = toMinutes(block.end);
      const duration = endMin - startMin;
      totalPlanned += duration;

      const label = getCategoryLabel(block.color);
      const cat = catMap.get(label) || { planned: 0, spent: 0 };
      cat.planned += duration;

      if (endMin <= curMin) {
        totalSpent += duration;
        cat.spent += duration;
      } else if (startMin < curMin && endMin > curMin) {
        const elapsed = curMin - startMin;
        totalSpent += elapsed;
        cat.spent += elapsed;
      }

      catMap.set(label, cat);

      if (startMin > curMin && !nextBlock) {
        nextBlock = { title: block.title, start: block.start };
      }
    }

    return { dateInfo, totalPlanned, totalSpent, categories: catMap, nextBlock };
  }, [timeBlocks]);

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center justify-center w-14 h-14 bg-primary/10 rounded-lg">
          <span className="text-xs font-medium text-primary uppercase">{dateInfo.dayOfWeek}</span>
          <span className="text-xl font-bold text-foreground">{dateInfo.day}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{dateInfo.month}</span>
          <span className="text-xs text-text-secondary">{dateInfo.year}</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-text-secondary" />
            <span className="text-text-secondary">Planned:</span>
            <span className="font-semibold text-foreground">{(totalPlanned / 60).toFixed(1)}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" />
            <span className="text-text-secondary">Spent:</span>
            <span className="font-semibold text-foreground">{(totalSpent / 60).toFixed(1)}h</span>
          </div>
        </div>
      </div>

      {nextBlock && (
        <div className="flex items-center gap-2 text-xs bg-hover rounded-md px-3 py-2">
          <ArrowRight size={12} className="text-primary" />
          <span className="text-text-secondary">Next:</span>
          <span className="font-medium text-foreground">{nextBlock.title}</span>
          <span className="text-text-secondary">at {nextBlock.start}</span>
        </div>
      )}

      {categories.size > 0 && (
        <div className="flex flex-col gap-2 pt-1">
          {Array.from(categories.entries()).map(([label, cat]) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-24 shrink-0">
                <div className={`w-2 h-2 rounded-full ${getColorDot(timeBlocks.find(b => getCategoryLabel(b.color) === label)?.color || '')}`} />
                <span className="text-xs text-text-secondary">{label}</span>
              </div>
              <div className="flex-1">
                <Progress value={cat.spent} max={cat.planned || 1} />
              </div>
              <span className="text-xs text-text-secondary w-20 text-right tabular-nums">
                {(cat.spent / 60).toFixed(1)}h / {(cat.planned / 60).toFixed(1)}h
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
