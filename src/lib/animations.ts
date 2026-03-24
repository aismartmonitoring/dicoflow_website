/**
 * Professional Animation Library
 * Framer Motion animations and transitions
 */

import { Variants, Transition, MotionProps } from 'framer-motion';

// Base Animation Configuration
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    xSlow: 0.8
  },
  ease: {
    default: [0.4, 0.0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    smooth: [0.25, 0.46, 0.45, 0.94],
    sharp: [0.4, 0.0, 0.6, 1]
  }
} as const;

// Standard Page Transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.ease.sharp
    }
  }
};

// Fade Animations
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

// Scale Animations
export const scaleVariants: Variants = {
  hidden: { 
    scale: 0.8, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.bounce
    }
  }
};

export const pulseVariants: Variants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      ease: ANIMATION_CONFIG.ease.smooth,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

// Slide Animations
export const slideInLeft: Variants = {
  hidden: { 
    x: '-100%', 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

export const slideInRight: Variants = {
  hidden: { 
    x: '100%', 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

// Stagger Animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default
    }
  }
};

// Button Animations
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.ease.smooth
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.ease.sharp
    }
  }
};

export const iconButtonVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.ease.bounce
    }
  },
  tap: { 
    scale: 0.9,
    rotate: -5,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.ease.sharp
    }
  }
};

// Card Animations
export const cardVariants: Variants = {
  initial: { 
    scale: 1, 
    y: 0,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
  },
  hover: { 
    scale: 1.02,
    y: -4,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.smooth
    }
  }
};

// Modal Animations
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.bounce
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast,
      ease: ANIMATION_CONFIG.ease.sharp
    }
  }
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: ANIMATION_CONFIG.duration.fast
    }
  }
};

// Loading Animations
export const spinnerVariants: Variants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity
    }
  }
};

export const dotsVariants: Variants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

// Medical Specific Animations
export const imageComparisonVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: ANIMATION_CONFIG.duration.slow,
      ease: ANIMATION_CONFIG.ease.smooth
    }
  }
};

export const statisticVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.bounce,
      delay: 0.2
    }
  }
};

// Utility Animation Functions
export const createDelayedAnimation = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration.normal,
      ease: ANIMATION_CONFIG.ease.default,
      delay
    }
  }
});

export const createStaggeredChildren = (staggerDelay = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  }
});

// Common Transition Presets
export const quickTransition: Transition = {
  duration: ANIMATION_CONFIG.duration.fast,
  ease: ANIMATION_CONFIG.ease.sharp
};

export const smoothTransition: Transition = {
  duration: ANIMATION_CONFIG.duration.normal,
  ease: ANIMATION_CONFIG.ease.smooth
};

// ═══════════════════════════════════════════════════════════════
// DicoFlow Product Animations
// ═══════════════════════════════════════════════════════════════

export const tierCardEnter: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: ANIMATION_CONFIG.ease.bounce },
  },
};

export const workflowStageReveal: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: ANIMATION_CONFIG.ease.default },
  },
};

export const complianceBadgeReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.4, ease: ANIMATION_CONFIG.ease.bounce },
  },
};

export const mockupSlideIn: Variants = {
  hidden: { opacity: 0, x: 60, rotateY: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.6, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const featureTabSwitch: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: ANIMATION_CONFIG.ease.default },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: ANIMATION_CONFIG.ease.sharp },
  },
};

export const floatUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ANIMATION_CONFIG.ease.smooth },
  },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ANIMATION_CONFIG.ease.default },
  },
};

export const bounceTransition: Transition = {
  duration: ANIMATION_CONFIG.duration.normal,
  ease: ANIMATION_CONFIG.ease.bounce
};

export const slowTransition: Transition = {
  duration: ANIMATION_CONFIG.duration.slow,
  ease: ANIMATION_CONFIG.ease.default
};

// Animation Helper Props
export const quickMotionProps: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: fadeInUp,
  transition: quickTransition
};

export const smoothMotionProps: MotionProps = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  variants: fadeInUp,
  transition: smoothTransition
};