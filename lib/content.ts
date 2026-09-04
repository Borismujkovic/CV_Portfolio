/**
 * Single source of truth for every piece of copy on the site.
 * Sourced from the CV — edit here, the whole page follows.
 */

export const profile = {
  name: "Boris Mujkovic",
  firstName: "Boris",
  lastName: "Mujkovic",
  role: "Full-Stack Software Developer",
  stackLine: "React · Next.js · Node.js",
  location: "Pančevo, Serbia",
  timezone: "CET / UTC+1",
  email: "borismujkovic@gmail.com",
  phone: "+381 63 393 070",
  phoneHref: "+38163393070",
  available: true,
  availabilityNote: "Open to select full-stack engagements",
  tagline: [
    "I build production web platforms",
    "that hold up under real traffic.",
  ],
  intro:
    "Full-stack developer working end-to-end across the React/Next.js and Node.js ecosystem — from interface design through API integration and production support.",
} as const;

export const socials = [
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "/in/boris-mujkovic" },
  { label: "GitHub", href: "https://github.com/", handle: "/borismujkovic" },
] as const;

export const stats = [
  { value: "3", suffix: "+", label: "Years in production" },
  { value: "95", suffix: "%", label: "Client retention" },
  { value: "20", suffix: "+", label: "Technologies in rotation" },
  { value: "3", suffix: "", label: "Platforms, brief to release" },
] as const;

export const about = {
  paragraphs: [
    "I'm a full-stack developer building responsive, scalable web applications across the React/Next.js and Node.js ecosystem. Most of my work lives inside microservices architectures, where a feature is never just a screen — it's an interface, an API contract, a data model, and the production support that follows.",
    "I design and integrate REST and GraphQL APIs, work across PostgreSQL and MySQL, and hold a high bar for clean, maintainable, well-tested code. The part I care most about is ownership: taking a feature from the first wireframe through to the incident channel, and being the person who actually knows how it behaves.",
    "I'm also an early adopter of AI-assisted development. Claude, Copilot, Codex and Cursor are part of my daily loop for generation, refactoring, debugging and documentation — used deliberately, with every generated line reviewed and validated before it ships. It accelerates delivery; it doesn't lower the bar.",
  ],
  facts: [
    { k: "Based in", v: "Pančevo, Serbia" },
    { k: "Education", v: "Specialist Degree, Computer Technologies" },
    { k: "Institution", v: "Belgrade Institute of Technology (BIT)" },
    { k: "Languages", v: "Serbian (Native) · English (B2)" },
    { k: "Focus", v: "Front-end architecture · API integration" },
    { k: "Working style", v: "End-to-end feature ownership" },
  ],
} as const;

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  period: string;
  current: boolean;
  summary: string;
  points: string[];
  stack: string[];
};

export const journey: Role[] = [
  {
    company: "DataArt Solutions, Inc.",
    title: "Software Developer",
    start: "2023",
    end: "Present",
    period: "April 2023 — Present",
    current: true,
    summary:
      "Building production-grade web applications and owning features end-to-end inside a microservices environment.",
    points: [
      "Build and maintain responsive, production-grade web applications using React, Next.js and TypeScript — delivering reusable components and a scalable front-end architecture, with a 95% customer retention rate on delivered work.",
      "Design and integrate REST and GraphQL APIs connecting front-end applications to backend services and third-party systems.",
      "Work across PostgreSQL and MySQL to support application data needs and maintain data integrity.",
      "Apply AI-assisted development tooling (Claude, GitHub Copilot) to accelerate code generation, refactoring, debugging and documentation.",
    ],
    stack: ["React", "Next.js", "TypeScript", "GraphQL", "REST", "PostgreSQL", "MySQL"],
  },
  {
    company: "Crypto Forests",
    title: "JavaScript Developer",
    start: "2022",
    end: "2023",
    period: "December 2022 — April 2023",
    current: false,
    summary:
      "Front-end engineering for a cryptocurrency information platform serving real-time market data.",
    points: [
      "Developed front-end features for a cryptocurrency information platform delivering real-time market data and historical trends.",
      "Collaborated on API integration and data handling to support accurate, real-time cryptocurrency analytics.",
    ],
    stack: ["JavaScript", "React", "REST", "Real-time data"],
  },
  {
    company: "Belgrade Institute of Technology",
    title: "Specialist Degree — Computer Technologies",
    start: "—",
    end: "2022",
    period: "Belgrade, Serbia",
    current: false,
    summary:
      "Formal grounding in computer technologies, software engineering fundamentals and systems design.",
    points: [
      "Specialist Degree in Computer Technologies — the foundation the rest of the work is built on.",
    ],
    stack: ["Computer Science", "Software Engineering"],
  },
];

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  points: string[];
  stack: string[];
  status: "shipped" | "internal";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Betting Platform",
    category: "Fintech · Real-time",
    year: "2023—25",
    blurb:
      "A dynamic, high-traffic betting platform where latency and payment integrity are the product.",
    points: [
      "Developed and maintained a responsive betting platform, improving existing features and optimising application performance.",
      "Integrated the Monri and AllSecure payment libraries for secure, seamless transactions.",
      "Delivered real-time updates, user authentication and an intuitive UI built around a smooth user experience.",
    ],
    stack: ["React", "Next.js", "TypeScript", "GraphQL", "REST API"],
    status: "shipped",
  },
  {
    index: "02",
    title: "Crypto Market Data Platform",
    category: "Data · Analytics",
    year: "2023",
    blurb:
      "Real-time market data and historical trend analysis for a cryptocurrency information product.",
    points: [
      "Developed front-end features delivering real-time market data and historical trends.",
      "Collaborated on API integration and data handling to support accurate, real-time analytics.",
    ],
    stack: ["React", "GraphQL", "PostgreSQL", "Docker"],
    status: "shipped",
  },
  {
    index: "03",
    title: "Mentorship & Recruitment Platform",
    category: "Internal Tooling",
    year: "2026—",
    blurb:
      "An internal platform managing the full lifecycle of a mentorship programme — screening to staffing.",
    points: [
      "Built and maintained a React/TypeScript platform covering candidate screening, contributor management and project staffing.",
      "Used Claude as an AI-assisted development tool for generation, refactoring, debugging and exploring implementation approaches — reviewing and validating every generated solution.",
    ],
    stack: ["React", "Redux Toolkit", "Next.js", "TypeScript", "Vite", "AntDesign"],
    status: "internal",
  },
];

export const stackGroups = [
  {
    label: "Core",
    note: "The daily surface — typed end to end.",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js"],
  },
  {
    label: "Data & APIs",
    note: "Contracts between services, and the stores behind them.",
    items: ["REST APIs", "GraphQL", "PostgreSQL", "MySQL", "Swagger"],
  },
  {
    label: "Interface",
    note: "Design systems, state and the layer users actually touch.",
    items: ["Tailwind CSS", "AntDesign", "Redux Toolkit", "Vite", "Figma"],
  },
  {
    label: "Delivery",
    note: "Getting it built, tested and out the door repeatably.",
    items: ["Docker", "Jenkins", "Git", "Jest", "E2E Testing"],
  },
  {
    label: "AI-assisted",
    note: "Accelerators, always behind a human review gate.",
    items: ["Claude", "GitHub Copilot", "Codex", "Cursor"],
  },
] as const;

export const marqueeItems = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "GraphQL",
  "REST APIs",
  "PostgreSQL",
  "Redux Toolkit",
  "Tailwind CSS",
  "Docker",
  "Jenkins",
  "Jest",
  "E2E Testing",
  "Figma",
  "Claude",
] as const;

export const nav = [
  { id: "about", label: "About", index: "01" },
  { id: "stack", label: "Stack", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "journey", label: "Journey", index: "04" },
  { id: "twin", label: "Ask AI", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;
