import { Github, ExternalLink, Check, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { LinkAction } from "./link-action";
import { Reveal } from "./reveal";
import { ProjectArchitecture } from "./project-architecture";
import { InteractiveProjectPreview } from "./interactive-project-preview";

function ProjectDetails({ project }: { project: Project }) {
  return <div className="project-details">
    <div className="detail-columns">
      <div><h4>Problem</h4><p>{project.problem}</p></div>
      <div><h4>Approach</h4><p>{project.solution}</p></div>
    </div>
    <h4>Architecture {project.building && <span className="detail-note">/ planned workflow</span>}</h4>
    <ProjectArchitecture stages={project.architecture} />
    <div className="detail-columns detail-bottom">
      <div>
        <h4>Key features {project.building && <span className="detail-note">/ in development</span>}</h4>
        <ul className="feature-list">{project.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
      </div>
      <div><h4>Tech stack</h4><div className="badges">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
    </div>
    <div className="project-links">
      <LinkAction href={project.github} label={`View ${project.name} source code on GitHub`} className="button button-secondary"><Github size={16} />View Source <ArrowUpRight size={14} /></LinkAction>
      <LinkAction href={project.demo} label={`Open ${project.name} live demo`} className="button button-secondary"><ExternalLink size={16} />Live Demo</LinkAction>
      {project.demoLinks && <span className="demo-link-note mono">DEMO DESTINATIONS</span>}
    </div>
  </div>;
}
export function ProjectShowcase() {
  return <section className="section container" id="projects">
    <Reveal><div className="section-header-row">
      <SectionHeading number="03" label="SELECTED WORK" title="Ideas, turned into applications." description="A selection of projects across AI agents, backend systems and data." />
      <span className="section-aside mono">PYTHON AT THE CORE</span>
    </div></Reveal>
    <InteractiveProjectPreview projects={projects} details={projects.map(project => <ProjectDetails key={project.id} project={project} />)} />
  </section>;
}

