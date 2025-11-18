'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FadeInUp, ScaleIn } from './animations';
import { transitions } from '@/lib/motion';

// Reduced orbs for better performance
const FLOATING_ORBS = [
  { id: 0, size: 110, x: 20, y: 30, duration: 18, color: 'rgba(99, 102, 241, 0.3)' },
  { id: 1, size: 85, x: 75, y: 70, duration: 20, color: 'rgba(168, 85, 247, 0.3)' },
  { id: 2, size: 125, x: 45, y: 15, duration: 22, color: 'rgba(236, 72, 153, 0.25)' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef<number | null>(null);

  const springConfig = { damping: 30, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle parallax updates
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xPos = (clientX / innerWidth - 0.5) * 15; // Reduced from 20
          const yPos = (clientY / innerHeight - 0.5) * 15; // Reduced from 20
          mouseX.set(xPos);
          mouseY.set(yPos);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-indigo-950 dark:via-purple-950 dark:to-gray-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Floating orbs - only render after mount to prevent hydration mismatch */}
      {mounted && FLOATING_ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl opacity-20 dark:opacity-10"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Glassmorphism overlay - reduced blur for performance */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/5" style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }} />

      {/* Content with parallax */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          style={{ x, y }}
          className="text-center"
        >
          <FadeInUp delay={0.2}>
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 sm:mb-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={transitions.spring}
            >
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
                Welcome to Our Platform
              </span>
            </motion.div>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...transitions.slow }}
            >
              <motion.span
                className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.5))',
                }}
              >
                Building Digital
              </motion.span>
              <motion.span
                className="block text-gray-900 dark:text-white mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ...transitions.slow }}
              >
                Excellence Together
              </motion.span>
            </motion.h1>
          </FadeInUp>

          <FadeInUp delay={0.5}>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, ...transitions.slow }}
            >
              We create stunning digital experiences that drive results.{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                From innovative projects to satisfied clients
              </span>
              , we're here to transform your vision into reality.
            </motion.p>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...transitions.slow }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 border-0 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 font-semibold">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-full border-2 border-gray-300 dark:border-gray-600 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl bg-white/50 dark:bg-gray-900/50 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </FadeInUp>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, ...transitions.gentle }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center backdrop-blur-sm bg-white/10 dark:bg-black/10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
