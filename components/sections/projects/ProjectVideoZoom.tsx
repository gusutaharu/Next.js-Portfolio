'use client';

import { useVideoZoom } from '@/hooks/useVideoZoom';

export const ProjectVideoZoom = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useVideoZoom('.project-item', '.project-video');

  return <>{children}</>;
};
