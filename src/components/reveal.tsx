"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { editorialEase, motionTiming } from "./motion-system";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      onViewportEnter={(entry) => entry?.target.setAttribute("data-revealed", "true")}
      transition={{ duration: reduced ? 0 : motionTiming.reveal, delay: reduced ? 0 : delay, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial="hidden" whileInView="visible"
    viewport={{ once: true, amount: 0.16 }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.09 } } }}>
    {children}
  </motion.div>;
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={`stagger-item ${className}`} variants={{
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : motionTiming.reveal, ease: editorialEase } },
  }}>{children}</motion.div>;
}
