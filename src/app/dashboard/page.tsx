import { Suspense, lazy } from 'react';
import { Shell } from '@/components/layout/Shell';

const DashboardContent = lazy(
  () =>
    import('@/components/features/dashboard/DashboardContent').then((m) => ({
      default: m.DashboardContent,
    }))
);

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-hover rounded animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-hover rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-hover rounded-xl animate-pulse" />
        <div className="h-64 bg-hover rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Shell>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </Shell>
  );
}
