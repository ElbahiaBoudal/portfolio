import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { ProjectDetailView } from "@/components/ProjectDetailView";
import { projectsData } from "@/data/projects";

export const Route = createFileRoute("/projects/$id")({
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === id) ?? projectsData[0];

  const handleBack = () => {
    navigate({ to: "/" }).then(() => {
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  };

  return <ProjectDetailView project={project} onBack={handleBack} />;
}
