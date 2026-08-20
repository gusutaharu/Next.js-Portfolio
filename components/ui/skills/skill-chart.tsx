'use client';

import { motion } from 'motion/react';

export const SkillChart = ({ value }: { value: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - value);
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
        cx="60"
        cy="60"
        r={radius}
        strokeWidth="2"
        fill="transparent"
        stroke="orange"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset }}
        viewport={{ amount: 0.1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </svg>
  );
};
