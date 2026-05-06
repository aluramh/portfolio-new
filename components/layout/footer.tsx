import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/parser"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40 py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display italic text-sm">{profile.name}</span>

        <div className="flex items-center gap-1">
          {profile.links.github && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-emerald"
            >
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-emerald"
          >
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-emerald"
          >
            <a href={`mailto:${profile.links.email}`} aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
