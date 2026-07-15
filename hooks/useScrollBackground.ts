import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const useScrollBackground = (
  targetRef: RefObject<HTMLElement | null>,
) => {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: targetRef.current,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        const isActive = self.isActive;
        gsap.to('.white-overlay', {
          opacity: isActive ? 1 : 0,
          duration: 1,
          overwrite: 'auto',
        });
      },
    });
  });

  return targetRef;
};
