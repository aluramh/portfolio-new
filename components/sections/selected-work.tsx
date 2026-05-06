import { profile } from "@/content/parser"
import { SelectedWorkCard } from "./selected-work-card"

export function SelectedWorkSection() {
  if (profile.selectedWork.length === 0) return null

  return (
    <section id="selected-work" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-emerald mb-3">// selected work</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
          Selected Work
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {profile.selectedWork.map((work) => (
            <SelectedWorkCard
              key={`${work.company}-${work.title}`}
              work={work}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
