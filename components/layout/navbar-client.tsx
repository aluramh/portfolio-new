"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

export function NavbarClient({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-14">
        <a
          href="#"
          className="font-display italic text-base tracking-tight hover:text-emerald transition-colors"
        >
          {name}
        </a>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1)
            return (
              <a
                key={href}
                href={href}
                className={`font-eyebrow text-xs uppercase tracking-[0.15em] transition-colors ${
                  active === id
                    ? "text-emerald"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="font-eyebrow text-xs uppercase tracking-[0.15em] gap-1.5"
          >
            <a href="/resume.pdf" download>
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
