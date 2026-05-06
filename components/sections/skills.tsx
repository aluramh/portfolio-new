import { profile } from "@/content/parser"
import { SkillsGrid } from "./skills-grid"

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Skills
        </h2>
        <p className="text-muted-foreground mb-12">
          Technologies I work with regularly.
        </p>

        <SkillsGrid skills={profile.skills} />
      </div>
    </section>
  )
}
