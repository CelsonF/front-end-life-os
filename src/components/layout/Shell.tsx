'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

const SIDEBAR_EXPANDED = 260;
const SIDEBAR_COLLAPSED = 60;

export function Shell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{
          marginLeft: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
        }}
      >
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
