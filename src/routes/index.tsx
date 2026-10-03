import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  Code2,
  Database,
  Github,
  Linkedin,
  Menu,
  Moon,
  ServerCog,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { ProjectDetailView } from "@/components/ProjectDetailView";
import { ContactForm } from "@/components/ContactForm";
import { projectsData } from "@/data/projects";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elbahia Boudal — Full-Stack + Data + ML + AI + MLOps" },
      {
        name: "description",
        content:
          "Portfolio of Elbahia Boudal. Full-Stack + Data + ML + AI + MLOps Developer. I build intelligent applications, not just websites.",
      },
      { property: "og:title", content: "Elbahia Boudal — Full-Stack + Data + ML + AI + MLOps" },
      {
        property: "og:description",
        content: "I build intelligent applications, not just websites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["Home", "About", "Skills", "Projects", "Contact"];

const skillGroups = [
  {
    label: "AI / ML & RAG",
    icon: BrainCircuit,
    skills: [
      "Python",
      "Machine Learning",
      "YOLO",
      "OpenCV",
      "NLP",
      "Hugging Face",
      "LangChain",
      "Gemini API",
      "RAG",
      "LLMs",
    ],
  },
  {
    label: "Full-Stack",
    icon: Code2,
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "FastAPI",
      "Express.js",
      "WebSockets",
      "REST APIs",
      "JWT",
      "Tailwind CSS",
    ],
  },
  {
    label: "Data Engineering",
    icon: Database,
    skills: [
      "PySpark",
      "Pandas",
      "NumPy",
      "PostgreSQL",
      "Azure SQL",
      "ChromaDB",
      "Apache Airflow",
      "KMeans",
      "SQL",
    ],
  },
  {
    label: "MLOps & DevOps",
    icon: ServerCog,
    skills: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
      "Evidently AI",
      "MLflow",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
    ],
  },
];

const GITHUB_PROFILE_URL = "https://github.com/ElbahiaBoudal";
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/elbahia-boudal-6228882b5";

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(0);
  const [isLight, setIsLight] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedSkillGroup = skillGroups[activeSkill] ?? skillGroups[0];
  const selectedProject = projectsData.find((p) => p.id === selectedProjectId) ?? null;

  useEffect(() => {
    const light = document.documentElement.classList.contains("light");
    setIsLight(light);
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("eb-theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  };

  // Reveal-on-scroll. Re-runs every time we come back from a project detail view,
  // because the sections are re-created and need to be observed again.
  useEffect(() => {
    if (selectedProjectId) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [selectedProjectId]);

  // Open a project at the top of the page
  useEffect(() => {
    if (selectedProjectId) window.scrollTo({ top: 0 });
  }, [selectedProjectId]);

  const scrollTo = (id: string) => {
    const targetId = id.toLowerCase();
    if (selectedProjectId) {
      setSelectedProjectId(null);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
        if (targetId === "contact") {
          setTimeout(() => document.getElementById("contact-name")?.focus(), 400);
        }
      }, 50);
    } else {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: "smooth" });
      if (targetId === "contact") {
        setTimeout(() => document.getElementById("contact-name")?.focus(), 400);
      }
    }
    setMenuOpen(false);
  };

  if (selectedProject) {
    return (
      <ProjectDetailView
        project={selectedProject}
        onBack={() => {
          setSelectedProjectId(null);
          setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }}
      />
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Navigation Header */}
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          className="nav-glass mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
          aria-label="Primary navigation"
        >
          <button
            className="brand-mark transition-transform hover:scale-105"
            onClick={() => scrollTo("home")}
            aria-label="Go to home"
          >
            EB
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button key={item} className="nav-link" onClick={() => scrollTo(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden sm:inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
            >
              {isLight ? <Moon /> : <Sun />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        {menuOpen && (
          <div className="nav-glass mx-auto mt-2 flex max-w-6xl flex-col p-3 md:hidden">
            {navItems.map((item) => (
              <button
                key={item}
                className="nav-link px-3 py-3 text-left"
                onClick={() => scrollTo(item)}
              >
                {item}
              </button>
            ))}
            <div className="flex items-center gap-4 px-3 py-2 border-t border-border mt-2">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="hero-grid relative flex min-h-[94vh] items-end pb-14 pt-32 lg:items-center lg:pb-0"
      >
        <div className="data-grid absolute inset-0" aria-hidden="true" />
        <div className="neural-field absolute inset-0" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className={`node node-${(i % 8) + 1}`} />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1.25fr_.75fr] lg:px-10">
          <div className="max-w-4xl animate-enter">
            <p className="eyebrow mb-7">
              <Sparkles className="h-3.5 w-3.5" /> FULL-STACK + DATA + ML + AI + MLOps
            </p>
            <h1 className="font-display text-[clamp(4rem,10vw,9.5rem)] leading-[.8]">
              Elbahia
              <br />
              <span className="text-accent">Boudal</span>
            </h1>
            <div className="mt-8 flex flex-col gap-6 border-l border-primary pl-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-wider text-primary">
                  Full-Stack · Data · ML · AI · MLOps
                </p>
                <p className="mt-3 max-w-xl text-lg font-medium leading-relaxed text-muted-foreground">
                  “I build intelligent applications, not just websites.”
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <Button size="lg" onClick={() => scrollTo("projects")}>
                  View projects <ArrowDown />
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollTo("contact")}>
                  Contact me
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden self-end justify-self-end pb-16 lg:block">
            <div className="signal-orbit">
              <span>AI</span>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </section>

      {/* About Section */}
      <section id="about" className="section-shell" data-reveal>
        <SectionHeading
          number="01"
          title="Not just websites."
          kicker="I build intelligent applications, not just websites."
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <p className="max-w-md text-xl leading-relaxed text-muted-foreground">
            I bridge robust software engineering with practical AI and data engineering—turning
            models, pipelines, and interfaces into production-grade systems.
          </p>
          <div className="journey-line">
            {["Full-Stack", "Data Pipelines", "Machine Learning & AI", "MLOps & Deploy"].map(
              (item, i) => (
                <div key={item} className="journey-step">
                  <span>0{i + 1}</span>
                  <strong>{item}</strong>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-shell border-y border-border" data-reveal>
        <SectionHeading
          number="02"
          title="Technology ecosystem"
          kicker="A connected practice: Full-Stack + Data + ML + AI + MLOps."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <button
                  key={group.label}
                  onClick={() => setActiveSkill(index)}
                  className={`skill-tab ${activeSkill === index ? "active" : ""}`}
                >
                  <Icon /> <span>{group.label}</span>
                  <span className="ml-auto font-mono text-xs">0{index + 1}</span>
                </button>
              );
            })}
          </div>
          <div className="ecosystem-panel">
            <div className="ecosystem-core">
              <small>INTELLIGENT CORE</small>
              <strong>ELBAHIA</strong>
            </div>
            <div className="tech-cloud" key={activeSkill}>
              {selectedSkillGroup?.skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`tech-badge${index < 5 ? ` badge-${index + 1}` : ""}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-shell" data-reveal>
        <SectionHeading
          number="03"
          title="Selected work"
          kicker="Minimal, compact showcase. Click any title or arrow to explore details."
        />

        {/* Minimal & Compact 3-Column Project Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((proj) => (
            <article
              key={proj.id}
              className="project-card-compact group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/70 shadow-sm"
              onClick={() => setSelectedProjectId(proj.id)}
            >
              {/* Image Header */}
              <div className="project-visual-compact">
                <img
                  src={proj.image}
                  alt={proj.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                />
              </div>

              {/* Minimal Card Content: Title, Short Intro, GitHub Icon & Details Arrow */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {proj.number}
                    </span>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {/* GitHub Link Icon */}
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${proj.title} on GitHub`}
                        className="rounded-md border border-border/80 bg-background/80 p-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        title="Open GitHub Repository"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Clickable Title */}
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary hover:underline">
                    {proj.title}
                  </h3>

                  {/* Very short introduction (1-2 lines) */}
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm line-clamp-2">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Details Arrow Action Bar */}
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                    View Details
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectId(proj.id);
                    }}
                    className="rounded-full border border-border/80 bg-background p-1.5 text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:translate-x-1 transition-all"
                    aria-label={`Open details for ${proj.title}`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" data-reveal>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <p className="eyebrow">04 · Contact</p>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[.88]">
                Let's build
                <br />
                <span className="text-accent">something smart.</span>
              </h2>
              <div className="mt-8 lg:pb-3">
                <p className="text-lg text-muted-foreground">
                  Open to Full-Stack, Data, ML & MLOps opportunities—and to ambitious projects where
                  code meets intelligence.
                </p>
                <p className="mt-3 font-mono text-sm text-primary">
                  “I build intelligent applications, not just websites.”
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={GITHUB_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background p-3 text-foreground hover:bg-accent hover:border-primary transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={LINKEDIN_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background p-3 text-foreground hover:bg-accent hover:border-primary transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full">
              <ContactForm />
            </div>
          </div>

          <footer className="mt-24 flex flex-col gap-3 border-t border-border pt-6 text-xs uppercase text-muted-foreground sm:flex-row sm:justify-between">
            <span>© 2026 Elbahia Boudal</span>
            <div className="flex items-center gap-4">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  number,
  title,
  kicker,
}: {
  number: string;
  title: string;
  kicker: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-[.28fr_.72fr]">
      <p className="font-mono text-xs text-primary">{number} /</p>
      <div>
        <h2 className="font-display text-5xl sm:text-7xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{kicker}</p>
      </div>
    </div>
  );
}