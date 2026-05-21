'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  LayoutDashboard,
  ListTodo,
  Brain,
  Clock,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

const SIDEBAR_EXPANDED = 260;
const SIDEBAR_COLLAPSED = 60;

const SECTIONS = [
  {
    label: 'Principal',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
      { label: 'Tasks', icon: ListTodo, href: '/dashboard/tasks' },
      { label: 'Habits', icon: Brain, href: '/dashboard/habits' },
      { label: 'Time Blocking', icon: Clock, href: '/dashboard/time-blocking' },
    ],
  },
  {
    label: 'Analysis',
    items: [
      { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Configuration', icon: Settings, href: '/dashboard/configuration' },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed top-0 left-0 h-full z-40 flex flex-col border-r border-border/30 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] glass-sidebar"
      style={{
        width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
      }}
    >
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50 min-h-[56px]">
        <button
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={() => onCollapse(!collapsed)}
          className="flex items-center gap-3 shrink-0 cursor-pointer bg-transparent border-none p-0"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-foreground whitespace-nowrap tracking-tight">
              Life OS
            </span>
          )}
        </button>
        <button
          aria-label={collapsed ? 'Toggle sidebar panel' : 'Collapse sidebar panel'}
          onClick={() => onCollapse(!collapsed)}
          className="ml-auto flex items-center justify-center w-7 h-7 rounded-lg bg-transparent cursor-pointer text-text-secondary hover:text-foreground hover:bg-hover shrink-0 border-none transition-all duration-150"
        >
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-4 p-3 overflow-y-auto">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-[11px] font-semibold text-text-secondary px-2 pb-1.5 uppercase tracking-[0.12em]">
                {section.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex items-center gap-3 rounded-lg text-sm whitespace-nowrap transition-all duration-150 ${
                      collapsed
                        ? 'justify-center py-2.5'
                        : 'justify-start py-2 px-3'
                    } ${
                      isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-text-secondary hover:bg-hover hover:text-foreground'
                    }`}
                  >
                    {isActive && !collapsed && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-gradient-to-b from-primary to-secondary" />
                    )}
                    <item.icon size={18} className="shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
