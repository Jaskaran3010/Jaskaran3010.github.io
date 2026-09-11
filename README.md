# Jaskaran Singh — Robotics & Embodied AI

Personal research portfolio. Next.js 15 · React 19 · TypeScript · Tailwind CSS 4.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (deploys directly to Vercel)
```

## Where everything lives

All content is data-driven — you should almost never touch components to
update the site.

| What | File |
| --- | --- |
| Name, tagline, links, profile photo | `src/data/site.ts` |
| All projects (cards + detail pages) | `src/data/projects.ts` |
| Videos, posters, portrait | `public/media/` (see its README) |

## Replacing placeholders

Search the two data files for `[ADD` — every unfinished piece of content is
marked with a token like `[ADD PROJECT VIDEO]`, `[ADD EXACT CONTRIBUTION]`,
`[ADD PUBLIC RESULT]`, `[ADD URL]`. These render in a distinct dashed style on
the site so they're impossible to miss. Replace the string, done.

- **Profile photo** → drop `public/media/portrait.jpg`, set
  `profileImage: "/media/portrait.jpg"` in `src/data/site.ts`.
- **Project video** → drop the MP4 at the path already listed in the project's
  `heroMedia.video`; the placeholder frame is replaced automatically.
- **Links** → replace `[ADD URL]`; links still holding a placeholder are shown
  as pending, not rendered as dead anchors.

## Adding a project

Append an object to `projects` in `src/data/projects.ts`. Fields: `slug`,
`title` (+ `monoTitle` for code-styled names like `yam_jas_kitchen`),
`subtitle`, `statement`, `year`, `role`, `collaborators`, `organization`,
`description`, `heroMedia` (`video` / `videoPoster` / `videoCaption`), `tags`,
`links`, `featured`, `size` (`flagship` | `large` | `small`), `sections`.
The card, index entry, and detail page are generated from it.

## House rules encoded in this site

- No invented results, titles, benchmarks, or claims — placeholders instead.
- Attribution fields (role / collaborators / organization) on every project.
- One primary demo video per project via the single `VideoPlayer` component
  (muted, looped, lazy, plays only while visible).
- SJSU lives quietly in the About section, not the hero.
