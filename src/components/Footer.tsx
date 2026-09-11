import Link from "next/link";
import { site, nav, externalLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <p className="text-[15px] font-medium tracking-tight">{site.name}</p>
            <p className="mt-1.5 font-mono text-[12px] text-muted">
              {site.affiliation} · {site.location}
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="quiet-link text-[13.5px] text-ink-2"
              >
                {item.label}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-link font-mono text-[12px] tracking-[0.04em] text-muted"
              >
                {link.label} ↗
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-hairline pt-6">
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
            Set in Inter, IBM Plex Mono &amp; Newsreader
          </p>
        </div>
      </div>
    </footer>
  );
}
