import { Suspense } from "react"
import { DateRangePicker } from "@/components/date-range-picker"
import { FraudMetricsCards } from "@/components/fraud-metrics-cards"
import { FraudReportsCharts } from "@/components/fraud-reports-charts"
import { FraudReportsTable } from "@/components/fraud-reports-table"
import { FraudReportsFilters } from "@/components/fraud-reports-filters"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FraudReportsSidebar } from "@/components/fraud-reports-sidebar"
import { ReportActions } from "@/components/report-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, RefreshCw, Calendar } from "lucide-react"
import { FraudGeoMap } from "@/components/fraud-geo-map"
import { SavedReports } from "@/components/saved-reports"
import { UserBehaviorAnalytics } from "@/components/user-behavior-analytics"

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <FraudReportsSidebar />
        <div className="flex-1">
          <DashboardShell>
            <DashboardHeader heading="Fraud Detection Reports" text="Analyze and monitor fraud detection metrics">
              <div className="flex items-center gap-2">
                <ReportActions />
              </div>
            </DashboardHeader>

            <Tabs defaultValue="dashboard" className="space-y-4">
              <div className="flex justify-between">
                <TabsList>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="geographic">Geographic</TabsTrigger>
                  <TabsTrigger value="behavior">User Behavior</TabsTrigger>
                  <TabsTrigger value="saved">Saved Reports</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <TabsContent value="dashboard" className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <FraudReportsFilters />
                  <DateRangePicker />
                </div>

                <Suspense fallback={<div className="h-[200px] rounded-md bg-muted animate-pulse" />}>
                  <FraudMetricsCards />
                </Suspense>

                <Suspense fallback={<div className="h-[400px] rounded-md bg-muted animate-pulse" />}>
                  <FraudReportsCharts />
                </Suspense>

                <Suspense fallback={<div className="h-[400px] rounded-md bg-muted animate-pulse" />}>
                  <FraudReportsTable />
                </Suspense>
              </TabsContent>

              <TabsContent value="geographic" className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <FraudReportsFilters />
                  <DateRangePicker />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Fraud Distribution</CardTitle>
                    <CardDescription>Visualize fraud patterns across different regions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[600px]">
                      <FraudGeoMap />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="behavior" className="space-y-4">
                <UserBehaviorAnalytics />
              </TabsContent>

              <TabsContent value="saved" className="space-y-4">
                <SavedReports />
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Reports</CardTitle>
                    <CardDescription>Manage your automated report delivery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Weekly Fraud Summary</h3>
                              <p className="text-sm text-muted-foreground">Every Monday at 8:00 AM</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Disable
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Monthly Executive Report</h3>
                              <p className="text-sm text-muted-foreground">1st day of month at 7:00 AM</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Disable
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-primary/10 p-2">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Daily Fraud Alert Digest</h3>
                              <p className="text-sm text-muted-foreground">Daily at 6:00 PM</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              Disable
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Create New Scheduled Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DashboardShell>
        </div>
      </div>
    </SidebarProvider>
  )
}
