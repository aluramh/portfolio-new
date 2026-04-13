"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function NavbarClient({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
          className="text-sm font-semibold tracking-tight hover:text-emerald transition-colors"
        >
          {name}
        </a>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs font-medium gap-1.5"
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
