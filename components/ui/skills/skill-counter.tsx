'use client';

import { motion, useMotionValue, animate, useTransform } from 'motion/react';

export const SkillCounter = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest * 100));

  return (
    <div className="skill-counter">
      <span>
        <motion.span
          onViewportEnter={() => {
            animate(count, value, {
              duration: 2,
              ease: 'easeInOut',
            });
          }}
          viewport={{ once: true }}
        >
          {rounded}
        </motion.span>
        %
      </span>
    </div>
  );
};
