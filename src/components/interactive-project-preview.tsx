"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronRight, FileText, Github, MapPin, Search, ShieldCheck } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectCard } from "./project-card";
import { LinkAction } from "./link-action";

const chartValues = [[34, 57, 42, 80, 65, 93, 72, 54, 88, 69], [68, 43, 79, 55, 91, 74, 45, 85, 58, 77]];

function AnalyticsPreview() {
  const [mode, setMode] = useState(0);
  return <div className="demo-analytics">
    <div className="demo-title"><div><small>CHICAGO CRIME ANALYTICS</small><h4>Patterns in the data.</h4></div><span className="demo-icon"><MapPin size={20} /></span></div>
    <div className="demo-metric-row">{["Records", "Categories", "Districts"].map(label => <span key={label}><small>{label}</small><strong>{label === "Records" ? "Explore" : label === "Categories" ? "Compare" : "Discover"}</strong></span>)}</div>
    <div className="demo-chart-top"><span>Crime distribution</span><div aria-label="Analytics preview chart controls">{["By category", "By district"].map((label, i) => <button type="button" key={label} aria-pressed={mode === i} onClick={() => setMode(i)}>{label}</button>)}</div></div>
    <div className="demo-bars">{chartValues[mode].map((height, i) => <motion.span key={i} animate={{ height: `${height}%` }} transition={{ duration: 0.45 }}><i /></motion.span>)}</div>
    <div className="demo-axis mono"><span>{mode ? "DISTRICTS" : "CATEGORIES"}</span><span>ILLUSTRATIVE DISTRIBUTION</span></div>
    <div className="demo-table"><span>Crime records</span><span>District</span><span>Category</span>{["Record exploration", "Analytical summaries", "Record management"].map((label, i) => <div key={label}><span>{label}</span><span>0{i + 1}</span><span>{["Explore", "Analyze", "Manage"][i]}</span></div>)}</div>
  </div>;
}

function TaskPreview() {
  const [done, setDone] = useState([false, true, false]);
  const [filter, setFilter] = useState("All tasks");
  const tasks = ["Prepare the data pipeline", "Validate the API endpoints", "Review the deployment"];
  return <div className="demo-tasks"><div className="demo-title"><div><small>TASKFLOW</small><h4>A clearer day of work.</h4></div><Check size={22} /></div>
    <div className="demo-task-summary"><strong>{done.filter(Boolean).length} / 3</strong><span>sample tasks completed</span></div>
    <div className="demo-filters">{["All tasks", "In progress", "Completed"].map(label => <button type="button" key={label} aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}</div>
    <div className="demo-task-list">{tasks.map((task, i) => ((filter === "Completed" && !done[i]) || (filter === "In progress" && done[i])) ? null : <label className={done[i] ? "task-is-done" : ""} key={task}><input type="checkbox" aria-label={task} checked={done[i]} onChange={() => setDone(current => current.map((value, index) => index === i ? !value : value))} /><span>{task}<small>{done[i] ? "Completed" : "In progress"}</small></span></label>)}</div>
    <div className="demo-bottom-note">One workflow. Every task in view.</div>
  </div>;
}

function RagPreview() {
  const [answered, setAnswered] = useState(false);
  return <div className="demo-rag"><div className="demo-title"><div><small>CONTEXTIQ</small><h4>Answers with context.</h4></div><FileText size={22} /></div>
    <div className="demo-document"><FileText size={24} /><span>project-notes.pdf<small>Example knowledge source</small></span><Check size={16} /></div>
    <button type="button" className="demo-question" onClick={() => setAnswered(true)}><Search size={16} />How does retrieval improve answers?<ArrowUpRight size={16} /></button>
    <AnimatePresence mode="wait"><motion.div key={answered ? "answer" : "waiting"} className="demo-answer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><small>{answered ? "CONTEXT-GROUNDED ANSWER" : "ASK YOUR DOCUMENTS"}</small><p>{answered ? "Relevant document passages are retrieved first, then supplied to the language model to ground its response in your knowledge base." : "Select the sample question to explore a retrieval response."}</p>{answered && <span className="demo-source"><FileText size={12} />Illustrative answer · project notes</span>}</motion.div></AnimatePresence>
    <div className="demo-rag-steps mono"><span>EMBED</span><ChevronRight size={12} /><span>RETRIEVE</span><ChevronRight size={12} /><span>ANSWER</span></div>
  </div>;
}

function WorkflowPreview({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  return <div className="demo-agent"><div className="demo-title"><div><small>{project.id === "code-review" ? "CODE REVIEW AGENT" : "TRAVEL PLANNER"}</small><h4>{project.id === "code-review" ? "A second pair of eyes." : "A plan, thoughtfully assembled."}</h4></div><ShieldCheck size={22} /></div>
    <div className="demo-agent-stages" aria-label="Explore workflow steps">{project.architecture.map((stage, i) => <button key={stage} type="button" aria-pressed={active === i} onClick={() => setActive(i)}><span className="mono">0{i + 1}</span><span>{stage}</span>{active === i && <ChevronRight size={14} />}</button>)}</div>
    <div className="demo-bottom-note">{project.building ? "Planned workflow · currently in development" : "Workflow concept · select a stage to explore"}</div>
  </div>;
}

export function InteractiveProjectPreview({ projects, details }: { projects: Project[]; details: ReactNode[] }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const followHash = () => {
      const index = projects.findIndex(p => window.location.hash === `#project-${p.id}`);
      if (index >= 0) setSelected(index);
    };
    followHash(); window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, [projects]);
  const project = projects[selected];
  return <div className="project-explorer">
    <div className="project-selector" aria-label="Choose a project preview">
      <p className="mono explorer-label">SELECT A PROJECT / 0{projects.length}</p>
      {projects.map((item, i) => <button type="button" key={item.id} aria-pressed={selected === i} aria-controls="selected-project-preview" onClick={() => setSelected(i)}>
        <span className="mono project-select-number">0{i + 1}</span><span><strong>{item.name}</strong><small>{item.category}</small></span><ArrowUpRight size={18} />
      </button>)}
      <p className="explorer-instruction">Explore the interfaces. Open a project for the engineering behind it.</p>
    </div>
    <div id="selected-project-preview" className="selected-project-preview">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={project.id} initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }} onAnimationComplete={() => { if (window.location.hash === `#project-${project.id}`) document.getElementById(`project-${project.id}`)?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" }); }}>
          <ProjectCard key={project.id} id={project.id} name={project.name} featured details={details[selected]}>
            <div className="preview-project-heading"><p className="project-category mono">{project.category}</p><h3>{project.name}</h3><p>{project.description}</p><div className="badges">{project.technologies.slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}</div></div>
            <div className="project-interface">
              <div className="preview-browser-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span className="mono">{project.id === "crime-analytics" || project.id === "taskflow" || project.id === "rag" ? "INTERACTIVE INTERFACE PREVIEW" : "WORKFLOW PREVIEW"}</span></div>
              {project.id === "crime-analytics" ? <AnalyticsPreview /> : project.id === "taskflow" ? <TaskPreview /> : project.id === "rag" ? <RagPreview /> : <WorkflowPreview project={project} />}
              <div className="preview-disclaimer">Illustrative interface and sample content. {project.building ? "Project in development." : "Explore the source for the actual implementation."}</div>
            </div>
            <div className="preview-quick-links">
              {!project.demoLinks && <LinkAction href={project.demo} label={`Open ${project.name} live application`} className="inline-link">Open live application <ArrowUpRight size={15} /></LinkAction>}
              <LinkAction href={project.github} label={`View ${project.name} repository`} className="inline-link"><Github size={15} />Source code</LinkAction>
            </div>
          </ProjectCard>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
}
