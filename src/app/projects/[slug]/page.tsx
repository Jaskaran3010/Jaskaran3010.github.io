import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import Reveal from "@/components/Reveal";
import { withPlaceholders, isPlaceholder } from "@/components/Placeholder";
import { publishedProjects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.statement,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const idx = publishedProjects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? publishedProjects[idx - 1] : null;
  const next =
    idx < publishedProjects.length - 1 ? publishedProjects[idx + 1] : null;

  const realLinks = project.links.filter((l) => !isPlaceholder(l.href));
  const pendingLinks = project.links.filter((l) => isPlaceholder(l.href));

  return (
    <>
      <Nav minimal />
      <main id="main">
        {/* ————— Project hero ————— */}
        <section className="mx-auto max-w-4xl px-5 pt-14 sm:px-8 sm:pt-20">
          <Reveal>
            <p className="meta-label mb-5">
              {project.organization} · {project.year}
              {project.status ? ` · ${project.status}` : ""}
            </p>
            <h1
              className={
                project.monoTitle
                  ? "font-mono text-3xl tracking-tight sm:text-[44px] sm:leading-[1.1]"
                  : "text-4xl font-medium tracking-tight sm:text-[48px] sm:leading-[1.06]"
              }
            >
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-[19px] leading-snug text-ink-2 italic sm:text-[21px]">
              {withPlaceholders(project.statement)}
            </p>
          </Reveal>

          {/* Attribution block — robotics research is collaborative. */}
          <Reveal delay={90}>
            <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-hairline py-6 sm:grid-cols-4">
              <div>
                <dt className="meta-label mb-1.5">Role</dt>
                <dd className="text-[13.5px] text-ink-2">
                  {withPlaceholders(project.role)}
                </dd>
              </div>
              <div>
                <dt className="meta-label mb-1.5">Collaborators</dt>
                <dd className="text-[13.5px] text-ink-2">
                  {project.collaborators.length === 0
                    ? "Independent"
                    : project.collaborators.map((person, i) => (
                        <span key={person.name}>
                          {i > 0 ? <span className="text-muted"> · </span> : null}
                          {person.url && !isPlaceholder(person.url) ? (
                            <a
                              href={person.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="quiet-link text-sage-dark"
                            >
                              {person.name}
                            </a>
                          ) : (
                            withPlaceholders(person.name)
                          )}
                        </span>
                      ))}
                </dd>
              </div>
              <div>
                <dt className="meta-label mb-1.5">Organization</dt>
                <dd className="text-[13.5px] text-ink-2">{project.organization}</dd>
              </div>
              <div>
                <dt className="meta-label mb-1.5">Year</dt>
                <dd className="text-[13.5px] text-ink-2">{project.year}</dd>
              </div>
            </dl>
          </Reveal>
        </section>

        {/* ————— Primary demo video ————— */}
        <section className="mx-auto max-w-5xl px-5 pt-12 sm:px-8 sm:pt-16">
          <Reveal>
            <VideoPlayer
              media={project.heroMedia}
              label={`${project.title} primary demonstration`}
            />
          </Reveal>
        </section>

        {/* ————— Sections ————— */}
        <section className="mx-auto max-w-4xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
          <div className="flex flex-col gap-14">
            {project.sections.map((section) => (
              <Reveal key={section.heading}>
                <div className="grid gap-4 sm:grid-cols-[200px_1fr] sm:gap-10">
                  <h2 className="meta-label pt-1">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.body.map((paragraph, i) =>
                      isPlaceholder(paragraph) ? (
                        <p
                          key={i}
                          className="rounded-[3px] border border-dashed border-hairline-2 bg-paper-2 px-4 py-3.5 font-mono text-[12px] leading-relaxed text-muted"
                        >
                          {paragraph}
                        </p>
                      ) : (
                        <p
                          key={i}
                          className="text-[15px] leading-relaxed text-ink-2"
                        >
                          {withPlaceholders(paragraph)}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Tags + links */}
            <Reveal>
              <div className="grid gap-4 border-t border-hairline pt-10 sm:grid-cols-[200px_1fr] sm:gap-10">
                <h2 className="meta-label pt-1">Links</h2>
                <div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {realLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quiet-link font-mono text-[13.5px] text-sage-dark"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                    {pendingLinks.map((link) => (
                      <span
                        key={link.label}
                        className="font-mono text-[12px] text-muted"
                      >
                        {link.label}: <span className="placeholder-token">[ADD URL]</span>
                      </span>
                    ))}
                    {project.links.length === 0 ? (
                      <span className="font-mono text-[12px] text-muted">—</span>
                    ) : null}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[2px] border border-hairline px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Prev / next project navigation */}
          <nav
            aria-label="Project navigation"
            className="mt-20 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2"
          >
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group block">
                <span className="meta-label">← Previous</span>
                <span className="mt-1.5 block text-[15px] text-ink-2 transition-colors group-hover:text-ink">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group block sm:text-right"
              >
                <span className="meta-label">Next →</span>
                <span className="mt-1.5 block text-[15px] text-ink-2 transition-colors group-hover:text-ink">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden />
            )}
          </nav>
          <div className="mt-10">
            <Link href="/" className="quiet-link font-mono text-[13.5px] text-ink-2">
              ← All work
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
