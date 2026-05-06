import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portrait } from "@/components/portrait"
import { profile } from "@/content/parser"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-6"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Text — left on desktop */}
        <div className="hero-stagger flex flex-col items-center md:items-start text-center md:text-left flex-1">
          <p className="font-eyebrow text-xs uppercase tracking-[0.2em] text-emerald mb-4">
            Senior · Software Engineer
          </p>

          <h1 className="font-display font-extrabold tracking-tight text-5xl md:text-6xl lg:text-7xl mb-3 leading-[0.95]">
            Alejandro{" "}
            <span className="text-sheen italic font-normal">Ramirez</span>
          </h1>

          <p className="font-eyebrow text-sm uppercase tracking-[0.15em] text-muted-foreground mb-8">
            {profile.years}+ Years · Atlassian · {profile.location}
          </p>

          {profile.summary && (
            <p className="text-lg text-muted-foreground mb-12 max-w-xl leading-relaxed">
              {profile.summary}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-emerald hover:bg-emerald/90 text-emerald-foreground rounded-full px-8"
            >
              <a href="#experience">
                View Experience
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>

        {/* Portrait — right on desktop, top on mobile */}
        <Portrait size={200} className="md:order-2 shrink-0" />
      </div>
    </section>
  )
}
