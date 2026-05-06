"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { accentByIndex, accentClasses } from "@/lib/accents"
import type { Experience } from "@/content/parser"

export function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const ref = useAnimateOnScroll<HTMLDivElement>()
  const a = accentClasses(accentByIndex(index))

  return (
    <div className="relative pl-8 pb-12 last:pb-0 group">
      {/* Timeline line */}
      <div
        className="absolute left-[7px] top-2 bottom-0 w-px group-last:hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        }}
      />

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full bg-emerald" />

      {/* Card */}
      <div
        ref={ref}
        className="animate-on-scroll rounded-lg border border-l-2 border-border/60 border-l-emerald/40 bg-card p-6 transition-all duration-200 hover:border-border hover:shadow-sm hover:-translate-y-0.5"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
          <h3 className="font-display text-lg font-bold">{experience.company}</h3>
          <span className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {experience.period}
          </span>
        </div>

        <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">
          {experience.role} · {experience.location}
        </p>

        <ul className="mt-4 space-y-2">
          {experience.highlights.map((h, i) => (
            <li
              key={i}
              className="text-sm text-muted-foreground leading-relaxed flex gap-2"
            >
              <span className="text-emerald mt-1 shrink-0">•</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {experience.tech.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className={`text-xs font-normal ${a.bgMuted} ${a.border} ${a.text}`}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
