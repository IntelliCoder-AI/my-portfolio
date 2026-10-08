"use client";
import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Database, Table2 } from "lucide-react";
import { editorialEase } from "./motion-system";
export function AnalyticsWorkflow() {
  const reduced = useReducedMotion();
  const child = { hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.45, ease: editorialEase } } };
  return <motion.div className="review-visual" initial="hidden" whileInView="visible"
    viewport={{ once: true, amount: 0.3 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}
    aria-label="Crime records, analytics API, dashboard and charts">
    <div className="visual-heading mono"><BarChart3 size={15} /> DATA ANALYTICS FLOW <span className="workflow-version">v.01</span></div>
    <motion.div variants={child} className="review-node"><Table2 size={19} /><span>Crime records</span><span className="mono node-label">input</span></motion.div>
    <motion.div variants={child} className="flow-connector" />
    <motion.div variants={child} className="review-node active-node"><Database size={19} /><span>Flask + SQLite</span><span className="mono node-label">REST API</span></motion.div>
    <motion.div variants={child} className="review-branches"><span>CRUD</span><span>Pandas</span><span>Queries</span></motion.div>
    <motion.div variants={child} className="flow-connector" />
    <motion.div variants={child} className="review-node"><BarChart3 size={19} /><span>Dashboard + charts</span><span className="mono node-label">output</span></motion.div>
    <p className="visual-footnote mono">data → queries → visual insights</p>
  </motion.div>;
}

