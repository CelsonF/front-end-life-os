'use client';

import { useMemo } from 'react';
import { useTimeBlockStore } from '@/store/timeBlockStore';
import { TimeBlockItem } from './TimeBlockItem';

const ANIMATION_STAGGER_MS = 30;

export function TimeBlockList() {
  const timeBlocks = useTimeBlockStore((s) => s.timeBlocks);
  const deleteTimeBlock = useTimeBlockStore((s) => s.deleteTimeBlock);

  const sorted = useMemo(
    () => [...timeBlocks].sort((a, b) => a.start.localeCompare(b.start)),
    [timeBlocks]
  );

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-secondary">
        <p className="text-sm">No time blocks yet</p>
        <p className="text-xs mt-1">Click &quot;Add Block&quot; to schedule your day</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((block, i) => (
        <div
          key={block.id}
          className="animate-fade-in"
          style={{ animationDelay: `${i * ANIMATION_STAGGER_MS}ms` }}
        >
          <TimeBlockItem {...block} onDelete={deleteTimeBlock} />
        </div>
      ))}
    </div>
  );
}
