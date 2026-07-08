"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";

export default function HeroScene() {
  const sectionRef = useRef(null);
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max(-top / (height * 0.8), 0), 1);
      scrollProgress.current = progress;
    }

    function handleMouseMove(e) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <ParticleField scrollProgress={scrollProgress} mouse={mouse} />
        </Canvas>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-white"
          >
            Xai — Intelligence Workspace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-4 max-w-xl text-lg text-gray-400"
          >
            From raw data to actionable insight — scroll to see the
            transformation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
