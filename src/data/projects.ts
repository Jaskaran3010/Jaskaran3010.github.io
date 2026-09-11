/**
 * Central project registry.
 *
 * Every project on the site is defined here. Pages and cards render from
 * this data — to add a project, add an entry; to update content, edit here.
 *
 * Placeholders like [ADD PROJECT VIDEO] are intentional. Replace them with
 * real content as it becomes public — never with invented claims.
 */

export type MediaSpec = {
  /** Path under /public, e.g. "/media/icl-demo.mp4". Empty = placeholder shown. */
  video: string;
  /** Poster image shown before the video loads. Empty = quiet placeholder frame. */
  videoPoster: string;
  /** Short caption rendered under the video. */
  videoCaption: string;
  /** CSS aspect ratio for the reserved media area, e.g. "16 / 9". */
  aspect?: string;
  /** Optional external link rendered with the caption (e.g. the public demo post). */
  externalUrl?: string;
  externalLabel?: string;
};

export type ProjectLink = {
  label: string;
  href: string; // "[ADD URL]" until real
};

export type Collaborator = {
  name: string;
  /** Personal site or profile. "[ADD URL]" until confirmed — placeholder URLs render unlinked. */
  url?: string;
};

export type ProjectSection = {
  heading: string;
  /** Paragraphs. Placeholder strings are rendered in a distinct placeholder style. */
  body: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** Render title in monospace (for code-styled identities like yam_jas_kitchen). */
  monoTitle?: boolean;
  subtitle: string;
  /** One-sentence research statement for the project hero. */
  statement: string;
  year: string;
  role: string;
  collaborators: Collaborator[];
  organization: string;
  description: string;
  heroMedia: MediaSpec;
  tags: string[];
  links: ProjectLink[];
  featured: boolean;
  /** Set false to hide a project everywhere until its public release. */
  published?: boolean;
  /** Visual weight on the homepage. */
  size: "flagship" | "large" | "small";
  status?: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  // ————————————————————————————————————————————————————————————————
  // 1 · FLAGSHIP — In-context learning
  // ————————————————————————————————————————————————————————————————
  {
    slug: "in-context-learning",
    title: "S1: In-Context Learning for Robotics",
    subtitle: "Skild AI's flagship robotic foundation model",
    statement:
      "A robotic foundation model that learns tasks in context: show it a video demonstration, short or long, seen or unseen, and it executes without fine-tuning.",
    year: "Apr 2026–present",
    role: "Evaluation & systems integration",
    collaborators: [{ name: "Skild AI team" }],
    organization: "Skild AI",
    description:
      "Skild AI's flagship robotic foundation model, built around in-context learning. Tasks are specified by a video demonstration rather than language, and S1 executes unseen tasks, including extremely long-horizon ones, with a single set of weights. My part is evaluation and systems integration: how S1 is measured against the real world, and how the stack around the model is made to work as one system.",
    heroMedia: {
      video: "/media/icl-demo.mp4",
      videoPoster: "/media/icl-poster.jpg",
      videoCaption:
        "S1 executing unseen tasks from video demonstrations. Release cover video, Skild AI.",
      aspect: "16 / 9",
      externalUrl: "https://www.skild.ai/blogs/s1",
      externalLabel: "Read the release ↗",
    },
    tags: ["real-world evaluation", "in-context learning", "long-horizon manipulation", "foundation models"],
    links: [
      { label: "release", href: "https://www.skild.ai/blogs/s1" },
      // Re-add the announcement link when it exists.
    ],
    featured: true,
    size: "flagship",
    status: "Released 2026",
    sections: [
      {
        heading: "What S1 is",
        body: [
          "S1 is Skild AI's flagship robotic foundation model, built around in-context learning: tasks are specified by a video demonstration, not language. Show the task, short or long, seen or unseen, and the robot executes it. At inference time, the demonstration drives the model without changing any weights; no fine-tuning is involved.",
          "The distinguishing result is horizon. S1 performs unseen tasks up to ten minutes long: plant potting, pancake flipping, pour-over coffee, kit assembly. It is the first time a robotics foundation model has shown in-context learning on extremely long-horizon tasks.",
        ],
      },
      {
        heading: "From the release",
        body: [
          "With scale, in-context learning overtakes language-prompted policies on unseen tasks: a 7× improvement (66% vs. 9% success at 100k hours of pre-training data).",
          "A single demonstration in context is worth roughly 380 post-training examples.",
          "Under the heaviest environment perturbations, a language-prompted baseline degrades up to three times as much as the in-context policy.",
        ],
      },
      {
        heading: "My contribution",
        body: [
          "S1 is a team project at Skild AI. The core research and algorithms are the team's work, and the model itself is not mine. My part is two things. First, evaluation: I was the first person on S1's evals, building how the model gets measured against the real world, which is where a foundation model's claims are either earned or not. Second, systems integration: making the pieces around the model work as one system. In robotics nothing counts until the whole system works and the numbers hold, and that is the part I carry.",
        ],
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————
  // 2 · yam_jas_kitchen
  // ————————————————————————————————————————————————————————————————
  {
    slug: "yam-jas-kitchen",
    title: "yam_jas_kitchen",
    monoTitle: true,
    subtitle: "Language-conditioned long-horizon manipulation",
    statement:
      "A language-conditioned robot policy for food preparation: the user places an order in natural language, and the robot composes the multi-step behavior to fulfill it.",
    year: "2025",
    role: "[ADD EXACT ROLE]",
    collaborators: [{ name: "[ADD COLLABORATORS]" }],
    organization: "Skild AI",
    description:
      "A language-conditioned robotics project around food preparation. Orders arrive as natural language with varying combinations of ingredients and options; the policy interprets the instruction and executes the corresponding long-horizon manipulation behavior.",
    heroMedia: {
      video: "/media/jas-kitchen-demo.mp4", // [ADD PROJECT VIDEO]
      videoPoster: "",
      videoCaption:
        "[ADD PROJECT VIDEO]: an order given in language, and the corresponding robot execution.",
      aspect: "16 / 9",
    },
    tags: ["language conditioning", "compositional instructions", "bimanual manipulation"],
    links: [{ label: "Demo reel", href: "[ADD URL]" }],
    featured: true,
    // Unreleased — flip to true when the project is public.
    published: false,
    size: "large",
    sections: [
      {
        heading: "Problem",
        body: [
          "Scripted demos execute one fixed trajectory. yam_jas_kitchen is built around the opposite premise: the requested behavior is not known in advance. A food order arrives in natural language, in varying combinations of available ingredients and options, and the policy has to interpret the instruction and execute the corresponding behavior.",
        ],
      },
      {
        heading: "Why it matters",
        body: [
          "Food preparation is a compact testbed for questions that matter broadly in robot learning: following language, composing behaviors from varying instructions, sustaining multi-step manipulation over long horizons, and holding up under real-world deployment conditions.",
        ],
      },
      {
        heading: "What makes it interesting",
        body: [
          "Language conditioning: the instruction determines the behavior, not a fixed script.",
          "Compositional orders: requested combinations vary, so the policy must generalize across instructions rather than replay a single trajectory.",
          "Long-horizon execution: fulfilling an order means chaining many manipulation steps in sequence on real hardware.",
        ],
      },
      {
        heading: "My contribution",
        body: [
          "[ADD EXACT CONTRIBUTION: policy iteration, deployment, and evaluation work, stated precisely.]",
        ],
      },
      {
        heading: "Demonstrations",
        body: [
          "[ADD PROJECT VIDEO: order-and-execution pairs, the language prompt shown beside the corresponding robot behavior.]",
        ],
      },
      {
        heading: "Results & observations",
        body: ["[ADD PUBLIC RESULT: evaluation notes and observed failure modes.]"],
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————
  // 3 · Failure prediction research
  // ————————————————————————————————————————————————————————————————
  {
    slug: "robot-failure-prediction",
    title: "Understanding & Predicting Robot Failures",
    subtitle: "Toward robots that know when things are going wrong",
    statement:
      "Can a robot system recognize, or even anticipate, failures early enough to make learned policies more reliable?",
    year: "2025–present",
    role: "Researcher",
    collaborators: [
      { name: "Pedro Morgado", url: "https://pedro-morgado.github.io/" },
      {
        name: "Ishaan Shah",
        url: "https://www.linkedin.com/in/ishaan-shah-613578138/",
      },
    ],
    organization: "Skild AI",
    description:
      "Research on visual and temporal signals that indicate when robot behavior is going well, failing, recovering, or about to fail. Built on frozen pretrained visual representations with temporal modeling on top.",
    heroMedia: {
      video: "/media/failure-prediction-demo.mp4", // [ADD PROJECT VIDEO]
      videoPoster: "",
      videoCaption:
        "[ADD PROJECT VIDEO]: rollout with predicted state (good / failure / recovery) over time.",
      aspect: "16 / 9",
    },
    tags: ["failure prediction", "DINOv3", "temporal modeling", "policy evaluation"],
    links: [], // add a write-up link when one is public
    featured: true,
    // Hidden for now — flip to true to restore.
    published: false,
    size: "large",
    status: "Active research",
    sections: [
      {
        heading: "Motivation",
        body: [
          "Learned policies fail, and in the real world failures have costs. The interesting question is not whether a single bad frame can be classified after the fact. It is whether a robot system can recognize or anticipate failures early enough to intervene: pause, retry, recover, or ask for help. That capability is a prerequisite for reliable deployment.",
        ],
      },
      {
        heading: "Problem formulation",
        body: [
          "We frame rollout understanding as classification over robot behavior with three states (good, failure, and recovery) and study both detection (is this failing now?) and prediction (is this about to fail?). Evaluation is done at the event level, not just per-frame, because what matters in deployment is catching failure events, not scoring individual frames.",
        ],
      },
      {
        heading: "Representation",
        body: [
          "The visual backbone is a frozen pretrained representation: DINOv3 with a ViT-L/16 architecture, producing 1024-dimensional features per frame. Lightweight classifier heads are trained on top; keeping the backbone frozen isolates the question of what the representation already knows about robot success and failure.",
        ],
      },
      {
        heading: "Temporal modeling",
        body: [
          "Single frames are ambiguous: a gripper hovering above an object looks similar whether the grasp is about to succeed or slip. We compare approaches that incorporate temporal context and temporal smoothing against per-frame baselines, and study formulations that look ahead, predicting failure before it visibly occurs.",
        ],
      },
      {
        heading: "Evaluation",
        body: [
          "We evaluate with precision–recall and ROC analysis (PR-AUC, ROC-AUC), event-level recall, and false-positive rates; the operating point that matters for a deployed monitor is high event recall at a tolerable false-alarm rate.",
          "[ADD PUBLIC RESULT: quantitative results will be added when publishable numbers are final.]",
        ],
      },
      {
        heading: "Failure & recovery examples",
        body: [
          "[ADD PROJECT VIDEO: qualitative examples of detected failures, correctly identified recoveries, and early predictions.]",
        ],
      },
      {
        heading: "Findings & open questions",
        body: [
          "[ADD FINDINGS: what temporal context buys over per-frame classification, where prediction remains hard, and what this implies for closing the loop from detection to intervention.]",
        ],
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————
  // 4 · Scrambled egg (formative, smaller)
  // ————————————————————————————————————————————————————————————————
  {
    slug: "scrambled-egg",
    title: "Scrambled Egg",
    subtitle: "Formative robot-learning project",
    statement:
      "An autonomous cooking policy on real hardware, and the project where I learned what the robot-learning loop actually demands.",
    year: "2025",
    role: "Co-lead",
    collaborators: [
      { name: "Junyao Shi", url: "https://junyaoshi.github.io" },
    ],
    organization: "Skild AI",
    description:
      "An earlier project in my robotics development: cooking scrambled eggs with a learned policy. The task was Junyao Shi's; I co-led it with him, and he taught me the robot-policy workflow end to end, from real hardware and checkpoints to watching real policies fail and iterating.",
    heroMedia: {
      video: "/media/scrambled-egg-demo.mp4",
      videoPoster: "/media/scrambled-egg-poster.jpg",
      videoCaption: "Autonomous scrambled-egg rollout, 1× speed. Public demo posted on X.",
      aspect: "16 / 9",
      externalUrl: "https://x.com/deepakpathak/status/2041939631860482211",
      externalLabel: "Watch the demo on X ↗",
    },
    tags: ["imitation learning", "real hardware", "policy evaluation"],
    links: [
      {
        label: "demo on X",
        href: "https://x.com/deepakpathak/status/2041939631860482211",
      },
    ],
    featured: true,
    size: "large",
    sections: [
      {
        heading: "What this project was for me",
        body: [
          "The task was Junyao Shi's, and I co-led it with him while he taught me the workflow along the way. It was formative rather than headline work, and it gave me hands-on exposure to the entire loop: real robot hardware, running learned policies, deployment, evaluating behavior, debugging, understanding checkpoints, seeing real robot-policy failures up close, and iterating on the system.",
          "Most of what I now do on larger projects, and most of my instincts about where robot-learning systems actually break, traces back to reps like these.",
        ],
      },
    ],
  },

  // ————————————————————————————————————————————————————————————————
  // 5 · SO-101 (supporting evidence, small)
  // ————————————————————————————————————————————————————————————————
  {
    slug: "so-101",
    title: "SO-101 Imitation Learning",
    subtitle: "End-to-end imitation-learning setup",
    statement:
      "Building and deploying an imitation-learning pipeline on a 6-DoF arm, end to end.",
    year: "2025",
    role: "Builder",
    collaborators: [],
    organization: "Personal",
    description:
      "An imitation-learning setup on an SO-101 6-DoF robot arm: a synchronized demonstration-capture pipeline, calibration and normalization, training with LeRobot and PyTorch on CUDA, and real-time policy deployment.",
    heroMedia: {
      video: "/media/so-101-demo.mp4", // [ADD PROJECT VIDEO]
      videoPoster: "",
      videoCaption: "[ADD PROJECT VIDEO]: real-time policy execution.",
      aspect: "16 / 9",
    },
    tags: ["LeRobot", "PyTorch", "6-DoF", "real-time deployment"],
    links: [], // publish the repo, then add the real GitHub link
    featured: true,
    // Hidden for now — flip to true to restore.
    published: false,
    size: "small",
    sections: [
      {
        heading: "Overview",
        body: [
          "A self-contained imitation-learning system: a synchronized demonstration-capture pipeline for a 6-DoF SO-101 arm, calibration and normalization, policy training with LeRobot and PyTorch on CUDA, and real-time deployment.",
          "Small in scope by design, built and deployed end to end, solo: demonstration capture, calibration and normalization, training, and real-time execution.",
        ],
      },
    ],
  },
];

/** Projects that are public — everything renders from this list. */
export const publishedProjects = projects.filter((p) => p.published !== false);

export const featuredProjects = publishedProjects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}
