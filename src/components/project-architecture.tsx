"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function ArchitectureStep({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "end 65%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.li ref={ref} initial={reduced ? false : { opacity: 0.4, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.035 }}>
    <span className="mono">0{index + 1}</span><strong>{label}</strong>
    <motion.span className="architecture-fill" aria-hidden="true" style={{ scaleX: reduced ? 1 : scaleX }} />
  </motion.li>;
}

export function ProjectArchitecture({ stages }: { stages: string[] }) {
  return <ol className="architecture architecture-scroll">{stages.map((stage, index) => <ArchitectureStep label={stage} index={index} key={stage} />)}</ol>;
}
