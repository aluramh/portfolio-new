import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/parser"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40">
      {/* Contact CTA */}
      <div className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-eyebrow text-xs uppercase tracking-[0.2em] text-emerald mb-6">
            Get in touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Let&apos;s work together.
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Open to new opportunities, collaborations, and interesting problems.
          </p>
          <a
            href={`mailto:${profile.links.email}`}
            className="font-display italic text-2xl md:text-3xl text-emerald hover:opacity-70 transition-opacity"
          >
            {profile.links.email}
          </a>

          <div className="flex items-center justify-center gap-2 mt-10">
            {profile.links.github && (
              <Button asChild variant="ghost" size="icon" className="h-9 w-9 hover:text-emerald">
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            <Button asChild variant="ghost" size="icon" className="h-9 w-9 hover:text-emerald">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-9 w-9 hover:text-emerald">
              <a href={`mailto:${profile.links.email}`} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40 py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-display italic text-sm">{profile.name}</span>
          <span className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} · designed &amp; developed by Alex Ramírez
          </span>
        </div>
      </div>
    </footer>
  )
}
