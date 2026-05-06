"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { accentByIndex, accentClasses } from "@/lib/accents"
import type { SkillGroup } from "@/content/parser"

export function SkillsGrid({ skills }: { skills: SkillGroup[] }) {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {skills.map((group, i) => {
        const a = accentClasses(accentByIndex(i))
        return (
          <div key={group.name}>
            <h3
              className={`font-eyebrow text-xs uppercase tracking-[0.15em] font-bold mb-3 ${a.text}`}
            >
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className={`text-xs font-normal ${a.bgMuted} ${a.border} ${a.text}`}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
