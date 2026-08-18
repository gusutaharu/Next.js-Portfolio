'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export const FluidMesh = () => {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);

  //マウス座標の再レンダリング防止
  const internalMouse = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2(0, 0) }, // マウス座標用のUniform
    }),
    [],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      internalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      internalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uResolution.value.set(
        state.size.width,
        state.size.height,
      );
      material.uniforms.uMouse.value.lerp(internalMouse.current, 0.1);
    }
  });
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv; // 座標(0~1)を記録してFragmentに渡す
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec2 uMouse;
          varying vec2 vUv;

          // 疑似乱数
          vec2 hash(vec2 p) {
              p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
              return fract(sin(p) * 43758.5453);
          }

          // グラデーションノイズ
          float noise(vec2 p) {
              vec2 i = floor(p);
              vec2 f = fract(p);
              vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
              return mix(
                  mix(dot(hash(i + vec2(0.0, 0.0)) - 0.5, f - vec2(0.0, 0.0)),
                      dot(hash(i + vec2(1.0, 0.0)) - 0.5, f - vec2(1.0, 0.0)), u.x),
                  mix(dot(hash(i + vec2(0.0, 1.0)) - 0.5, f - vec2(0.0, 1.0)),
                      dot(hash(i + vec2(1.0, 1.0)) - 0.5, f - vec2(1.0, 1.0)), u.x), 
                  u.y
              );
          }

          vec3 getPrismColor(float t) {
              vec3 a = vec3(0.8, 0.9, 1.0);
              vec3 b = vec3(0.4, 0.3, 0.3); 
              vec3 c = vec3(1.0, 1.0, 1.0);
              vec3 d = vec3(0.0, 0.33, 0.67); 
              return a + b * cos(6.28318 * (c * t + d + uTime * 0.02));
          }

          void main() {
            // 座標
            float aspect = uResolution.x / uResolution.y;
            vec2 uv = (vUv * 2.0 - 1.0);
            vec2 m = uMouse;

            // アスペクト比補正
            uv.x *= aspect;
            m.x *= aspect;

            // マウスの光の計算
            float dist = distance(uv, m);
            float mStrength = smoothstep(0.8, 0.0, dist);
            float light = pow(smoothstep(0.8, 0.0, dist), 2.0);

            // 空間を歪ませる
            vec2 distortion = (uv - m) * mStrength * 0.8;

            vec2 p = (uv * 1.3) + distortion;
            float t = uTime * 0.5;

            // ゆがみ
            vec2 q = vec2(
                noise(p + vec2(t * 0.5, t * 0.3)),
                noise(p + vec2(1.0))
            );

            // 色収差表現
            float shift = 0.02; 
            float f_r = noise(p + 4.0 * q + vec2(shift, 0.0));
            float f_g = noise(p + 4.0 * q);
            float f_b = noise(p + 4.0 * q - vec2(shift, 0.0));

            // プリズムの質感計算
            float distort = 2.5;
            vec3 prism = vec3(
                noise(p + f_r * distort),
                noise(p + f_g * distort),
                noise(p + f_b * distort)
            );

            // メインのカラー
            float colorPhase = length(q) * 1.8 + f_g * 0.6;
            vec3 speColor = getPrismColor(colorPhase);

            // ライティング合成
            float bloom = smoothstep(-0.3, 0.9, f_g);
            vec3 waterColor = vec3(0.7, 0.9, 1.0);

            //最終カラーの組み立て
            vec3 color = mix(waterColor + 0.01, speColor, bloom);
            color += prism * speColor * pow(bloom, 4.0) * 0.25;
            color += smoothstep(0.4, 0.5, f_g) * prism * 0.15;

            //マウスの光を足す
            vec3 lightColor = vec3(0.5, 0.8, 1.0);
            color += lightColor * light * 0.2;

            gl_FragColor = vec4(pow(color, vec3(1.1)), 1.0);
          }
        `}
      />
    </mesh>
  );
};
