// ─── Type Definitions ────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  category: "ai" | "web" | "mobile";
  deployedUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: "Work", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

// ─── Site ────────────────────────────────────────────────────────────────────

export const siteConfig = {
  url: "https://anishtejwani.dev",
  githubUsername: "anish891",
  githubUrl: "https://github.com/anish891",
  linkedinUrl: "https://linkedin.com/in/anishtejwani",
  xUrl: "https://x.com/anish_891",
};

// ─── Now & Quote ───────────────────────────────────────────────

export const nowContent = {
  label: "Now",
  text: "Building ChainDeck: NIFTY options analytics from live NSE data.",
};

export const quote = {
  text: "Make it work, make it right, make it fast.",
  author: "Kent Beck",
};

// ─── Hero Content ────────────────────────────────────────────────────────────

export const heroContent = {
  name: "Anish Tejwani",
  intro:
    "I build intelligent software systems, AI-powered applications, and scalable web platforms. Passionate about solving complex problems through automation, modern engineering practices, and elegant user experiences.",
  location: "Mumbai, India",
  email: "anishtejwani891@gmail.com",
  roles: [
    "Software Architect",
    "Systems Builder",
    "Product Engineer",
    "Full-Stack Developer",
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export const aboutContent = {
  interests: [
    "Artificial Intelligence",
    "Distributed Systems",
    "Backend Engineering",
    "Developer Productivity",
    "System Design",
    "Open Source",
  ],
};

// ─── Tech Stack ──────────────────────────────────────────────────────────────

export const techStack: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    skills: [
      { name: "Java" },
      { name: "Python" },
      { name: "TypeScript" },
      { name: "JavaScript" },
    ],
  },
  {
    name: "Frontend",
    icon: "Layout",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind" },
      { name: "Flutter" },
    ],
  },
  {
    name: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "FastAPI" },
      { name: "REST APIs" },
    ],
  },
  {
    name: "Data & Cloud",
    icon: "Database",
    skills: [
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "Redis" },
      { name: "FalkorDB" },
      { name: "Vercel" },
    ],
  },
  {
    name: "AI & ML",
    icon: "Brain",
    skills: [
      { name: "LangChain" },
      { name: "AI Agents" },
      { name: "LLM Integrations" },
    ],
  },
  {
    name: "Engineering",
    icon: "GitBranch",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "CI/CD" },
      { name: "GitHub Actions" },
      { name: "Docker" },
      { name: "Agile" },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "chaindeck",
    title: "ChainDeck",
    description:
      "A live NIFTY 50 options analytics dashboard: OI buildup, Max Pain, Gamma Exposure, volatility panels and alerts, computed from live NSE data.",
    longDescription:
      "ChainDeck (formerly Nifty OI Tracker) is a live, auto-refreshing dashboard for NIFTY 50 options traders. It pulls the option chain from NSE and turns it into signals: Open Interest buildup, Put-Call Ratio, Max Pain, Central Pivot Range, Gamma Exposure with the zero-gamma level, 25-delta risk reversal and a composite market regime that feeds a plain-language trade setup.\n\nRecent work added a rolling ATM straddle panel, an IV vs realised volatility view on a trading-time basis (with IV percentile against saved sessions), a strike-wise OI structure chart, and configurable browser alerts. Under the hood, Max Pain uses prefix sums instead of a brute-force O(n²) scan, unusual OI flow is flagged with Welford\u0027s online algorithm, and cosine similarity over session feature vectors surfaces days that looked like today.\n\nIntraday snapshots (about one a minute) are stored on Upstash Redis over REST, which powers the timeline chart, the 5m/15m rate-of-change figures and end-of-day session summaries, with an in-memory fallback when no database is configured. A caching Express proxy with request coalescing handles NSE\u0027s cookie and header requirements. The app is hardened with a strict Content-Security-Policy, no third-party assets, input validation, rate limiting and authenticated cron endpoints, and ships with a verification test suite.",
    features: [
      "Live NSE option chain through a caching Express proxy",
      "Max Pain via prefix sums, plus Gamma Exposure and zero-gamma level",
      "Composite market regime and auto-generated trade setup",
      "Rolling ATM straddle and IV vs realised volatility panels",
      "Welford\u0027s algorithm for unusual-flow detection, cosine similarity for session matching",
      "Intraday history on Upstash Redis with in-memory fallback",
      "Configurable browser alerts and strike-wise OI structure chart",
      "Strict CSP, input validation, rate limiting and a test suite",
    ],
    techStack: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "Upstash Redis",
      "Vercel",
    ],
    category: "web",
    deployedUrl: "https://chaindeck.vercel.app/",
    image: "/projects/chaindeck.jpg",
    githubUrl: "https://github.com/anish891/chaindeck",
  },
  {
    id: "unbake",
    title: "Unbake",
    description:
      "Recovers the formulas behind a spreadsheet exported as plain values, and finds the cells someone typed wrong. Runs entirely in the browser.",
    longDescription:
      "Unbake is formula archaeology for spreadsheets. When a billing system, bank or payroll tool exports a sheet as plain values, every formula is replaced by the number it happened to produce. Unbake works backwards from those numbers: it figures out the formulas that must have made them, then uses those formulas to flag the cells someone typed wrong and to say what kind of slip it was, such as swapped digits or a slipped decimal point.\n\nFor each numeric column it builds a library of candidate terms (other columns, products, ratios, the previous row, lookup tables keyed by text columns) and fits combinations with RANSAC, so a few wrong cells cannot bend the answer. Coefficients snap to the simplest number that loses no rows, so 0.0824999 becomes 0.0825. It also finds rate tables, running totals and threshold IF rules such as overtime and tiered commission. A blame solver then picks the single cell whose correction repairs the most broken calculations without breaking any that hold.\n\nEverything runs in the browser with plain JavaScript and a Web Worker. There is no upload, no server and no AI service, and the deployment sets a strict Content-Security-Policy. It exports an Excel report with the formulas restored and suspect cells highlighted with explanations, ships a command-line version, and is covered by 22 tests, including a fuzz test that recovers 12 random hidden formulas and a check that random data yields no false formulas.",
    features: [
      "RANSAC fitting that survives typos in the data",
      "Recovers lookups, rate tables, running totals and IF rules",
      "Blame solver finds the single most likely mistyped cell",
      "Excel report with formulas restored and suspects highlighted",
      "Runs fully in the browser: no upload, no server, strict CSP",
      "22 tests including a fuzz test, plus a command-line version",
    ],
    techStack: ["JavaScript", "HTML5", "CSS3", "Vercel"],
    category: "web",
    deployedUrl: "https://unbake.vercel.app/",
    image: "/projects/unbake.jpg",
    githubUrl: "https://github.com/anish891/unbake",
  },
  {
    id: "graph-sentinel",
    title: "GraphSentinel AI",
    description:
      "An explainable security investigation agent that traces attacks through a FalkorDB graph of identities, devices, services and incidents, then proposes response actions for human approval.",
    longDescription:
      "GraphSentinel investigates a security alert by traversing the relationships between identities, IPs, devices, services, vulnerabilities, indicators, evidence and past incidents stored in FalkorDB. An LLM agent (Azure OpenAI, Groq, or an offline deterministic planner) chooses which bounded, read-only graph tools to run. Deterministic engines then compute the risk score and decide which simulated response actions are eligible, and a human approves them.\n\nOn the demo dataset it finds a real 5-hop attack chain from the graph, links the alert to two earlier incidents through a shared indicator, collects supporting and contradicting evidence with provenance, and flags and ignores a prompt-injection attempt hidden in a helpdesk ticket. Every finding cites the graph records behind it, completed investigations are written back into the graph so related alerts can recall them, and every step lands in a hash-chained audit trail.\n\nThe backend is FastAPI and the frontend is React and TypeScript with React Flow, run together with Docker Compose. Access is role-based with four-eyes approval, so an investigator cannot approve their own investigation, plus CSRF protection and rate limiting. An evaluation suite runs 14 scenarios against a real FalkorDB (14 of 14 passing, 64 of 64 checks), and CI covers lint, type checks, tests, dependency audits, Trivy and gitleaks. All data is synthetic and all response actions are simulated. The hosted demo is a recorded replay of a real run, served as a static site; the full stack runs locally with Docker.",
    features: [
      "Bounded agent loop over typed, read-only graph tools",
      "Multi-hop attack paths and graph algorithms run inside FalkorDB",
      "Deterministic risk scoring and policy engine, with human approval",
      "Evidence with provenance, contradictions and prompt-injection detection",
      "Hash-chained audit trail and four-eyes approvals",
      "14-scenario evaluation and CI with security scans",
    ],
    techStack: ["Python", "FastAPI", "FalkorDB", "React", "TypeScript", "Docker"],
    category: "ai",
    deployedUrl: "https://graphsentinel-ai.vercel.app/",
    image: "/projects/graphsentinel.jpg",
    githubUrl: "https://github.com/anish891/graph_sentinel",
  },
];

// ─── Social Links ────────────────────────────────────────────────────────────

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/anish891",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/anishtejwani",
    icon: "Linkedin",
  },
  {
    name: "X",
    url: "https://x.com/anish_891",
    icon: "X",
  },
  {
    name: "Email",
    url: "mailto:anishtejwani891@gmail.com",
    icon: "Mail",
  },
];
