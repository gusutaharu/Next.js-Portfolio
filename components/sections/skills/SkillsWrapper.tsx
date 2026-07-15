'use client';

import { useRef } from 'react';

import { useScrollBackground } from '@/hooks/useScrollBackground';

export const SkillsWrapper = ({ children }: { children: React.ReactNode }) => {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollBackground(sectionRef);
  return (
    <section id="skills-section" ref={sectionRef}>
      {children}
    </section>
  );
};
