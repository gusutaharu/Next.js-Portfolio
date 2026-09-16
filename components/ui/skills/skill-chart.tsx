'use client';

import { motion } from 'motion/react';

export const SkillChart = ({ value }: { value: number }) => {
  const radius = 50;
  return (
    <svg viewBox="0 0 120 120" className="chart-svg">
      <circle
        cx="60"
        cy="60"
        r={radius}
        strokeWidth="1"
        stroke="rgba(0, 0, 0, 0.1)"
        fill="none"
      />
      <motion.circle
        className="pc-chart"
        cx="60"
        cy="60"
        r={radius}
        strokeWidth="3"
        fill="transparent"
        stroke="orange"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: value }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.circle
        className="mobile-cahrt"
        cx="60"
        cy="60"
        r={radius}
        strokeWidth="4"
        fill="transparent"
        stroke="orange"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: value }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </svg>
  );
};
