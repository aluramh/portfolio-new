"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import type { Experience } from "@/content/parser"

export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <div className="relative pl-8 pb-12 last:pb-0 group">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border group-last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-emerald bg-background" />

      {/* Card */}
      <div
        ref={ref}
        className="animate-on-scroll rounded-lg border border-border/60 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-sm"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h3 className="font-semibold text-lg">{experience.company}</h3>
          <span className="text-sm text-muted-foreground">{experience.period}</span>
        </div>

        <p className="text-muted-foreground mb-1">
          {experience.role} · {experience.location}
        </p>

        <ul className="mt-4 space-y-2">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-emerald mt-1 shrink-0">•</span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {experience.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs font-normal">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
