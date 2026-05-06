import { readFileSync } from "fs"
import { join } from "path"
import { parse } from "yaml"
import type { Accent } from "@/lib/accents"

export type { Accent }

export interface ProfileLink {
  github: string
  linkedin: string
  email: string
}

export interface Experience {
  company: string
  via?: string
  role: string
  period: string
  location: string
  logo?: string
  highlights: string[]
  tech: string[]
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

export interface SelectedWork {
  title: string
  company: string
  description: string
  stat: string
  statValue?: number
  statLabel: string
  tags: string[]
  accent: Accent
}

export interface Education {
  school: string
  shortName?: string
  location: string
  degree: string
  year: string
  note?: string
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
  skills: SkillGroup[]
  selectedWork: SelectedWork[]
  education: Education[]
}

interface RawSelectedWork {
  title: string
  company: string
  description: string
  stat: string
  stat_value?: number
  stat_label: string
  tags: string[]
  accent: Accent
}

interface RawEducation {
  school: string
  short_name?: string
  location: string
  degree: string
  year: string
  note?: string
}

interface RawProfile extends Omit<Profile, "selectedWork" | "education"> {
  selected_work?: RawSelectedWork[]
  education?: RawEducation[]
}

const filePath = join(process.cwd(), "content", "profile.yaml")
const fileContents = readFileSync(filePath, "utf8")
const raw = parse(fileContents) as RawProfile

export const profile: Profile = {
  ...raw,
  selectedWork: (raw.selected_work ?? []).map((sw) => ({
    title: sw.title,
    company: sw.company,
    description: sw.description,
    stat: sw.stat,
    statValue: sw.stat_value,
    statLabel: sw.stat_label,
    tags: sw.tags,
    accent: sw.accent,
  })),
  education: (raw.education ?? []).map((e) => ({
    school: e.school,
    shortName: e.short_name,
    location: e.location,
    degree: e.degree,
    year: e.year,
    note: e.note,
  })),
}
