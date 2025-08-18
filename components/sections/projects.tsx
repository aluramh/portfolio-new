"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { profile } from "@/lib/profile"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProjectsSection() {
  const projects = profile.projects

  return (
    <section id="projects" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=200&width=400&query=${encodeURIComponent(project.imageQuery)}`}
                      width={400}
                      height={200}
                      alt={`${project.title} preview`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center gap-2">
                  {project.demo && (
                    <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent">
                      <Link href={project.demo} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Live
                      </Link>
                    </Button>
                  )}
                  {project.repo && (
                    <Button asChild size="sm" variant="ghost" className="rounded-full">
                      <Link href={project.repo} target="_blank" rel="noreferrer">
                        <Github className="h-3 w-3 mr-2" />
                        Code
                      </Link>
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="ml-auto bg-emerald-600 hover:bg-emerald-700 rounded-full">
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                        <DialogDescription className="text-base">{project.description}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
                        <div>
                          <h4 className="font-semibold mb-2">Key Highlights</h4>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
