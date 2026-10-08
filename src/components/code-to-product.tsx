"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, Code2, Database, Play, RotateCcw, Pause, Terminal } from "lucide-react";

const code = [
  "import pandas as pd",
  "from flask import Flask",
  "",
  "data = load_crime_records()",
  "clean = prepare(data)",
  "insights = analyze(clean)",
  "",
  "app = build_dashboard(insights)",
  "app.deploy()",
];
const phases = ["Write the Python", "Process the data", "Build the interface", "Ready to explore"];
const REPLAY_DELAY_MS = 4500;

export function CodeToProduct() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const cycleComplete = tick >= 44;
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!inView || reduced || paused || !pageVisible || cycleComplete) return;
    const timer = window.setInterval(() => setTick(t => Math.min(44, t + 1)), 260);
    return () => window.clearInterval(timer);
  }, [inView, reduced, paused, pageVisible, cycleComplete]);
  useEffect(() => {
    if (!cycleComplete || !inView || reduced || paused || !pageVisible) return;
    const timer = window.setTimeout(() => setTick(0), REPLAY_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [cycleComplete, inView, reduced, paused, pageVisible]);
  const step = reduced ? 44 : tick;
  const phase = step < 16 ? 0 : step < 24 ? 1 : step < 34 ? 2 : 3;
  const lines = reduced ? code.length : Math.min(code.length, Math.floor(step / 1.7) + 1);
  const complete = phase === 3;
  const writtenCharacters = phase > 0 ? Infinity : step * 20;
  const characterOffsets = code.map((_, i) => code.slice(0, i).reduce((total, line) => total + line.length + 1, 0));
  return <div className="code-product" ref={ref}>
    <div className="experience-kicker mono"><span>01 — FROM CODE TO PRODUCT</span><span className="status-dot" /></div>
    <div className="code-window">
      <div className="code-window-bar"><span><Terminal size={14} /> analytics.py</span><span className="mono">PYTHON</span></div>
      <div className="code-editor" aria-label="Illustrative Python workflow for a data application">
        {code.map((line, i) => <div className={`code-row ${i < lines ? "is-written" : ""} ${phase === 1 && i >= 3 && i <= 5 ? "is-processing" : ""}`} key={i}>
          <span className="code-number" aria-hidden="true">{i + 1}</span><code>{line.slice(0, Math.max(0, writtenCharacters - characterOffsets[i])) || " "}</code>
          {i === lines - 1 && phase === 0 && <span className="code-caret" aria-hidden="true" />}
        </div>)}
      </div>
      <div className="code-terminal mono"><span className={complete ? "terminal-success" : ""}>{phase === 0 ? "$ python analytics.py" : phase === 1 ? "→ preparing data and computing insights" : phase === 2 ? "→ assembling dashboard components" : "✓ build complete · application ready"}</span></div>
    </div>
    <div className="transform-bridge" aria-hidden="true">
      {[{ icon: Code2, name: "PYTHON" }, { icon: Database, name: "DATA" }, { icon: Check, name: "PRODUCT" }].map(({ icon: Icon, name }, i) => <span className={phase >= i ? "is-active" : ""} key={name}><Icon size={14} />{name}</span>)}
      <ArrowDown size={17} />
    </div>
    <motion.div className={`product-window ${complete ? "is-built" : ""}`} initial={false} animate={{ opacity: phase >= 2 ? 1 : 0.32, y: reduced || phase >= 2 ? 0 : 10 }} transition={{ duration: reduced ? 0 : 0.65 }}>
      <div className="product-window-bar"><span><i />Chicago Analytics</span><span className="mono">{complete ? "READY" : "BUILDING"}</span></div>
      <div className="hero-product-content">
        <div className="product-summary"><span>Explore the patterns.</span><small>Records → insights → decisions</small></div>
        <div className="product-chart" aria-label="Illustrative analytics chart">
          {[35, 63, 47, 79, 55, 87, 68, 94, 74, 58, 83, 66].map((h, i) => <motion.span key={i} initial={false} animate={{ height: phase >= 2 ? `${h}%` : "4%" }} transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : i * 0.055 }} />)}
        </div>
        <div className="product-chart-caption mono"><span>ILLUSTRATIVE DATA</span><a href="#projects">Explore the actual projects ↗</a></div>
      </div>
    </motion.div>
    <div className="transformation-footer">
      <span className="mono" role="status">0{phase + 1} / {phases[phase]}</span>
      {!reduced && <div className="transform-controls">
        <button type="button" onClick={() => setPaused(p => !p)} aria-label={paused ? "Play transformation animation" : "Pause transformation animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
        <button type="button" onClick={() => { setTick(0); setPaused(false); }} aria-label="Replay code-to-product transformation"><RotateCcw size={14} />Replay</button>
      </div>}
    </div>
  </div>;
}
