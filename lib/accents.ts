export type Accent = "emerald" | "amber" | "blue" | "pink"

export interface AccentClasses {
  text: string
  bg: string
  bgMuted: string
  border: string
  borderMuted: string
  stripe: string
}

const TABLE: Record<Accent, AccentClasses> = {
  emerald: {
    text: "text-emerald",
    bg: "bg-emerald",
    bgMuted: "bg-emerald-muted",
    border: "border-emerald/30",
    borderMuted: "border-emerald/15",
    stripe: "bg-emerald",
  },
  amber: {
    text: "text-amber",
    bg: "bg-amber",
    bgMuted: "bg-amber-muted",
    border: "border-amber/30",
    borderMuted: "border-amber/15",
    stripe: "bg-amber",
  },
  blue: {
    text: "text-blue",
    bg: "bg-blue",
    bgMuted: "bg-blue-muted",
    border: "border-blue/30",
    borderMuted: "border-blue/15",
    stripe: "bg-blue",
  },
  pink: {
    text: "text-pink",
    bg: "bg-pink",
    bgMuted: "bg-pink-muted",
    border: "border-pink/30",
    borderMuted: "border-pink/15",
    stripe: "bg-pink",
  },
}

export const ACCENT_CYCLE: readonly Accent[] = ["emerald", "amber", "blue", "pink"]

export function accentClasses(accent: Accent): AccentClasses {
  return TABLE[accent]
}

export function accentByIndex(index: number): Accent {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length]
}
