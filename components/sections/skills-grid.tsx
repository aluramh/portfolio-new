"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import type { SkillGroup } from "@/content/parser"

export function SkillsGrid({ skills }: { skills: SkillGroup[] }) {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {skills.map((group) => (
        <div key={group.name}>
          <h3 className="text-sm font-semibold mb-3">{group.name}</h3>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="text-xs font-normal"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
