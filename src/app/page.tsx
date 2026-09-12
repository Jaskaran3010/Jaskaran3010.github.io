import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import { featuredProjects } from "@/data/projects";
import { site, externalLinks, updates } from "@/data/site";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-16 mb-8 border-l-4 border-sage pl-4 text-[26px] font-bold tracking-tight">
      {children}
    </h2>
  );
}

const accent = "text-sage-dark hover:underline";

export default function Home() {
  return (
    <main
      id="main"
      className="mx-auto max-w-[880px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20"
    >
      {/* ————— Name ————— */}
      <h1 className="text-center text-[40px] font-semibold tracking-tight sm:text-[46px]">
        {site.name}
      </h1>
      <p className="mt-3 text-center font-mono text-[13px] text-muted">
        {site.affiliation} · {site.location}
      </p>

      {/* ————— Bio + portrait ————— */}
      <div className="mt-12 flex flex-col-reverse items-center gap-10 sm:flex-row sm:items-start sm:gap-14">
        <div className="flex-1 space-y-5 text-[15px] leading-relaxed text-ink-2">
          <p>
            I work on robot learning at{" "}
            <a
              href="https://www.skild.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={accent}
            >
              Skild AI
            </a>
            , on{" "}
            <Link href="/projects/in-context-learning" className={accent}>
              S1
            </Link>
            , Skild&apos;s in-context-learning robot foundation model. My work
            sits on both sides of the model: the evaluation that decides what
            can honestly be concluded from what S1 does, and the data pipeline
            and systems that decide what it is shown in the first place.
          </p>
          <p>
            My research interests are the evaluation of robot foundation
            models, the data pipelines that bound what those models can learn,
            and predicting failures in learned policies before they happen.
          </p>
          <p>
            The hard problem in robot learning has moved. Getting a policy to
            work once is a demo; knowing whether it will work again, before it
            is deployed, is the science. I was the first person on S1&apos;s
            evaluation, and that is the question I work on.
          </p>
          <p>
            The first learned policy I worked with{" "}
            <Link href="/projects/scrambled-egg" className={accent}>
              cooked scrambled eggs
            </Link>
            . Watching it fail on real hardware, on a task I thought it had,
            taught me that a policy is only as good as the evaluation that
            catches it failing.
          </p>
          <p>
            I&apos;ve been lucky to learn this craft from{" "}
            <a
              href="https://junyaoshi.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className={accent}
            >
              Junyao Shi
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/ishaan-shah-613578138/"
              target="_blank"
              rel="noopener noreferrer"
              className={accent}
            >
              Ishaan Shah
            </a>
            , and{" "}
            <a
              href="https://pedro-morgado.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className={accent}
            >
              Pedro Morgado
            </a>
            .
          </p>
          <p>
            I&apos;m completing a B.S. in Software Engineering at San José
            State University.
          </p>
        </div>
        {site.profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.profileImage}
            alt="Portrait of Jaskaran Singh"
            className="h-[185px] w-[185px] shrink-0 rounded-full border border-hairline object-cover sm:h-[205px] sm:w-[205px]"
          />
        ) : (
          <div
            role="img"
            aria-label="Portrait placeholder"
            className="flex h-[185px] w-[185px] shrink-0 items-center justify-center rounded-full border border-hairline-2 bg-paper-2 sm:h-[205px] sm:w-[205px]"
          >
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              [ Add photo ]
            </span>
          </div>
        )}
      </div>

      {/* ————— Link row ————— */}
      <p className="mt-9 text-center text-[14.5px]">
        {externalLinks.map((link, i) => (
          <span key={link.label}>
            {i > 0 ? <span className="text-muted"> / </span> : null}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={accent}
            >
              {link.label}
            </a>
          </span>
        ))}
      </p>

      {/* ————— News ————— */}
      <SectionHeading>News</SectionHeading>
      <ul className="space-y-3.5 text-[15px] leading-relaxed text-ink-2">
        {updates.map((item, i) => (
          <li key={item.href}>
            <span className="font-semibold text-ink">{item.date}:</span>{" "}
            {item.text}{" "}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={accent}
            >
              [{item.label.toLowerCase()}]
            </a>
            {i === 0 ? (
              <span className="ml-2 inline-block translate-y-[-1px] rounded-[3px] bg-sage px-1.5 py-0.5 font-mono text-[9.5px] font-medium tracking-[0.08em] text-paper uppercase">
                New
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      {/* ————— Research & Projects ————— */}
      <SectionHeading>Industry Research &amp; Projects</SectionHeading>
      <div className="space-y-12">
        {featuredProjects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>

      {/* ————— Colophon ————— */}
      <p className="mt-20 border-t border-hairline pt-6 text-center font-mono text-[11px] tracking-[0.08em] text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
    </main>
  );
}
