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
  tagline: "AI Engineer • Full-Stack Developer • Builder",
  typingStrings: [
    "AI Engineer",
    "Full-Stack Developer",
    "System Designer",
    "Problem Solver",
  ],
  intro:
    "I build intelligent software systems, AI-powered applications, and scalable web platforms. Passionate about solving complex problems through automation, modern engineering practices, and elegant user experiences.",
  location: "Mumbai, India",
  email: "anishtejwani891@gmail.com",
  specialty: "AI + Full-Stack",
};

// ─── About ───────────────────────────────────────────────────────────────────

export const aboutContent = {
  bio: "Computer Engineer with experience building AI-powered applications, full-stack platforms, automation systems, and real-time solutions. Experienced in modern web technologies, cloud-based AI services, and scalable software architecture.",
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
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind" },
    ],
  },
  {
    name: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "REST APIs" },
    ],
  },
  {
    name: "AI & ML",
    icon: "Brain",
    skills: [
      { name: "LangChain" },
      { name: "AI Agents" },
      { name: "Prompt Engineering" },
      { name: "LLM Integrations" },
    ],
  },
  {
    name: "Mobile",
    icon: "Smartphone",
    skills: [{ name: "Flutter" }],
  },
  {
    name: "Databases",
    icon: "Database",
    skills: [{ name: "SQL" }, { name: "Firebase" }],
  },
  {
    name: "Engineering",
    icon: "GitBranch",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "CI/CD" },
      { name: "Agile" },
      { name: "Scrum" },
    ],
  },
];



// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "ai-trading",
    title: "AI Trading System",
    description:
      "Real-time trading engine powered by deep learning models for market signal generation and automated execution.",
    longDescription:
      "A sophisticated real-time trading engine that leverages deep learning models to generate market signals and execute trades automatically. The system processes live market data, applies ML-driven predictions, and executes trades with low latency. Built with scalable architecture to handle high-frequency data streams.",
    features: [
      "Real-time processing",
      "Low latency execution",
      "ML-driven predictions",
      "Scalable architecture",
    ],
    techStack: ["Python", "TensorFlow", "WebSocket", "Redis", "Docker"],
    category: "ai",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: "TrendingUp",
  },
  {
    id: "image-analysis",
    title: "Image Analysis Platform",
    description:
      "Python-based image intelligence platform utilizing computer vision and OCR for extracting insights from images.",
    longDescription:
      "An intelligent image analysis platform that combines computer vision and OCR capabilities to extract meaningful insights from images. The platform supports multiple image formats, provides automated text extraction, and generates analytical reports from visual data.",
    features: ["OCR", "Image Processing", "Data Extraction", "Analytics"],
    techStack: ["Python", "OpenCV", "Tesseract", "Flask", "NumPy"],
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
    techStack: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
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


