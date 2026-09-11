import Link from "next/link";
import type { Project } from "@/data/projects";
import VideoPlayer from "./VideoPlayer";
import { withPlaceholders } from "./Placeholder";

/**
 * Homepage / index project card. Three visual weights:
 *  - flagship: full-width, largest media, extended description
 *  - large:    full-width, strong media
 *  - small:    half-width grid cell, compact
 */
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const small = project.size === "small";
  const flagship = project.size === "flagship";
  const large = project.size === "large";

  return (
    <article className={small ? "" : "w-full"}>
      <Link
        href={`/projects/${project.slug}`}
        className={
          large
            ? "group grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10"
            : "group block"
        }
        aria-label={`${project.title}: ${project.subtitle}`}
      >
        {/* Media — the single primary demo video for this project. */}
        <div className="overflow-hidden rounded-[3px]">
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015] group-focus-visible:scale-[1.015]">
            <VideoPlayer
              media={project.heroMedia}
              label={`${project.title} demo video`}
              showCaption={false}
            />
          </div>
        </div>

        {/* Text */}
        <div
          className={`flex flex-col gap-2 ${
            flagship ? "mt-6" : large ? "mt-5 lg:mt-1" : "mt-5"
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <div className="flex items-baseline gap-4">
              {typeof index === "number" ? (
                <span className="font-mono text-[11px] text-muted" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : null}
              <h3
                className={
                  project.monoTitle
                    ? `font-mono tracking-tight text-ink ${flagship ? "text-2xl" : small ? "text-lg" : "text-[22px]"}`
                    : `font-medium tracking-tight text-ink ${flagship ? "text-2xl sm:text-3xl" : small ? "text-lg" : "text-[22px] sm:text-2xl"}`
                }
              >
                {project.title}
              </h3>
            </div>
            <span className="font-mono text-[11px] tracking-[0.08em] text-muted">
              {project.year}
              {project.status ? ` · ${project.status}` : ""}
            </span>
          </div>

          <p
            className={`max-w-2xl text-ink-2 ${flagship ? "text-[15px] leading-relaxed" : "text-[14px] leading-relaxed"}`}
          >
            {small ? project.subtitle : withPlaceholders(project.statement)}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {small ? (
              <span className="font-mono text-[11px] tracking-[0.04em] text-muted">
                {project.tags.join(" · ")}
              </span>
            ) : (
              project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[2px] border border-hairline px-2 py-0.5 font-mono text-[11px] tracking-[0.04em] text-muted transition-colors group-hover:border-hairline-2"
                >
                  {tag}
                </span>
              ))
            )}
            <span className="ml-auto hidden items-center gap-1 font-mono text-[11px] text-sage transition-transform duration-300 group-hover:translate-x-0.5 sm:flex">
              View project <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
