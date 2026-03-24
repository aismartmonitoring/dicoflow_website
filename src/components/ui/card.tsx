import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'medical';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  hover?: boolean;
}

const cardVariants = {
  variant: {
    default: 'bg-white border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800',
    elevated: 'bg-white shadow-lg border border-slate-100 dark:bg-slate-900 dark:border-slate-800',
    outlined: 'bg-transparent border-2 border-slate-300 dark:border-slate-700',
    glass: 'bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl',
    medical: 'bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 shadow-lg dark:from-emerald-950 dark:to-blue-950 dark:border-emerald-800'
  },
  padding: {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    animate = false,
    hover = false,
    children, 
    ...props 
  }, ref) => {
    const classes = cn(
      'rounded-xl transition-all duration-300',
      cardVariants.variant[variant],
      cardVariants.padding[padding],
      hover && 'hover:shadow-xl hover:scale-[1.02]',
      className
    );

    if (animate) {
      return (
        <motion.div
          ref={ref}
          className={classes}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          whileHover={hover ? { scale: 1.02 } : undefined}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card sub-components for better composition
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-xl font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-slate-600 dark:text-slate-400", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";