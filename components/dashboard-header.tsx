import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children, className, ...props }: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 md:flex-row md:items-center md:justify-between", className)} {...props}>
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
