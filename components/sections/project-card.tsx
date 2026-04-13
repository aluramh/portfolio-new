"use client"

import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import type { Project } from "@/content/parser"

export function ProjectCard({
  project,
  featured,
  index,
}: {
  project: Project
  featured: boolean
  index: number
}) {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll rounded-lg border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-sm ${
        featured ? "col-span-full" : ""
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h3 className={`font-semibold ${featured ? "text-xl" : "text-lg"} mb-2`}>
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {featured && project.longDescription
              ? project.longDescription
              : project.description}
          </p>
        </div>

        {featured && project.highlights.length > 0 && (
          <ul className="space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-emerald mt-0.5 shrink-0">•</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">
              {t}
            </Badge>
          ))}
        </div>

        {project.links && (
          <div className="flex gap-2 mt-1">
            {project.links.github && (
              <Button asChild variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
              </Button>
            )}
            {project.links.live && (
              <Button asChild variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
