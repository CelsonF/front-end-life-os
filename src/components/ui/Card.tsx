import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className = '' }: CardProps) {
  return (
    <div
      className={`flex flex-col gap-3 p-5 bg-surface border border-border rounded-xl shadow-sm transition-all duration-300 ${
        hover
          ? 'hover:shadow-lg hover:-translate-y-0.5 cursor-default'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
