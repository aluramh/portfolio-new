import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display, Oswald } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { profile } from "@/content/parser"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-eyebrow",
})

export const metadata: Metadata = {
  title: profile.meta.siteTitle,
  description: profile.meta.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${oswald.variable}`}
    >
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
