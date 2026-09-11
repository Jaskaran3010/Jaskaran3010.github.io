import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { publishedProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Robot learning projects: in-context learning, language-conditioned manipulation, failure prediction, and real-world deployment.",
};

export default function ProjectsIndex() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="pb-6 pt-16 sm:pt-20">
          <Reveal>
            <p className="meta-label mb-5">Index</p>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              Projects
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
              Research and systems work across the robot-learning loop: data,
              policy deployment, evaluation, and failure analysis on real
              hardware.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-12 gap-y-16 border-t border-hairline py-16 sm:grid-cols-2">
          {publishedProjects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 80}>
              <ProjectCard project={{ ...project, size: "small" }} index={i} />
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
