import { ReactNode } from "react"

import Navbar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}
