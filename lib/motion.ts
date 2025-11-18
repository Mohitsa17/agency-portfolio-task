import { Variants, Transition } from 'framer-motion';

// Global animation variants with consistent timing
export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  } as Variants,

  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as Variants,

  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  } as Variants,
};

// Common transition presets - optimized for performance
export const transitions = {
  smooth: {
    duration: 0.25,
    ease: 'easeOut' as const,
  } as Transition,
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 35,
    mass: 0.5,
  } as Transition,
  gentle: {
    duration: 0.4,
    ease: 'easeOut' as const,
  } as Transition,
  slow: {
    duration: 0.6,
    ease: 'easeOut' as const,
  } as Transition,
};

