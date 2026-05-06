import { profile } from "@/content/parser"
import { ExperienceCard } from "./experience-card"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
          Experience
        </h2>

        <div className="relative">
          {profile.experience.map((exp, i) => (
            <ExperienceCard key={`${exp.company}-${exp.role}`} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
