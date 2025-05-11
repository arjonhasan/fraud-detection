import { Suspense } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { CaseDetail } from "@/components/case-management/case-detail"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FraudReportsSidebar } from "@/components/fraud-reports-sidebar"

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <FraudReportsSidebar />
        <div className="flex-1">
          <DashboardShell>
            <Suspense fallback={<div className="h-[600px] rounded-md bg-muted animate-pulse" />}>
              <CaseDetail />
            </Suspense>
          </DashboardShell>
        </div>
      </div>
    </SidebarProvider>
  )
}
