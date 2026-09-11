/**
 * Central site identity + global links.
 * Replace placeholder URLs before deploying.
 */

export const site = {
  name: "Jaskaran Singh",
  tagline:
    "Robotics researcher at Skild AI working on the evaluation and systems integration of S1, and on what it takes for learned robot policies to survive the real world.",
  affiliation: "Skild AI",
  location: "San Jose, California",
  title: "Jaskaran Singh · Robotics & Embodied AI",
  /** Production URL. Set when the domain exists — enables absolute OG/social URLs. */
  url: "" as string, // e.g. "https://jaskaransingh.com"
  description:
    "Jaskaran Singh works on robot learning at Skild AI: evaluation and systems integration for S1 (in-context learning for robotics), and predicting failures in learned robot policies.",
  links: {
    github: "https://github.com/Jaskaran3010",
    linkedin: "https://www.linkedin.com/in/jaskaran-singh-199780222",
    email: "mailto:[ADD-EMAIL]",
    twitter: "https://x.com/JaskaranG408",
  },
  // Path served from /public. Swap the file to change the portrait.
  profileImage: "/media/portrait.jpg",
  /**
   * One closing line at the end of About. Keep it to a single sentence and
   * keep it concrete — a specific activity reads real, a category reads like
   * filler. Set to "" to hide the line entirely.
   */
  // Hidden until the real specifics exist, e.g. "Outside work, I lift and play cricket."
  outsideWork: "",
} as const;

/**
 * External profile links, rendered in the hero, nav, and footer.
 * Entries with an empty href are dropped automatically — set the
 * corresponding field in `site.links` to "" to hide one.
 */
export const externalLinks = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "X", href: site.links.twitter },
].filter((link) => Boolean(link.href));

/**
 * Updates strip — real, linkable events only. Newest first.
 * Never add an entry that cannot be verified with its link.
 */
export const updates = [
  {
    date: "Aug 2026",
    text: "Skild AI releases S1, its in-context-learning robot foundation model. I work on its evaluation and systems integration.",
    href: "https://www.skild.ai/blogs/s1",
    label: "Release",
  },
  {
    date: "Apr 2026",
    text: "Skild AI demos an autonomous scrambled-egg policy on real hardware, a project I contributed to.",
    href: "https://x.com/deepakpathak/status/2041957608794505419",
    label: "Demo",
  },
] as const;

export const nav = [{ label: "Projects", href: "/projects" }] as const;
