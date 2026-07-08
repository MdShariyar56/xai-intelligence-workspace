"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function MorphingCore({ scrollProgress, mouse }) {
  const meshRef = useRef();
  const materialRef = useRef();

  // রঙ দুটো state এর মধ্যে — chaotic (violet) থেকে resolved (indigo)
  const colorChaotic = useRef(new THREE.Color("#8b5cf6"));
  const colorResolved = useRef(new THREE.Color("#6366f1"));
  const currentColor = useRef(new THREE.Color());

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const progress = scrollProgress.current; // 0 = chaotic, 1 = resolved

    // Distortion কমতে থাকবে scroll progress বাড়ার সাথে সাথে
    // শুরুতে খুব বেশি distort (0.6), শেষে প্রায় শূন্য (0.05) — perfect sphere এর কাছাকাছি
    materialRef.current.distort = THREE.MathUtils.lerp(0.6, 0.05, progress);
    materialRef.current.speed = THREE.MathUtils.lerp(4, 0.8, progress);

    // রঙ interpolate করছি progress অনুযায়ী
    currentColor.current.lerpColors(
      colorChaotic.current,
      colorResolved.current,
      progress
    );
    materialRef.current.color = currentColor.current;

    // Scale — resolved অবস্থায় একটু বড় ও confident দেখাবে
    const targetScale = THREE.MathUtils.lerp(1, 1.4, progress);
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.05)
    );

    // ঘূর্ণন — auto rotation + mouse parallax (Hero এর মতোই প্যাটার্ন)
    const autoRotation = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      autoRotation + mouse.current.x * 0.5,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.current.y * 0.3,
      0.05
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