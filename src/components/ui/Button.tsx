import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'gradient' | 'secondary' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary border-primary hover:brightness-110 hover:shadow-md',
  gradient:
    'text-white border-transparent bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/20',
  secondary:
    'bg-surface text-foreground border-border hover:bg-hover hover:border-primary/30',
  ghost: 'bg-transparent text-foreground border-transparent hover:bg-hover',
  danger:
    'bg-danger text-on-danger border-danger hover:brightness-110 hover:shadow-md',
};

export function Button({
  variant = 'primary',
  loading = false,
  icon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
}
