import { Suspense, lazy } from 'react';
import { Shell } from '@/components/layout/Shell';

const TimeBlockingContent = lazy(
  () =>
    import('@/components/features/agenda/TimeBlockingContent').then((m) => ({
      default: m.TimeBlockingContent,
    }))
);

function TimeBlockingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-8 w-48 bg-hover rounded animate-pulse" />
      <div className="h-20 bg-hover rounded-xl animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-hover rounded-xl animate-pulse" />
        <div className="h-64 bg-hover rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function TimeBlockingPage() {
  return (
    <Shell>
      <div className="flex flex-col gap-6 p-6">
        <Suspense fallback={<TimeBlockingSkeleton />}>
          <TimeBlockingContent />
        </Suspense>
      </div>
    </Shell>
  );
}
