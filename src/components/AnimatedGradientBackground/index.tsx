'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
}

export const AnimatedGradient = ({ children }: { children: ReactNode }) => {
  const bubbles: Bubble[] = [
    { id: 1, size: 60, left: 15, top: 20 },
    { id: 2, size: 80, left: 70, top: 40 },
    { id: 3, size: 40, left: 25, top: 70 },
    { id: 4, size: 100, left: 80, top: 60 },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ 
            backgroundImage: 'linear-gradient(135deg, #4c1d95 0%, #7e22ce 50%, #a855f7 100%)'
          }}
          animate={{
            backgroundImage: [
              'linear-gradient(135deg, #4c1d95 0%, #7e22ce 50%, #a855f7 100%)',
              'linear-gradient(135deg, #5b21b6 0%, #9333ea 50%, #c084fc 100%)',
              'linear-gradient(135deg, #6d28d9 0%, #a855f7 50%, #d8b4fe 100%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />

        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, 20],
              x: [0, 15],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + bubble.id,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: bubble.id * 0.5,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};