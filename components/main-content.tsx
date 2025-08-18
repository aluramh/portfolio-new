"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/sections/hero"
import AboutSection from "@/components/sections/about"
import ExperienceSection from "@/components/sections/experience"
import ProjectsSection from "@/components/sections/projects"
import SkillsSection from "@/components/sections/skills"
import ContactSection from "@/components/sections/contact"

export default function MainContent() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <HeroSection />
        <div className="space-y-24 px-8 pb-24">
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </div>
    </main>
  )
}
