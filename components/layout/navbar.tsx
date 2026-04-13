import { profile } from "@/content/parser"
import { NavbarClient } from "./navbar-client"

export function Navbar() {
  return <NavbarClient name={profile.name} />
}
