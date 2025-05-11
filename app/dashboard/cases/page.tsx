import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CaseBoard } from "@/components/case-management/case-board"
import { CaseMetrics } from "@/components/case-management/case-metrics"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FraudReportsSidebar } from "@/components/fraud-reports-sidebar"

export default function CasesPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <FraudReportsSidebar />
        <div className="flex-1">
          <DashboardShell>
            <DashboardHeader heading="Fraud Case Management" text="Track and resolve fraud cases">
              <div className="flex items-center gap-2"></div>
            </DashboardHeader>

            <Tabs defaultValue="board" className="space-y-4">
              <TabsList>
                <TabsTrigger value="board">Case Board</TabsTrigger>
                <TabsTrigger value="metrics">Metrics & Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="board" className="space-y-4">
                <Suspense fallback={<div className="h-[600px] rounded-md bg-muted animate-pulse" />}>
                  <CaseBoard />
                </Suspense>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <Suspense fallback={<div className="h-[600px] rounded-md bg-muted animate-pulse" />}>
                  <CaseMetrics />
                </Suspense>
              </TabsContent>
            </Tabs>
          </DashboardShell>
        </div>
      </div>
    </SidebarProvider>
  )
}
