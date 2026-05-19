import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  max: number;
}

export function MetricCard({ icon, label, value, max }: MetricCardProps) {
  return (
    <Card hover>
      <div className="flex items-center gap-2 text-text-secondary">
        <span className="text-primary">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>

      <span className="text-xl font-bold text-foreground tracking-tight">
        {value}
        <span className="text-sm font-normal text-text-secondary">
          {' '}
          / {max}
        </span>
      </span>

      <Progress value={value} max={max} />
    </Card>
  );
}
