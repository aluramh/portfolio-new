import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { SkillsSection } from "@/components/sections/skills"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  )
}
