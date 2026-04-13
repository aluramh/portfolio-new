import { readFileSync } from "fs"
import { join } from "path"
import { parse } from "yaml"

export interface ProfileLink {
  github: string
  linkedin: string
  email: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  logo?: string
  highlights: string[]
  tech: string[]
}

export interface ProjectLinks {
  github?: string
  live?: string
}

export interface Project {
  title: string
  description: string
  longDescription?: string
  featured?: boolean
  image?: string
  highlights: string[]
  tech: string[]
  links?: ProjectLinks
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Meta {
  siteTitle: string
  description: string
  ogImage?: string
}

export interface Profile {
  meta: Meta
  name: string
  title: string
  years: number
  location: string
  summary: string
  links: ProfileLink
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
}

const filePath = join(process.cwd(), "content", "profile.yaml")
const fileContents = readFileSync(filePath, "utf8")

export const profile: Profile = parse(fileContents) as Profile
