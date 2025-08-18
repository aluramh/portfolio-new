import type { Metadata } from "next"
import { profile } from "@/lib/profile"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import MainContent from "@/components/main-content"

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    url: "/",
    type: "website",
  },
}

export default function Page() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <MainContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
