'use client';

import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { UserInfo } from '@/components/ui/UserInfo';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/tasks': 'Tasks',
  '/dashboard/habits': 'Habits',
  '/dashboard/time-blocking': 'Time Blocking',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/configuration': 'Configuration',
};

export function Header() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);
  const title = PAGE_TITLES[pathname] || 'Dashboard';

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-surface/80 backdrop-blur-md border-b border-border/50 min-h-[56px]">
      <h1 className="text-lg font-bold text-foreground tracking-tight">
        {title}
      </h1>
      <UserInfo user={user} size="sm" />
    </header>
  );
}
