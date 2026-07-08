"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import MorphingCore from "./MorphingCore";

export default function SignatureInteraction() {
  const sectionRef = useRef(null);
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      // section এর মাঝামাঝি জুড়ে animation ঘটবে
      const progress = Math.min(
        Math.max(-top / (height - window.innerHeight), 0),
        1
      );
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
    <section ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />
          <MorphingCore scrollProgress={scrollProgress} mouse={mouse} />
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md text-lg text-gray-400"
          >
            Chaos, resolved. This is what happens to your data inside Xai.
          </motion.p>
        </div>
      </div>
    </section>
  );
}