"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Braces, Cpu, Database, Workflow, Check, Terminal } from "lucide-react";
const stages = [
  { icon: Braces, name: "Python", text: "The foundation", detail: "Clear APIs. Reliable backends. A practical starting point." },
  { icon: Cpu, name: "LLMs", text: "The intelligence", detail: "Language models turn a useful question into a useful response." },
  { icon: Database, name: "RAG", text: "The context", detail: "Retrieve the right knowledge before generating an answer." },
  { icon: Workflow, name: "AI Agents", text: "The orchestration", detail: "Connect reasoning, tools and data in a deliberate workflow." },
  { icon: Check, name: "Production", text: "Built to be used.", detail: "From an idea to practical, deployable software." },
];
export function IntelligencePipeline() {
  const [selected, setSelected] = useState(4);
  const [desktop, setDesktop] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 16]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    const update = () => setDesktop(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return <motion.div className="pipeline" style={{ y: desktop && !reduced ? y : 0 }}>
    <div className="pipeline-frame">
      <div className="pipeline-top">
        <span><Terminal size={15} /> intelligence_pipeline.py</span>
        <span className="terminal-ready mono"><i /> ready</span>
      </div>
      <div className="pipeline-body">
        <p className="mono pipeline-comment"># from an idea to something useful <span className="terminal-cursor" aria-hidden="true">▏</span></p>
        <div className="pipeline-stages" role="group" aria-label="Explore the development pipeline">
          <span className="pipeline-trace" aria-hidden="true" />
          {stages.map(({ icon: Icon, name, text }, index) => (
            <button className={`pipeline-stage ${index === 4 ? "pipeline-production" : ""}`} key={name} type="button"
              aria-pressed={selected === index} style={{ "--node-delay": `${0.32 + index * 0.09}s` } as CSSProperties}
              onClick={() => setSelected(index)}>
              <span className="stage-icon"><Icon size={19} /></span>
              <span className="stage-copy"><strong>{name}</strong><span>{text}</span></span>
              <span className="stage-number">{index === 4 ? "✓" : `0${index + 1}`}</span>
            </button>
          ))}
        </div>
        <div className="pipeline-detail" aria-live="polite">
          <span className="mono pipeline-detail-label">{`0${selected + 1}`} / {stages[selected].name}</span>
          <p>{stages[selected].detail}</p>
        </div>
        <p className="pipeline-bottom mono"><span>return</span> practical_software</p>
      </div>
    </div>
    <div className="pipeline-caption"><span className="small-line" /> LESS HYPE. MORE USEFUL SOFTWARE.</div>
  </motion.div>;
}

