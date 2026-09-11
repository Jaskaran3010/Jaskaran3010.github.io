import { site } from "@/data/site";

/**
 * Editorial portrait slot for the hero. Renders the real photo when
 * site.profileImage is set; otherwise a quiet, intentional placeholder
 * frame that keeps the layout polished.
 */
export default function ProfileImage() {
  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
      <div
        className="relative w-full overflow-hidden rounded-[3px] border border-hairline bg-paper-2"
        style={{ aspectRatio: "4 / 5" }}
      >
        {site.profileImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.profileImage}
            alt="Portrait of Jaskaran Singh"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label="Portrait placeholder"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          >
            <span className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              [ Add profile image ]
            </span>
            <span className="h-px w-10 bg-hairline-2" aria-hidden />
            <span className="font-mono text-[10px] tracking-[0.12em] text-muted/70">
              4 : 5 portrait
            </span>
            <span aria-hidden className="absolute top-3 left-3 h-2.5 w-2.5 border-t border-l border-hairline-2" />
            <span aria-hidden className="absolute top-3 right-3 h-2.5 w-2.5 border-t border-r border-hairline-2" />
            <span aria-hidden className="absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-hairline-2" />
            <span aria-hidden className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-hairline-2" />
          </div>
        )}
      </div>
      {/* small caption line, editorial-style */}
      <p className="mt-2.5 text-right font-mono text-[11px] tracking-[0.1em] text-muted">
        San Jose, CA
      </p>
    </div>
  );
}
