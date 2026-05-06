"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { accentClasses } from "@/lib/accents"
import type { SelectedWork } from "@/content/parser"

const COUNT_UP_DURATION_MS = 1500

export function SelectedWorkCard({ work }: { work: SelectedWork }) {
  const ref = useAnimateOnScroll<HTMLElement>()
  const a = accentClasses(work.accent)

  return (
    <article
      ref={ref}
      className="animate-on-scroll group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`h-1 ${a.stripe} group-hover:h-1.5 transition-all duration-200`} aria-hidden="true" />

      <div className="flex flex-col gap-3 p-6">
        <Stat work={work} accentText={a.text} />
        <h3 className="font-display text-xl font-bold tracking-tight">
          {work.title}
        </h3>
        <p className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {work.company}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {work.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={`text-xs font-normal ${a.bgMuted} ${a.border} ${a.text}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
}

function Stat({ work, accentText }: { work: SelectedWork; accentText: string }) {
  const [animatedValue, setAnimatedValue] = useState<number | null>(
    work.statValue !== undefined ? 0 : null
  )
  const [done, setDone] = useState(work.statValue === undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (work.statValue === undefined) return
    const node = containerRef.current
    if (!node) return

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setDone(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          const target = work.statValue!
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / COUNT_UP_DURATION_MS)
            const eased = 1 - Math.pow(1 - t, 3)
            setAnimatedValue(Math.floor(eased * target))
            if (t < 1) {
              requestAnimationFrame(tick)
            } else {
              setDone(true)
            }
          }
          requestAnimationFrame(tick)
          observer.unobserve(node)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [work.statValue])

  const display = done || animatedValue === null
    ? work.stat
    : animatedValue.toLocaleString()

  return (
    <div ref={containerRef} className="flex flex-col">
      <span
        className={`font-display text-5xl font-extrabold tracking-tight tabular-nums ${accentText}`}
      >
        {display}
      </span>
      <span className="font-eyebrow text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {work.statLabel}
      </span>
    </div>
  )
}
