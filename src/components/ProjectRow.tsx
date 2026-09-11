import Link from "next/link";
import type { Project } from "@/data/projects";
import VideoPlayer from "./VideoPlayer";
import { withPlaceholders, isPlaceholder } from "./Placeholder";

/**
 * Classic academic-template project row: media thumbnail on the left,
 * title / venue / links / description on the right.
 */
export default function ProjectRow({ project }: { project: Project }) {
  const realLinks = project.links.filter((l) => !isPlaceholder(l.href));

  return (
    <article className="grid gap-5 sm:grid-cols-[300px_1fr] sm:gap-8">
      <Link
        href={`/projects/${project.slug}`}
        className="block self-start overflow-hidden rounded-[4px]"
        aria-label={`${project.title}: project page`}
      >
        <VideoPlayer
          media={project.heroMedia}
          label={`${project.title} demo video`}
          showCaption={false}
        />
      </Link>
      <div>
        <h3 className="text-[19px] leading-snug font-bold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sage-dark hover:underline"
          >
            {project.monoTitle ? (
              <span className="font-mono">{project.title}</span>
            ) : (
              project.title
            )}
          </Link>
        </h3>
        <p className="mt-1 text-[14.5px] text-ink-2">
          <em>{project.organization}</em>, {project.year}
        </p>
        <p className="mt-1 text-[14px]">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sage-dark hover:underline"
          >
            project page
          </Link>
          {realLinks.map((link) => (
            <span key={link.label}>
              <span className="text-muted"> / </span>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-dark hover:underline"
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
          {withPlaceholders(project.description)}
        </p>
      </div>
    </article>
  );
}
