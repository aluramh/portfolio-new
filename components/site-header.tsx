"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/profile"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="font-semibold tracking-tight">
          {profile.name}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild className="ml-2 bg-emerald-600 hover:bg-emerald-600/90">
            <Link href="#contact">Get in touch</Link>
          </Button>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <div className={cn("md:hidden border-t", open ? "block" : "hidden")}>
        <div className="container max-w-6xl px-4 py-3 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2">
            <ThemeToggle />
            <Button asChild className="bg-emerald-600 hover:bg-emerald-600/90">
              <Link href="#contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
