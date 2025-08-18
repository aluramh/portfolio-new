"use client"

import { useState } from "react"
import { profile } from "@/lib/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy } from "lucide-react"

export default function SkillsSection() {
  const groups = profile.skills
  const allSkills = Array.from(new Set(groups.flatMap((g) => g.items)))
  const [copied, setCopied] = useState(false)

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(allSkills.join(", "))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // no-op
    }
  }

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20">
      <div className="flex items-end justify-between gap-4 mb-3">
        <h2 id="skills-heading" className="text-2xl font-semibold tracking-tight">
          Skills
        </h2>
        <div className="hidden sm:block text-sm text-muted-foreground">
          {"A selection of tools and technologies I use day-to-day"}
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between gap-3">
          <div className="w-full overflow-x-auto">
            <TabsList className="inline-flex bg-muted/40 p-1 rounded-lg min-w-full sm:min-w-0">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground rounded-md border"
              >
                All
              </TabsTrigger>
              {groups.map((g) => (
                <TabsTrigger
                  key={g.title}
                  value={g.title}
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground rounded-md border"
                >
                  {g.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <Button
            type="button"
            onClick={copyAll}
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-emerald-600/40 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 bg-transparent"
            aria-live="polite"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1.5" />
                Copy all
              </>
            )}
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card className="border-emerald-600/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">All skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="border hover:shadow-sm transition-shadow bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/10"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {groups.map((g) => (
          <TabsContent key={g.title} value={g.title} className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Category spotlight card */}
              <Card className="col-span-1 sm:col-span-2 lg:col-span-1 border-emerald-600/20 relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 opacity-70 [mask-image:radial-gradient(150px_120px_at_top_left,black,transparent)]"
                >
                  <div className="h-20 w-28 bg-emerald-200/60 dark:bg-emerald-600/20 blur-2xl" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{g.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    {"Key technologies in "}
                    {g.title.toLowerCase()}
                    {":"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.slice(0, 6).map((s) => (
                      <Badge key={s} variant="secondary" className="border">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Full list card */}
              <Card className="sm:col-span-2 lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Badge key={s} variant="secondary" className="border hover:shadow-sm transition-shadow" title={s}>
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
