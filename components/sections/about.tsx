"use client"

import { motion } from "framer-motion"
import { profile } from "@/lib/profile"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">About</h2>
        <Card className="border-0 shadow-none bg-accent/20 backdrop-blur-sm">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-3xl mx-auto">
              {profile.about}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
