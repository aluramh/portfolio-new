import { profile } from "@/content/parser"

export function EducationSection() {
  if (profile.education.length === 0) return null

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl font-extrabold tracking-tight mb-10">
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.education.map((e) => (
            <article
              key={e.school}
              className="rounded-lg border border-border/60 bg-card p-6"
            >
              {e.shortName && (
                <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-emerald mb-2">
                  {e.shortName}
                </p>
              )}
              <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                {e.school}
              </h3>
              <p className="text-sm">{e.degree}</p>
              <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground mt-2">
                {e.year} · {e.location}
              </p>
              {e.note && (
                <p className="text-xs italic text-muted-foreground mt-3">
                  {e.note}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
