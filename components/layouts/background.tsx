'use client';

import { Canvas } from '@react-three/fiber';
import { FluidMesh } from './fluidmesh';
export default function Background() {
  return (
    <div className="canvas-container">
      <Canvas>
        <color attach="background" args={['#e0f7fa']} />
        <FluidMesh />
      </Canvas>
    </div>
  );
}
