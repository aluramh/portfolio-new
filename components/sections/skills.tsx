"use client"

import { Badge } from "@/components/ui/badge"
import { profile } from "@/content/parser"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

export function SkillsSection() {
  const ref = useAnimateOnScroll<HTMLDivElement>()

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Skills</h2>
        <p className="text-muted-foreground mb-12">
          Technologies I work with regularly.
        </p>

        <div
          ref={ref}
          className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {profile.skills.map((group) => (
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
      </div>
    </section>
  )
}
