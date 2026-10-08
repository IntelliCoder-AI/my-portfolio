"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { editorialEase, motionTiming } from "./motion-system";
export function ProjectCard({ id, name, featured = false, children, details }: {
  id: string; name: string; featured?: boolean; children: ReactNode; details: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const followHash = () => { if (window.location.hash === `#project-${id}`) setOpen(true); };
    followHash(); window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, [id]);
  return <article id={`project-${id}`} className={`${featured ? "featured-project" : "project-card"} ${open ? "is-expanded" : ""}`}>
    <div className="project-overview">{children}</div>
    <button ref={triggerRef} type="button" className="project-trigger" onClick={() => setOpen(!open)}
      aria-expanded={open} aria-controls={`details-${id}`} aria-label={`${open ? "Close" : "Explore"} ${name}`}>
      <span>{open ? "Close project" : "Explore project"}</span><ChevronDown size={17} aria-hidden="true" />
    </button>
    <motion.div id={`details-${id}`} className="accordion-panel" role="region" aria-label={`${name} project details`}
      aria-hidden={!open} inert={!open} initial={false}
      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : motionTiming.smooth, ease: editorialEase }}>
      <motion.div animate={{ y: reduced || open ? 0 : 8 }} transition={{ duration: reduced ? 0 : motionTiming.normal, ease: editorialEase }}>{open ? details : null}</motion.div>
    </motion.div>
  </article>;
}

