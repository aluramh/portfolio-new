"use client"

import { useState } from "react"
import { Settings, Palette, Layout, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function CustomizationPanel() {
  const [accentColor, setAccentColor] = useState("emerald")
  const [layout, setLayout] = useState("comfortable")

  const accentColors = [
    { name: "emerald", label: "Emerald", class: "bg-emerald-500" },
    { name: "blue", label: "Blue", class: "bg-blue-500" },
    { name: "purple", label: "Purple", class: "bg-purple-500" },
    { name: "orange", label: "Orange", class: "bg-orange-500" },
  ]

  const layouts = [
    { name: "compact", label: "Compact", icon: Layout },
    { name: "comfortable", label: "Comfortable", icon: Zap },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Customization options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Customize
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Accent Color</div>
          <div className="grid grid-cols-4 gap-2">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => setAccentColor(color.name)}
                className={`h-6 w-6 rounded-full ${color.class} ${
                  accentColor === color.name ? "ring-2 ring-offset-2 ring-foreground" : ""
                }`}
                title={color.label}
              />
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Layout</div>
          <div className="space-y-1">
            {layouts.map((layoutOption) => (
              <button
                key={layoutOption.name}
                onClick={() => setLayout(layoutOption.name)}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-accent ${
                  layout === layoutOption.name ? "bg-accent" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  <layoutOption.icon className="h-3 w-3" />
                  {layoutOption.label}
                </span>
                {layout === layoutOption.name && (
                  <Badge variant="secondary" className="h-4 px-1.5 text-xs">
                    Active
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
