import { Github, Download, MapPin, ArrowUpRight, ArrowDown } from "lucide-react";
import { LinkAction } from "./link-action";
import { IntelligencePipeline } from "./intelligence-pipeline";
import { profile } from "@/data/portfolio";

function LinkedInMark({ size = 22 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" role="img">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM3.54 20.45h3.56V9H3.54v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>;
}

export function Hero() {
  return <section className="hero container" id="home" aria-labelledby="hero-heading">
    <div className="hero-main">
      <div className="eyebrow availability hero-status"><span className="status-dot" />OPEN TO OPPORTUNITIES</div>
      <p className="intro">Hi, I&apos;m Anurag Kumar Srivastava.</p>
      <h1 id="hero-heading">
        <span className="hero-line"><span>I build intelligent</span></span>{" "}
        <span className="hero-line"><span>applications with</span></span>{" "}
        <span className="hero-line"><span className="accent-text">Python, LLMs</span></span>{" "}
        <span className="hero-line"><span>&amp; <span className="accent-text">AI Agents.</span></span></span>
      </h1>
      <p className="hero-copy">Computer Science postgraduate focused on building practical AI systems, backend applications, RAG pipelines, intelligent agents and data-driven solutions.</p>
      <div className="hero-ctas">
        <a className="button button-primary" href="#projects">View Projects <ArrowUpRight size={17} /></a>
        <LinkAction href={profile.github} label="GitHub profile" className="button button-secondary"><Github size={17} />GitHub</LinkAction>
        {profile.linkedin && <LinkAction href={profile.linkedin} label="LinkedIn profile" className="button button-secondary"><LinkedInMark />LinkedIn</LinkAction>}
        <LinkAction href={profile.resume} label="Open Anurag Kumar Srivastava resume in a new tab" className="button button-text" newTab><Download size={17} />View Resume</LinkAction>
      </div>
      <div className="hero-meta">
        <span><MapPin size={16} />{profile.location}</span>
      </div>
    </div>
    <IntelligencePipeline />
    <div className="hero-bottom mono">
      <span>PYTHON &amp; GENAI DEVELOPER</span>
      <a href="#about">SCROLL TO EXPLORE <ArrowDown size={13} /></a>
      <span>PORTFOLIO / 2026</span>
    </div>
  </section>;
}

