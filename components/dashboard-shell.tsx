import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8", className)} {...props}>
      {children}
    </div>
  )
}
