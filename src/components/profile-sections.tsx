import {
  Code2,
  Server,
  BrainCircuit,
  Database,
  Cloud,
  Braces,
  GraduationCap,
  Award,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Terminal,
  CircleCheck,
} from "lucide-react";
import {
  profile,
  skills,
  education,
  certifications,
  projects,
} from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { LinkAction } from "./link-action";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";
const skillIcons = {
  code: Code2,
  server: Server,
  brain: BrainCircuit,
  database: Database,
  cloud: Cloud,
};
export function About() {
  return (
    <section id="about" className="section container about-section">
      <div className="two-column">
        <Reveal>
        <SectionHeading
          number="01"
          label="A LITTLE ABOUT ME"
          title="Curious by nature. Practical by choice."
          lines={["Curious by nature.", "Practical by choice."]}
        />
        </Reveal>
        <Reveal className="about-copy" delay={0.12}>
          <p>
            I&apos;m <strong>Anurag Kumar Srivastava</strong>, a Computer
            Science postgraduate with a focus on Python, backend development and
            Generative AI.
          </p>
          <p>
            I enjoy turning ideas into practical, deployable software — from LLM
            applications and RAG systems to intelligent agents, data pipelines
            and cloud-powered backends.
          </p>
          <p>
            My interest lies in how these pieces work together: clean APIs,
            relevant data and AI that helps solve a real problem.
          </p>
          <div className="about-focus">
            <Braces size={19} />
            <span>
              Python &amp; GenAI Developer
              <span>AI Agents · RAG · Data Engineering</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
export function Skills() {
  return (
    <section id="skills" className="section container">
      <Reveal>
        <SectionHeading
          number="02"
          label="TECHNICAL TOOLKIT"
          title="The tools behind the work."
          description="A focused stack for building intelligent applications from API to deployment."
        />
      </Reveal>
        <StaggerContainer className="skills-list">
          {skills.map((group) => {
            const Icon = skillIcons[group.icon as keyof typeof skillIcons];
            return (
              <StaggerItem className="skill-row" key={group.title}>
                <h3>
                  <Icon size={20} />
                  {group.title}
                </h3>
                <div className="skill-items">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
    </section>
  );
}
export function Experience() {
  return (
    <section id="experience" className="section container">
      <Reveal className="two-column">
        <SectionHeading
          number="04"
          label="WHAT'S NEXT"
          title="Ready for the next challenge."
        />
        <div className="opportunity">
          <div className="eyebrow availability">
            <span className="status-dot" />
            OPEN TO OPPORTUNITIES
          </div>
          <h3>Good problems. Useful software.</h3>
          <p>
            I&apos;m actively seeking opportunities to contribute, learn and
            build alongside a team working on practical software and AI
            applications.
          </p>
          <div className="opportunity-roles">
            {[
              "Python Development",
              "Backend Development",
              "GenAI",
              "AI Engineering",
              "Data Engineering",
            ].map((role) => (
              <span key={role}>
                <CircleCheck size={14} />
                {role}
              </span>
            ))}
          </div>
          <a href="#contact" className="button button-secondary">
            Let&apos;s connect
          </a>
        </div>
      </Reveal>
    </section>
  );
}
export function Education() {
  return (
    <section id="education" className="section container">
      <Reveal>
        <SectionHeading
          number="05"
          label="ACADEMIC FOUNDATION"
          title="Learning, with purpose."
        />
        <div className="education-list">
          {education.map((entry) => (
            <div className="education-row" key={entry.short}>
              <div className="education-icon">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="eyebrow">{entry.short}</span>
                <h3>{entry.degree}</h3>
              </div>
              <span className="education-year mono">{entry.year}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
export function Certifications() {
  return (
    <section id="certifications" className="section container">
      <Reveal className="two-column">
        <SectionHeading
          number="06"
          label="CONTINUOUS LEARNING"
          title="Building a stronger foundation."
        />
        <div className="certifications">
          {certifications.map((cert) => (
            <div className="certification-row" key={cert.name}>
              <Award size={28} />
              <div>
                <span className="eyebrow">{cert.issuer} / CLOUD</span>
                <h3>{cert.name}</h3>
                {cert.url ? (
                  <LinkAction
                    href={cert.url}
                    label="Certificate"
                    className="inline-link"
                  >
                    View credential
                  </LinkAction>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
export function GithubSection() {
  return (
    <section id="github" className="section container">
      <Reveal>
        <div className="github-section">
          <div className="github-intro">
            <Github size={30} />
            <p className="eyebrow">CODE &amp; CURIOSITY</p>
            <h2>Built in the open.</h2>
            <p>
              Explore the code, ideas and technical decisions behind my
              projects.
            </p>
            <LinkAction
              href={profile.github}
              label="GitHub profile"
              className="button button-secondary"
            >
              <Github size={16} />
              View GitHub profile
            </LinkAction>
            {!profile.github && (
              <p className="pending-note">Profile link coming soon.</p>
            )}
          </div>
          <div className="repository-list">
            <span className="mono repo-heading">FEATURED PROJECTS</span>
            {projects.slice(0, 3).map((project) => (
                <a key={project.id} href={`#project-${project.id}`} className="repository-row">
                <Terminal size={17} />
                <span>
                  {project.name}
                  <small>{project.technologies.slice(0, 3).join(" · ")}</small>
                </span>
                <span className="repo-language">
                  <i />
                  Python
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
export function Contact() {
  return (
    <section id="contact" className="section container contact-section">
      <Reveal>
        <p className="eyebrow">
          <span className="section-number">07 /</span> LET&apos;S CONNECT
        </p>
        <h2>
          Let&apos;s Build
          <br />
          <span>Something Useful.</span>
        </h2>
        <p className="contact-copy">
          I&apos;m always interested in interesting problems, AI applications
          and opportunities to build practical software.
        </p>
        <div className="contact-links">
          <LinkAction
            href={profile.email ? `mailto:${profile.email}` : ""}
            label="Email address"
            className="button button-primary"
          >
            <Mail size={17} />
            Email me
          </LinkAction>
          <LinkAction
            href={profile.linkedin}
            label="LinkedIn profile"
            className="button button-secondary"
          >
            <Linkedin size={17} />
            LinkedIn
          </LinkAction>
          <LinkAction
            href={profile.github}
            label="GitHub profile"
            className="button button-secondary"
          >
            <Github size={17} />
            GitHub
          </LinkAction>
        </div>
        <p className="demo-link-note mono contact-demo-note">DIRECT CONTACT</p>
        <p className="contact-location">
          <MapPin size={14} />
          {profile.location}
        </p>
      </Reveal>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div>
          <p className="footer-name">ANURAG KUMAR SRIVASTAVA</p>
          <p className="footer-focus">
            Python · GenAI · AI Agents · Data Engineering
          </p>
        </div>
        <div className="footer-links">
          <LinkAction
            href={profile.github}
            label="GitHub profile"
            className="inline-link"
          >
            GitHub
          </LinkAction>
          <LinkAction
            href={profile.linkedin}
            label="LinkedIn profile"
            className="inline-link"
          >
            LinkedIn
          </LinkAction>
          <LinkAction
            href={profile.email ? `mailto:${profile.email}` : ""}
            label="Email address"
            className="inline-link"
          >
            Email
          </LinkAction>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Anurag Kumar Srivastava</span>
        <a href="#home">Back to top</a>
      </div>
    </footer>
  );
}
