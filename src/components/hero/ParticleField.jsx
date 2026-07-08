"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 1500;

export default function ParticleField({ scrollProgress }) {
  const pointsRef = useRef();

  const { randomPositions, gridPositions } = useMemo(() => {
    const random = new Float32Array(COUNT * 3);
    const grid = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      random[i3] = (Math.random() - 0.5) * 10;
      random[i3 + 1] = (Math.random() - 0.5) * 10;
      random[i3 + 2] = (Math.random() - 0.5) * 10; 
    }

    const gridSize = Math.ceil(Math.sqrt(COUNT));
    const spacing = 0.5;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      grid[i3] = (col - gridSize / 2) * spacing;
      grid[i3 + 1] = (row - gridSize / 2) * spacing;
      grid[i3 + 2] = 0;
    }

    return { randomPositions: random, gridPositions: grid };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const progress = scrollProgress.current; 
    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = THREE.MathUtils.lerp(
        randomPositions[i],
        gridPositions[i],
        progress,
      );
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={randomPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6366f1"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
