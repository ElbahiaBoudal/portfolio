import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Layers3,
  Sparkles,
  Terminal,
} from "lucide-react";

import { type ProjectItem } from "@/data/projects";
import { Button } from "@/components/ui/button";

interface ProjectDetailViewProps {
  project: ProjectItem;
  onBack: () => void;
}

export function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  return (
    <article className="min-h-screen bg-background text-foreground pb-24 pt-28 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Navigation bar actions */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="group gap-2 border-border/80 hover:border-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-primary" />
            <span>Back to Projects</span>
          </Button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-mono font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="h-4 w-4 text-primary" />
            <span>GitHub Repository</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>

        {/* Hero Visual & Badges */}
        <div className="mt-8 relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.alt}
              className="h-full w-full object-cover filter saturate-[0.88] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            <div className="absolute top-4 left-4 z-10 rounded-md border border-dusty-pink/80 bg-background/85 backdrop-blur-md px-3 py-1.5 text-xs font-mono font-medium uppercase tracking-wider text-dusty-pink shadow-lg">
              {project.visualBadge}
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="eyebrow text-xs">
                  <Sparkles className="h-3.5 w-3.5" /> {project.conceptBadge}
                </span>
                <h1 className="mt-2 font-display text-4xl sm:text-6xl font-medium tracking-tight text-foreground">
                  {project.title}
                </h1>
              </div>
              <span className="font-mono text-xl font-bold text-primary opacity-80">
                {project.number} / 05
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-lg sm:text-xl font-medium text-muted-foreground leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Details Content Grid */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_0.9fr]">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Overview & Objective */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="font-mono text-sm text-primary">01 /</span> Problem & Objective
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {project.problemObjective}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="font-mono text-sm text-primary">02 /</span> System Overview
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </section>

            {/* Architecture Pipeline */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="font-mono text-sm text-primary">03 /</span> Architecture & Workflow
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl border border-border bg-card/60 p-4">
                {project.pipeline.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-lg border border-border/80 bg-background/60 p-3 text-xs font-mono text-foreground shadow-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{node.label}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Main Features */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="font-mono text-sm text-primary">04 /</span> Key Features
              </h2>
              <ul className="space-y-3">
                {project.mainFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span className="leading-normal">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Technical Highlights */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
                <span className="font-mono text-sm text-primary">05 /</span> Technical Highlights
              </h2>
              <div className="space-y-3">
                {project.technicalDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 p-3.5 text-xs font-mono text-muted-foreground"
                  >
                    <Terminal className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold flex items-center gap-2">
                <Code2 className="h-4 w-4" /> Technologies Used
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border/80 bg-background px-2.5 py-1 text-xs font-mono text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links & Repository Action */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-semibold flex items-center gap-2">
                <Github className="h-4 w-4" /> Source Code & Repo
              </h3>
              <p className="text-xs text-muted-foreground">
                View full source code, scripts, configurations, and documentation on GitHub.
              </p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary px-4 py-2.5 text-xs font-mono font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
              >
                <Github className="h-4 w-4" />
                <span>Open Repository</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Back Action */}
            <div className="pt-2">
              <Button
                variant="outline"
                onClick={onBack}
                className="w-full gap-2 border-border text-xs font-mono"
              >
                <ArrowLeft className="h-4 w-4" /> Back to All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
