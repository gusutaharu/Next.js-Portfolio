'use client';

import { Canvas } from '@react-three/fiber';
export default function Background() {
  return (
    <div className="canvas-container">
      <Canvas>
        <mesh>
          <sphereGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
