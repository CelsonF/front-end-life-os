'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TimeBlockOverview } from '@/components/features/agenda/TimeBlockOverview';
import { ScheduleTimeline } from '@/components/features/agenda/ScheduleTimeline';
import { TimeBlockList } from '@/components/features/agenda/TimeBlockList';
import { TimeBlockForm } from '@/components/features/agenda/TimeBlockForm';

const ANIMATION_DELAY_LIST = '50ms';

export function TimeBlockingContent() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Time Blocking
        </h1>
        <Button
          variant="gradient"
          onClick={() => setShowForm(true)}
          icon={<Plus size={16} />}
        >
          Add Block
        </Button>
      </div>

      <div className="animate-fade-in">
        <TimeBlockOverview />
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in"
        style={{ animationDelay: ANIMATION_DELAY_LIST }}
      >
        <ScheduleTimeline />
        <TimeBlockList />
      </div>

      {showForm && <TimeBlockForm onClose={() => setShowForm(false)} />}
    </>
  );
}
