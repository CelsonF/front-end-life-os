import { Suspense, lazy } from 'react';
import { Shell } from '@/components/layout/Shell';

const TasksContent = lazy(
  () =>
    import('@/components/features/tasks/TasksContent').then((m) => ({
      default: m.TasksContent,
    }))
);

function TasksSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-8 w-32 bg-hover rounded animate-pulse" />
      <div className="h-16 bg-hover rounded-xl animate-pulse" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-12 bg-hover rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Shell>
      <div className="flex flex-col gap-6 p-6">
        <Suspense fallback={<TasksSkeleton />}>
          <TasksContent />
        </Suspense>
      </div>
    </Shell>
  );
}
