'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useVideoZoom = (
  containerSelector: string,
  videoSelector: string,
) => {
  useGSAP(() => {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach((container) => {
      const video = container.querySelector(videoSelector);
      const wrapper = container.querySelector('.video-wrapper');
      if (!video || !wrapper) return;

      gsap.to(video, {
        scale: 1.8,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=500',
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    });
  });
};
