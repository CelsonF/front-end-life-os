import { Suspense, lazy } from 'react';
import { Shell } from '@/components/layout/Shell';

const HabitsContent = lazy(
  () =>
    import('@/components/features/habits/HabitsContent').then((m) => ({
      default: m.HabitsContent,
    }))
);

function HabitsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-8 w-32 bg-hover rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-hover rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 bg-hover rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function HabitsPage() {
  return (
    <Shell>
      <div className="flex flex-col gap-6 p-6">
        <Suspense fallback={<HabitsSkeleton />}>
          <HabitsContent />
        </Suspense>
      </div>
    </Shell>
  );
}
