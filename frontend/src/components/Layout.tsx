import { ReactNode } from "react"
import { cn } from "../lib/utils"

type LayoutProps = {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-white text-black">
      <div className={cn("max-w-6xl mx-auto p-6", className)}>
        {children}
      </div>
    </div>
  )
}
