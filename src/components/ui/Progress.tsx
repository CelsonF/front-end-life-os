interface ProgressProps {
  value: number;
  max: number;
  glow?: boolean;
}

export function Progress({ value, max, glow = false }: ProgressProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className="w-full h-2.5 rounded-full bg-hover overflow-hidden"
    >
      <div
        className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out ${glow ? 'animate-pulse-glow' : ''}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
