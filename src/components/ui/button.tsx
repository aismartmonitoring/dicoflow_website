import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'medical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animate?: boolean;
  fullWidth?: boolean;
}

const buttonVariants = {
  variant: {
    primary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950',
    ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    destructive: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg',
    medical: 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl'
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    animate = true,
    fullWidth = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const classes = cn(
      baseClasses,
      buttonVariants.variant[variant],
      buttonVariants.size[size],
      fullWidth && 'w-full',
      className
    );

    const buttonContent = (
      <>
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : leftIcon ? (
          <span className="flex items-center">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && (
          <span className="flex items-center">{rightIcon}</span>
        )}
      </>
    );

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={classes}
          disabled={disabled || isLoading}
          whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
          whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
          transition={{ type: "tween", duration: 0.2 }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(props as any)}
        >
          {buttonContent}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";