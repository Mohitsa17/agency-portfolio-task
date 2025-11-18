'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const rafRef = useRef<number | null>(null);
  const pointerCheckRef = useRef<number | null>(null);
  
  // Ultra-fast, minimal lag spring config
  const springConfig = { damping: 40, stiffness: 2000, mass: 0.03 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      // Throttle updates using requestAnimationFrame
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          // Always update cursor position, even near edges
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          rafRef.current = null;
        });
      }
    };

    // Throttle pointer detection to reduce computation
    const handleMouseMove = (e: MouseEvent) => {
      moveCursor(e);
      
      // Check pointer state less frequently
      if (pointerCheckRef.current === null) {
        pointerCheckRef.current = requestAnimationFrame(() => {
          const target = e.target as HTMLElement;
          const isInteractive = 
            target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[role="button"]') ||
            target.closest('[data-interactive="true"]');
          
          setIsPointer(!!isInteractive);
          pointerCheckRef.current = null;
        });
      }
    };

    const handleMouseDown = () => setIsHovering(true);
    const handleMouseUp = () => setIsHovering(false);

    // Add listeners to window to track mouse everywhere on the page
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (pointerCheckRef.current !== null) cancelAnimationFrame(pointerCheckRef.current);
    };
  }, [cursorX, cursorY]);

  // Always render cursor once mounted (don't hide it)
  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none"
      data-cursor="true"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        zIndex: 999999,
        position: 'fixed',
        isolation: 'isolate',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    >
      {/* Main arrow cursor */}
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform -translate-x-1 -translate-y-1"
        style={{
          transform: 'translate3d(-4px, -4px, 0)',
          willChange: 'transform',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4)) drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))',
          zIndex: 999999,
        }}
        animate={{
          scale: isHovering ? 0.9 : isPointer ? 1.3 : 1,
          rotate: isPointer ? 15 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 40,
          mass: 0.15,
        }}
      >
        {/* White outline for visibility on all backgrounds */}
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Main arrow fill - indigo color with better contrast */}
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill={isPointer ? '#8b5cf6' : '#6366f1'}
          stroke={isPointer ? '#7c3aed' : '#4f46e5'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Optional: Small dot at the tip for precision */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white"
        style={{
          boxShadow: '0 0 0 2px #6366f1, 0 0 8px rgba(99, 102, 241, 0.6)',
          transform: 'translate3d(0, 0, 0)',
          zIndex: 999999,
        }}
        animate={{
          scale: isHovering ? 0.8 : isPointer ? 1.5 : 1,
          opacity: isHovering ? 0.7 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.2,
        }}
      />
    </motion.div>
  );
}
