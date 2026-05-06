import { Navbar } from "@/components/layout/navbar"
import { HeroSection } from "@/components/sections/hero"
import { SelectedWorkSection } from "@/components/sections/selected-work"
import { ExperienceSection } from "@/components/sections/experience"
import { SkillsSection } from "@/components/sections/skills"
import { EducationSection } from "@/components/sections/education"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SelectedWorkSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
      </main>
      <Footer />
    </>
  )
}
