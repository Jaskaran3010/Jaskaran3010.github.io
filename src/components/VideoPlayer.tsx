"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaSpec } from "@/data/projects";
import { withPlaceholders } from "./Placeholder";

/**
 * The single reusable media component for all project videos.
 *
 * - MP4/WebM via <source>, with poster support
 * - muted · looped · playsInline
 * - lazy: the video element only mounts when near the viewport,
 *   and playback pauses when scrolled away (keeps many homepage
 *   videos performant)
 * - graceful placeholder state when no footage exists yet, or the
 *   file 404s — the layout reserves the space either way
 * - accessible label + optional caption
 */
export default function VideoPlayer({
  media,
  label,
  className = "",
  showCaption = true,
}: {
  media: MediaSpec;
  label: string;
  className?: string;
  showCaption?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // WCAG 2.2.2 — under prefers-reduced-motion, videos wait for the user
  // (native controls, no autoplay) instead of looping at them.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const hasVideo = Boolean(media.video) && !failed;
  const aspect = media.aspect ?? "16 / 9";

  // Mount the <video> only when close to the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !media.video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [media.video]);

  // Play only while visible.
  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video || !nearViewport || reducedMotion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [nearViewport, reducedMotion]);

  return (
    <figure className={className}>
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden rounded-[3px] bg-video"
        style={{ aspectRatio: aspect }}
      >
        {hasVideo && nearViewport ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay={!reducedMotion}
            controls={reducedMotion}
            disableRemotePlayback
            preload="metadata"
            poster={media.videoPoster || undefined}
            aria-label={label}
            onError={() => setFailed(true)}
          >
            <source src={media.video} type={media.video.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        ) : hasVideo ? (
          // Reserved space before lazy mount — poster if available.
          media.videoPoster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.videoPoster}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : null
        ) : (
          // Placeholder state: quiet dark well with a mono label.
          <div
            role="img"
            aria-label={`${label}, video placeholder`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          >
            <span className="font-mono text-[11px] tracking-[0.16em] text-[#9aa093] uppercase">
              [ Add project video ]
            </span>
            <span className="h-px w-10 bg-[#33362f]" aria-hidden />
            <span className="font-mono text-[10px] tracking-[0.12em] text-[#6b7064]">
              {media.video || "/media/…"}
            </span>
            {/* corner registration marks */}
            <span aria-hidden className="absolute top-3 left-3 h-2.5 w-2.5 border-t border-l border-[#33362f]" />
            <span aria-hidden className="absolute top-3 right-3 h-2.5 w-2.5 border-t border-r border-[#33362f]" />
            <span aria-hidden className="absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-[#33362f]" />
            <span aria-hidden className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-[#33362f]" />
          </div>
        )}
      </div>
      {showCaption && (media.videoCaption || media.externalUrl) ? (
        <figcaption className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-[11px] leading-relaxed text-muted">
          <span>{withPlaceholders(media.videoCaption)}</span>
          {media.externalUrl ? (
            <a
              href={media.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-link shrink-0 text-sage-dark"
            >
              {media.externalLabel ?? "Watch ↗"}
            </a>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
