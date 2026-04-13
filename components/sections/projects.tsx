import { profile } from "@/content/parser"
import { ProjectCard } from "./project-card"

export function ProjectsSection() {
  const featuredProject = profile.projects.find((p) => p.featured)
  const otherProjects = profile.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Projects</h2>
        <p className="text-muted-foreground mb-12">
          A selection of things I&apos;ve built.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProject && (
            <ProjectCard project={featuredProject} featured={true} index={0} />
          )}
          {otherProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={false}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
