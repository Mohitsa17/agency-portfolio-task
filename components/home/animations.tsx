'use client';

import { motion } from 'framer-motion';
import { motionVariants, transitions } from '@/lib/motion';

// Re-export variants from lib/motion for backward compatibility
export const fadeInUp = motionVariants.fadeUp;
export const fadeInDown = motionVariants.fadeDown;
export const fadeInLeft = motionVariants.fadeLeft;
export const fadeInRight = motionVariants.fadeRight;
export const scaleIn = motionVariants.scaleIn;
export const staggerContainer = motionVariants.staggerContainer;
export const staggerItem = motionVariants.staggerItem;

// Reusable animation wrapper components - optimized for smooth scrolling
export function FadeInUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px', amount: 0.1 }}
      variants={fadeInUp}
      transition={{ delay, ease: 'easeOut' }}
      className={className}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInLeft({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px', amount: 0.1 }}
      variants={fadeInLeft}
      transition={{ delay, ease: 'easeOut' }}
      className={className}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInRight({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px', amount: 0.1 }}
      variants={fadeInRight}
      transition={{ delay, ease: 'easeOut' }}
      className={className}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px', amount: 0.1 }}
      variants={scaleIn}
      transition={{ delay, ease: 'easeOut' }}
      className={className}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}

