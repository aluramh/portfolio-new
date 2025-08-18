"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { contactAction } from "@/app/server-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { profile } from "@/lib/profile"

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")

  async function clientAction(formData: FormData) {
    try {
      setStatus("pending")
      const result = await contactAction(formData)
      setStatus(result.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Get in Touch</h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-2xl">Let's collaborate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  I'm always interested in hearing about new opportunities, interesting projects, or just having a chat
                  about technology and development.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <Link
                        href={`mailto:${profile.links.email}`}
                        className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                      >
                        {profile.links.email}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Github className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <Link
                        href={profile.links.github}
                        target="_blank"
                        className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                      >
                        View my repositories
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Linkedin className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <Link
                        href={profile.links.linkedin}
                        target="_blank"
                        className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                      >
                        Connect with me
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={clientAction} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Your name" required className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or just say hello!"
                      rows={5}
                      required
                      className="rounded-lg resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      type="submit"
                      disabled={status === "pending"}
                      className="bg-emerald-600 hover:bg-emerald-700 rounded-lg px-6"
                    >
                      {status === "pending" ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send message
                        </>
                      )}
                    </Button>
                    {status === "success" && (
                      <span className="text-sm text-emerald-600 font-medium" role="status">
                        Message sent successfully! 🎉
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-sm text-destructive" role="status">
                        Something went wrong. Please try again.
                      </span>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
