"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, externalLinks } from "@/data/site";

const external = externalLinks;

/**
 * Site navigation. `minimal` renders the reduced version used on
 * project pages: name + a back link, nothing else competing with the work.
 */
export default function Nav({ minimal = false }: { minimal?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes the mobile menu and returns focus to the toggle;
  // resizing past the breakpoint clears stale open state.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight text-ink transition-colors hover:text-sage"
        >
          Jaskaran Singh
        </Link>

        {minimal ? (
          <Link
            href="/"
            className="quiet-link font-mono text-[12px] tracking-[0.08em] text-ink-2"
          >
            ← All work
          </Link>
        ) : (
          <>
            {/* Desktop */}
            <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="quiet-link text-[13.5px] text-ink-2 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <span aria-hidden className="h-3.5 w-px bg-hairline-2" />
              {external.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link font-mono text-[12px] tracking-[0.04em] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {!minimal && open ? (
        <nav
          id="mobile-menu"
          aria-label="Primary mobile"
          className="border-t border-hairline bg-paper px-5 pb-6 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-hairline py-3.5 text-[15px] text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-6 pt-4">
            {external.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.04em] text-muted"
              >
                {item.label} ↗
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
