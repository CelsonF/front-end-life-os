import { useMemo } from 'react';
import { useTimeBlockStore } from '@/store/timeBlockStore';

export function useTimeBlocks() {
  const timeBlocks = useTimeBlockStore((s) => s.timeBlocks);
  const addTimeBlock = useTimeBlockStore((s) => s.addTimeBlock);
  const updateTimeBlock = useTimeBlockStore((s) => s.updateTimeBlock);
  const deleteTimeBlock = useTimeBlockStore((s) => s.deleteTimeBlock);

  const sorted = useMemo(
    () => [...timeBlocks].sort((a, b) => a.start.localeCompare(b.start)),
    [timeBlocks]
  );

  return {
    timeBlocks: sorted,
    addTimeBlock,
    updateTimeBlock,
    deleteTimeBlock,
  };
}
