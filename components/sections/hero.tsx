import { ArrowRight, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { profile } from "@/content/parser"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-3xl hero-stagger">
        <Badge
          variant="outline"
          className="mb-6 px-4 py-1.5 text-sm border-emerald/30 bg-emerald-muted text-emerald"
        >
          <Calendar className="h-3 w-3 mr-1.5" />
          {profile.years}+ years experience
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          {profile.name}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-3">
          {profile.title}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-8">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{profile.location}</span>
        </div>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {profile.summary}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-emerald hover:bg-emerald/90 text-emerald-foreground rounded-full px-8"
          >
            <a href="#projects">
              View Projects
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
