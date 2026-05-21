'use client';

import { Calendar } from 'lucide-react';
import { useTimeBlockStore } from '@/store/timeBlockStore';

const SCHEDULE_START_HOUR = 8;
const SCHEDULE_END_HOUR = 18;

export function ScheduleTimeline() {
  const timeBlocks = useTimeBlockStore((s) => s.timeBlocks);

  const hours = Array.from(
    { length: SCHEDULE_END_HOUR - SCHEDULE_START_HOUR },
    (_, i) => String(SCHEDULE_START_HOUR + i).padStart(2, '0')
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-foreground">
        <Calendar size={18} className="text-primary" />
        <h3 className="font-semibold text-sm tracking-tight">Schedule</h3>
      </div>

      <div className="flex flex-col">
        {hours.map((hour) => {
          const block = timeBlocks.find((b) => b.start.startsWith(hour));

          return (
            <div key={hour} className="flex items-start gap-3">
              <span className="text-xs text-text-secondary w-10 pt-1 text-right shrink-0 font-mono">
                {hour}:00
              </span>

              <div className="flex-1 relative min-h-[36px] border-t border-border/50">
                {block ? (
                  <div
                    className={`absolute left-1 right-1 top-0.5 px-2 py-1 rounded-lg border text-xs font-medium transition-shadow hover:shadow-sm ${block.color}`}
                  >
                    {block.title}
                    <span className="text-[10px] text-text-secondary ml-2 font-mono">
                      {block.start}–{block.end}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
