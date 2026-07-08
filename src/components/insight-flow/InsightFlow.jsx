"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Brain, Sparkles } from "lucide-react";

const STAGES = [
  {
    id: "01",
    icon: Database,
    title: "Ingest Data",
    description:
      "Raw signals flow in from every source — structured, unstructured, streaming, or static. Nothing gets left behind.",
  },
  {
    id: "02",
    icon: Brain,
    title: "Analyze with AI",
    description:
      "Xai's models parse context, detect patterns, and surface relationships hidden inside the noise.",
  },
  {
    id: "03",
    icon: Sparkles,
    title: "Generate Insight",
    description:
      "The result: clear, decision-ready intelligence — not another dashboard full of numbers.",
  },
];

export default function InsightFlow() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], // section এর মাঝ বরাবর শুরু-শেষ ধরা হচ্ছে
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-32 px-6 md:px-16"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-3xl md:text-4xl font-semibold text-white"
        >
          How Xai thinks
        </motion.h2>

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-gray-800" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-px bg-indigo-500"
          />

          {STAGES.map((stage, index) => (
            <StageCard key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageCard({ stage, index }) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ x: 8 }}
      className="group relative mb-20 pl-16 last:mb-0"
    >
      <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 bg-black transition-colors duration-300 group-hover:border-indigo-500">
        <Icon
          size={20}
          className="text-gray-400 transition-colors duration-300 group-hover:text-indigo-400"
        />
      </div>

      <span className="text-sm text-gray-600">{stage.id}</span>
      <h3 className="mt-1 text-2xl font-medium text-white">{stage.title}</h3>
      <p className="mt-3 max-w-md text-gray-400">{stage.description}</p>
    </motion.div>
  );
}
