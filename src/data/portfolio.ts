// Profile, resume and project destinations are centralized here for easy replacement.
export const profile = {
  name: "Anurag Kumar Srivastava",
  location: "Bhubaneswar, Odisha, India",
  role: "Python & GenAI Developer",
  github: "https://github.com/IntelliCoder-AI",
  linkedin: "https://www.linkedin.com/in/anurag-kumar-srivastava/?isSelfProfile=true",
  email: "anuragsrivastava3344@gmail.com",
  resume: "/anurag-kumar-srivastava-python-data-engineer-resume-v2.pdf",
};

export const navigation = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certifications",
  "Contact",
];
export const skills = [
  { title: "Programming", icon: "code", items: ["Python", "SQL"] },
  {
    title: "Backend",
    icon: "server",
    items: ["FastAPI", "Flask", "REST APIs"],
  },
  {
    title: "AI / GenAI",
    icon: "brain",
    items: [
      "LLMs",
      "RAG",
      "LangChain",
      "LangGraph",
      "AI Agents",
      "Embeddings",
      "Vector Databases",
    ],
  },
  {
    title: "Data",
    icon: "database",
    items: ["Pandas", "NumPy", "PostgreSQL", "MySQL", "Data Engineering"],
  },
  {
    title: "Cloud / DevOps",
    icon: "cloud",
    items: ["AWS", "Docker", "Terraform", "Git", "GitHub Actions", "CI/CD"],
  },
];
export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  problem: string;
  solution: string;
  features: string[];
  architecture: string[];
  demoLinks?: boolean;
  github: string;
  demo: string;
  building?: boolean;
};
export const projects: Project[] = [
  {
    id: "crime-analytics",
    name: "Chicago Crime Analytics Platform",
    category: "BACKEND / DATA ANALYTICS",
    description:
      "A full-stack Flask platform for exploring Chicago crime data through analytical dashboards, visualizations, CRUD operations and REST APIs.",
    technologies: [
      "Python",
      "Flask",
      "SQLite",
      "REST API",
      "Pandas",
      "Matplotlib",
      "Render",
    ],
    problem:
      "Large public crime datasets need an accessible way to explore patterns, generate analytical summaries and manage individual records.",
    solution:
      "The application combines a Flask backend, SQLite storage, analytical Python workflows and a responsive dashboard for data exploration and record management.",
    features: [
      "Interactive analytics dashboards and charts",
      "Complete crime-record CRUD workflow",
      "REST endpoints for records and analytical data",
    ],
    architecture: [
      "Chicago crime data",
      "Pandas processing",
      "SQLite database",
      "Flask REST API",
      "Dashboard + visualizations",
    ],
    github: "https://github.com/IntelliCoder-AI/chicago-crime-analytics-platform",
    demo: "https://chicago-crime-analytics.onrender.com/",
  },
  {
    id: "code-review",
    name: "GitHub Code Review Agent",
    category: "AI AGENTS / DEVELOPER TOOLS",
    building: true,
    description:
      "An AI-powered code review agent that analyzes GitHub pull requests, identifies potential bugs, code smells and security concerns, and provides actionable review suggestions.",
    technologies: [
      "Python",
      "LangGraph",
      "LLMs",
      "GitHub API",
      "FastAPI",
      "Docker",
      "Render",
    ],
    problem:
      "Reviewing pull requests takes time, and subtle bugs or security concerns can be easy to miss.",
    solution:
      "The planned workflow retrieves a pull-request diff through the GitHub API, coordinates analysis with LangGraph, and turns LLM findings into actionable review suggestions. The project is currently being built.",
    features: [
      "Pull-request diff analysis",
      "Bug, code-smell and security checks",
      "Actionable review suggestions",
    ],
    architecture: [
      "Pull request",
      "GitHub API",
      "FastAPI",
      "LangGraph + LLM",
      "Review suggestions",
    ],
    github: profile.github + "?tab=repositories",
    demo: "https://example.com/",
    demoLinks: true,
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    category: "BACKEND / TASK MANAGEMENT",
    description:
      "A full-stack task management application for creating, updating, searching, filtering and organizing work through a responsive dashboard.",
    technologies: [
      "Python",
      "Flask",
      "SQLite",
      "REST API",
      "JavaScript",
      "Gunicorn",
      "Render",
    ],
    problem:
      "Personal tasks become difficult to track when status, search, sorting and updates are spread across disconnected tools.",
    solution:
      "TaskFlow pairs a Flask REST API and SQLite database with a responsive JavaScript interface for one coherent task workflow.",
    features: [
      "Create, view, update and delete tasks",
      "Search, filter, sort and status management",
      "Overview dashboard, validation and toast feedback",
    ],
    architecture: [
      "Responsive web interface",
      "Flask routes",
      "REST API",
      "SQLite database",
      "Task dashboard",
    ],
    github: "https://github.com/IntelliCoder-AI/fullstack-task-manager-taskflow",
    demo: "https://taskflow-task-manager-oim4.onrender.com/",
  },
  {
    id: "travel-planner",
    name: "Multi-Agent Travel Planner",
    category: "AI AGENTS / ORCHESTRATION",
    description:
      "A multi-agent travel planning system that coordinates specialized agents to create intelligent travel plans using external APIs and structured workflows.",
    technologies: [
      "Python",
      "LangGraph",
      "LLMs",
      "PostgreSQL",
      "APIs",
      "Agents",
    ],
    problem:
      "Travel planning requires gathering information from different sources and reconciling it into a usable itinerary.",
    solution:
      "Specialized agents coordinate through structured LangGraph workflows, drawing on external APIs to create a coherent travel plan.",
    features: [
      "Specialized planning agents",
      "External API integration",
      "Structured planning workflows",
    ],
    architecture: [
      "Travel request",
      "LangGraph",
      "Specialized agents",
      "APIs + PostgreSQL",
      "Travel plan",
    ],
    github: profile.github + "?tab=repositories",
    demo: "https://example.com/",
    demoLinks: true,
  },
  {
    id: "rag",
    name: "ContextIQ RAG Application",
    category: "GENAI / KNOWLEDGE RETRIEVAL",
    description:
      "An intelligent question-answering system that retrieves relevant information from a knowledge base before generating responses with an LLM.",
    technologies: [
      "Python",
      "LangChain",
      "Embeddings",
      "Vector Database",
      "RAG",
      "LLM",
    ],
    problem:
      "General-purpose language models need relevant knowledge-base context to answer domain-specific questions.",
    solution:
      "The retrieval workflow embeds a question, finds relevant knowledge-base content in a vector database, and supplies that context to an LLM before generating a response.",
    features: [
      "Knowledge-base retrieval",
      "Embedding-based search",
      "Context-grounded generation",
    ],
    architecture: [
      "Question",
      "Embeddings",
      "Vector retrieval",
      "Context + LLM",
      "Answer",
    ],
    github: "https://github.com/IntelliCoder-AI/ContextIQ-intelligent-answers-based-on-your-context-RAG-",
    demo: "https://contextiq-rag-demo.anuragsrivastava3344.chatgpt.site",
  },
];
export const education = [
  { degree: "Master of Computer Applications", short: "MCA", year: "2026" },
  { degree: "Bachelor of Computer Applications", short: "BCA", year: "2024" },
];
export const certifications = [
  { name: "AWS Cloud Practitioner Essentials", issuer: "AWS", url: "" },
];
