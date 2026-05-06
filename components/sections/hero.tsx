import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Portrait } from "@/components/portrait"
import { profile } from "@/content/parser"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-3xl hero-stagger flex flex-col items-center">
        <Portrait size={120} className="mb-6" />

        <p className="font-eyebrow text-xs uppercase tracking-[0.2em] text-emerald mb-4">
          Senior · Software Engineer
        </p>

        <h1 className="font-display font-extrabold tracking-tight text-5xl md:text-7xl mb-3 leading-[0.95]">
          Alejandro{" "}
          <span className="text-sheen italic font-normal">Ramirez</span>
        </h1>

        <p className="font-eyebrow text-sm uppercase tracking-[0.15em] text-muted-foreground mb-8">
          {profile.years}+ Years · Atlassian · {profile.location}
        </p>

        {profile.summary && (
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {profile.summary}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-emerald hover:bg-emerald/90 text-emerald-foreground rounded-full px-8"
          >
            <a href="#selected-work">
              View Work
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
    </section>
  )
}
