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
    name: "Databases & Cloud",
    icon: "Database",
    skills: [
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Firebase" },
    ],
  },
  {
    name: "Deployment & Infra",
    icon: "Server",
    skills: [
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
    name: "Mobile",
    icon: "Smartphone",
    skills: [{ name: "Flutter" }],
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
    id: "nifty-oi-tracker",
    title: "NIFTY OI Tracker",
    description:
      "A real-time analytics dashboard for NIFTY 50 computing Open Interest buildup, Max Pain, Gamma Exposure, and volatility regimes directly from live NSE data.",
    longDescription:
      "Nifty OI Tracker is a real-time analytics dashboard built for options traders to monitor NIFTY 50 derivatives data — Open Interest buildup, Put-Call Ratio, Max Pain, Central Pivot Range, and Gamma Exposure — sourced live from the NSE.\n\nBeyond surfacing raw data, the project focuses on turning it into statistically grounded signals: buildup classification uses a sliding-window trend analysis instead of single-tick comparisons to cut noise, Max Pain was rearchitected from a brute-force O(n²) calculation to a prefix-sum-based O(n log n) approach, and OI anomalies and IV volatility regimes are both detected using Welford\u0027s online algorithm for numerically stable, constant-time running statistics — the same statistical core reused across two different features.\n\nThe system persists every session to Postgres (Supabase), enabling day-over-day pattern matching (cosine similarity across session feature vectors) to surface historically similar trading days, and a 20-session rolling z-score to flag when current implied volatility is running unusually high or low relative to its own recent history.\n\nDeployed entirely on free-tier infrastructure (Vercel + Supabase), with a lightweight Express proxy layer handling NSE\u0027s CORS/cookie requirements and Supabase Realtime and pg_cron used to work around serverless platform constraints (no long-lived connections, limited cron frequency) without adding paid infrastructure.",
    features: [
      "Live NSE Derivatives Data & Express Proxy",
      "O(n log n) Max Pain & Gamma Exposure Calculation",
      "Welford\u0027s Online Algorithm for Anomaly & IV Detection",
      "Cosine Similarity Historical Session Matching",
      "Supabase Realtime & pg_cron Serverless Architecture",
    ],
    techStack: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "Supabase",
      "Vercel",
    ],
    category: "web",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: "TrendingUp",
    deployedUrl: "https://nifty-oi-tracker.vercel.app/",
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
