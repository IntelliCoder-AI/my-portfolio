import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import {
  About,
  Skills,
  Experience,
  Education,
  Certifications,
  GithubSection,
  Contact,
  Footer,
} from "@/components/profile-sections";
import { ProjectShowcase } from "@/components/project-showcase";
import { ScrollProgress } from "@/components/scroll-progress";
export default function Home() {
  return (
    <>
      <span id="header-marker" aria-hidden="true" />
      <ScrollProgress />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ProjectShowcase />
        <Experience />
        <Education />
        <Certifications />
        <GithubSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
