"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function MorphingCore({ scrollProgress, mouse }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const colorChaotic = useRef(new THREE.Color("#8b5cf6"));
  const colorResolved = useRef(new THREE.Color("#6366f1"));
  const currentColor = useRef(new THREE.Color());

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    const progress = scrollProgress.current; 
    materialRef.current.distort = THREE.MathUtils.lerp(0.6, 0.05, progress);
    materialRef.current.speed = THREE.MathUtils.lerp(4, 0.8, progress);

    currentColor.current.lerpColors(
      colorChaotic.current,
      colorResolved.current,
      progress,
    );
    materialRef.current.color = currentColor.current;

    const targetScale = THREE.MathUtils.lerp(1, 1.4, progress);
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05),
    );

    const autoRotation = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      autoRotation + mouse.current.x * 0.5,
      0.05,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.current.y * 0.3,
      0.05,
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 16]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#8b5cf6"
        distort={0.6}
        speed={4}
        roughness={0.2}
        metalness={0.3}
      />
    </mesh>
  );
}
