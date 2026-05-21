import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimeBlock } from '@/types';

interface TimeBlockState {
  timeBlocks: TimeBlock[];
  addTimeBlock: (block: Omit<TimeBlock, 'id'>) => void;
  updateTimeBlock: (id: string, block: Partial<TimeBlock>) => void;
  deleteTimeBlock: (id: string) => void;
}

const DEFAULT_TIME_BLOCKS: TimeBlock[] = [
  { id: 'tb1', start: '08:00', end: '09:00', title: 'Morning review', color: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
  { id: 'tb2', start: '09:00', end: '10:30', title: 'Feature work', color: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
  { id: 'tb3', start: '11:00', end: '12:00', title: 'Team sync', color: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' },
  { id: 'tb4', start: '14:00', end: '15:30', title: 'Deep work', color: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400' },
  { id: 'tb5', start: '16:00', end: '17:00', title: 'Code review', color: 'bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400' },
];

export const useTimeBlockStore = create<TimeBlockState>()(
  persist(
    (set) => ({
      timeBlocks: DEFAULT_TIME_BLOCKS,
      addTimeBlock: (block) =>
        set((state) => ({
          timeBlocks: [...state.timeBlocks, { ...block, id: `tb${Date.now()}` }],
        })),
      updateTimeBlock: (id, updates) =>
        set((state) => ({
          timeBlocks: state.timeBlocks.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),
      deleteTimeBlock: (id) =>
        set((state) => ({
          timeBlocks: state.timeBlocks.filter((b) => b.id !== id),
        })),
    }),
    { name: 'life-os-time-blocks' }
  )
);
