import { Braces, Github, ExternalLink, Check, ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { LinkAction } from "./link-action";
import { Reveal } from "./reveal";
import { ProjectCard } from "./project-card";
import { AnalyticsWorkflow } from "./review-workflow";

function ProjectDetails({ project }: { project: Project }) {
  return <div className="project-details">
    <div className="detail-columns">
      <div><h4>Problem</h4><p>{project.problem}</p></div>
      <div><h4>Approach</h4><p>{project.solution}</p></div>
    </div>
    <h4>Architecture {project.building && <span className="detail-note">/ planned workflow</span>}</h4>
    <ol className="architecture">
      {project.architecture.map((stage, index) => <li key={stage}><span className="mono">0{index + 1}</span>{stage}</li>)}
    </ol>
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
  const featured = projects[0];
  return <section className="section container" id="projects">
    <Reveal><div className="section-header-row">
      <SectionHeading number="03" label="SELECTED WORK" title="Ideas, turned into applications." description="A selection of projects across AI agents, backend systems and data." />
      <span className="section-aside mono">PYTHON AT THE CORE</span>
    </div></Reveal>
    <Reveal delay={0.1}>
      <ProjectCard id={featured.id} name={featured.name} featured details={<ProjectDetails project={featured} />}>
        <div className="featured-content">
          <div className="project-label-row"><span className="eyebrow">FEATURED PROJECT</span><span className="building-tag"><span className="status-dot" />Live &amp; Deployed</span></div>
          <p className="project-category mono">{featured.category}</p>
          <h3>{featured.name}</h3>
          <p className="project-description">{featured.description}</p>
          <div className="badges">{featured.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
        </div>
        <AnalyticsWorkflow />
      </ProjectCard>
    </Reveal>
    <div className="project-grid">
      {projects.slice(1).map((project, index) => <Reveal key={project.id} delay={index % 2 * 0.08}>
        <ProjectCard id={project.id} name={project.name} details={<ProjectDetails project={project} />}>
          <div className="project-card-top"><span className="project-index mono">0{index + 2}</span><Braces size={20} /></div>
          <p className="project-category mono">{project.category}</p>
          <h3>{project.name}</h3><p className="project-description">{project.description}</p>
          <div className="badges">{project.technologies.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
        </ProjectCard>
      </Reveal>)}
    </div>
  </section>;
}

