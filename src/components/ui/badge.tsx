import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'medical' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const badgeVariants = {
  variant: {
    default: 'bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900',
    secondary: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    error: 'bg-red-500 text-white',
    medical: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white',
    outline: 'border border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-50'
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300',
          badgeVariants.variant[variant],
          badgeVariants.size[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";