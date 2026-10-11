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
  gradient: string;
  icon: string;
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
  { label: "Home", href: "#home" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ─── Site ────────────────────────────────────────────────────────────────────

export const siteConfig = {
  url: "https://anishtejwani.dev",
  githubUsername: "anish891",
  githubUrl: "https://github.com/anish891",
  linkedinUrl: "https://linkedin.com/in/anishtejwani",
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
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: "TrendingUp",
    deployedUrl: "https://chaindeck.vercel.app/",
    image: "/projects/chaindeck.jpg",
    githubUrl: "https://github.com/anish891/chaindeck",
  },
  {
    id: "image-analysis",
    title: "Image Analysis Platform",
    description:
      "Python-based image intelligence platform utilizing computer vision and OCR for extracting insights from images.",
    longDescription:
      "An intelligent image analysis platform that combines computer vision and OCR capabilities to extract meaningful insights from images. The platform supports multiple image formats, provides automated text extraction, and generates analytical reports from visual data.",
    features: ["OCR", "Image Processing", "Data Extraction", "Analytics"],
    techStack: ["Python", "OpenCV", "Tesseract", "Flask"],
    category: "ai",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: "ScanEye",
    githubUrl: "https://github.com/anish891",
  },
  {
    id: "notes-app",
    title: "Notes Application",
    description:
      "Cross-platform note-taking application built with Flutter and Firebase.",
    longDescription:
      "A feature-rich cross-platform note-taking application built with Flutter for the frontend and Firebase for the backend. Supports real-time cloud synchronization, secure authentication, and a mobile-first user experience designed for productivity on the go.",
    features: [
      "Cloud Sync",
      "Authentication",
      "Real-time Updates",
      "Mobile-first UX",
    ],
    techStack: ["Flutter", "Dart", "Firebase"],
    category: "mobile",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: "FileText",
    githubUrl: "https://github.com/anish891",
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
    name: "Email",
    url: "mailto:anishtejwani891@gmail.com",
    icon: "Mail",
  },
];
