'use client';

import { motion } from 'motion/react';

export const SkillChart = ({ value }: { value: number }) => {
  return (
    <svg viewBox="0 0 120 120" className="chart-svg">
      <circle
        cx="60"
        cy="60"
        r="50"
        strokeWidth="1"
        stroke="rgba(0, 0, 0, 0.1)"
        fill="none"
      />
      <motion.circle
        cx="60"
        cy="60"
        r="50"
        strokeWidth="2"
        fill="transparent"
        stroke="orange"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: value }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </svg>
  );
};
