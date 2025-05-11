"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { AlertTriangle, CheckCircle2, Clock, Search } from "lucide-react"

// Sample data for case metrics
const casesByStatus = [
  { name: "New", value: 12, color: "#3b82f6" },
  { name: "Investigating", value: 18, color: "#eab308" },
  { name: "Pending", value: 8, color: "#f97316" },
  { name: "Resolved", value: 24, color: "#22c55e" },
  { name: "Closed", value: 15, color: "#6b7280" },
]

const casesByPriority = [
  { name: "Critical", value: 7, color: "#ef4444" },
  { name: "High", value: 15, color: "#f97316" },
  { name: "Medium", value: 28, color: "#eab308" },
  { name: "Low", value: 27, color: "#6b7280" },
]

const casesByType = [
  { name: "Account Takeover", value: 18, color: "#3b82f6" },
  { name: "Payment Fraud", value: 22, color: "#f97316" },
  { name: "Identity Theft", value: 13, color: "#8b5cf6" },
  { name: "Chargeback", value: 9, color: "#ec4899" },
  { name: "Synthetic Identity", value: 5, color: "#14b8a6" },
  { name: "Other", value: 10, color: "#6b7280" },
]

const casesTrendData = [
  { name: "Jan", new: 8, resolved: 5, backlog: 3 },
  { name: "Feb", new: 10, resolved: 7, backlog: 6 },
  { name: "Mar", new: 15, resolved: 10, backlog: 11 },
  { name: "Apr", new: 12, resolved: 14, backlog: 9 },
  { name: "May", new: 18, resolved: 12, backlog: 15 },
  { name: "Jun", new: 20, resolved: 16, backlog: 19 },
  { name: "Jul", new: 25, resolved: 20, backlog: 24 },
  { name: "Aug", new: 22, resolved: 25, backlog: 21 },
  { name: "Sep", new: 30, resolved: 22, backlog: 29 },
  { name: "Oct", new: 28, resolved: 30, backlog: 27 },
  { name: "Nov", new: 35, resolved: 28, backlog: 34 },
  { name: "Dec", new: 32, resolved: 35, backlog: 31 },
]

const resolutionTimeData = [
  { name: "Critical", avg: 12, min: 4, max: 24 },
  { name: "High", avg: 24, min: 8, max: 48 },
  { name: "Medium", avg: 72, min: 24, max: 120 },
  { name: "Low", avg: 120, min: 48, max: 168 },
]

const slaComplianceData = [
  { name: "Critical", compliant: 85, nonCompliant: 15 },
  { name: "High", compliant: 90, nonCompliant: 10 },
  { name: "Medium", compliant: 95, nonCompliant: 5 },
  { name: "Low", compliant: 98, nonCompliant: 2 },
]

// Add chart config
const chartConfig = {
  new: {
    label: "New Cases",
    color: "#3b82f6"
  },
  resolved: {
    label: "Resolved Cases",
    color: "#22c55e"
  },
  backlog: {
    label: "Backlog",
    color: "#f97316"
  },
  avg: {
    label: "Average Time",
    color: "#3b82f6"
  },
  min: {
    label: "Minimum Time",
    color: "#22c55e"
  },
  max: {
    label: "Maximum Time",
    color: "#ef4444"
  },
  compliant: {
    label: "Within SLA",
    color: "#22c55e"
  },
  nonCompliant: {
    label: "Outside SLA",
    color: "#ef4444"
  }
}

export function CaseMetrics() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">77</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-rose-500">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases Resolved (MTD)</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+25%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">-2.3h</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="resolution">Resolution Time</TabsTrigger>
          <TabsTrigger value="sla">SLA Compliance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Cases by Status</CardTitle>
                <CardDescription>Distribution of cases by current status</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={casesByStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {casesByStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">{payload[0].name}</p>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: payload[0].payload.color }}
                                      />
                                      <p className="text-xs">Cases: {payload[0].value}</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {casesByStatus.map((status) => (
                    <div key={status.name} className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: status.color }} />
                      <span className="text-xs">
                        {status.name}: {status.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cases by Priority</CardTitle>
                <CardDescription>Distribution of cases by priority level</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={casesByPriority}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {casesByPriority.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">{payload[0].name}</p>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: payload[0].payload.color }}
                                      />
                                      <p className="text-xs">Cases: {payload[0].value}</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {casesByPriority.map((priority) => (
                    <div key={priority.name} className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: priority.color }} />
                      <span className="text-xs">
                        {priority.name}: {priority.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cases by Type</CardTitle>
                <CardDescription>Distribution of cases by fraud type</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={casesByType}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                        >
                          {casesByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">{payload[0].name}</p>
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="h-2 w-2 rounded-full"
                                        style={{ backgroundColor: payload[0].payload.color }}
                                      />
                                      <p className="text-xs">Cases: {payload[0].value}</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {casesByType.map((type) => (
                    <div key={type.name} className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                      <span className="text-xs">
                        {type.name}: {type.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Trends (Last 12 Months)</CardTitle>
              <CardDescription>Monthly trends of new, resolved, and backlog cases</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={casesTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm font-medium">{label}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <p className="text-xs">New Cases: {payload[0].value}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <p className="text-xs">Resolved Cases: {payload[1].value}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    <p className="text-xs">Backlog: {payload[2].value}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="new"
                        name="New Cases"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="resolved"
                        name="Resolved Cases"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="backlog"
                        name="Backlog"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolution Time by Priority (Hours)</CardTitle>
              <CardDescription>Average, minimum, and maximum resolution times</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={resolutionTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm font-medium">{label} Priority</p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    <p className="text-xs">Average: {payload[0].value} hours</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <p className="text-xs">Minimum: {payload[1].value} hours</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <p className="text-xs">Maximum: {payload[2].value} hours</p>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Bar dataKey="avg" name="Average Time" fill="#3b82f6" />
                      <Bar dataKey="min" name="Minimum Time" fill="#22c55e" />
                      <Bar dataKey="max" name="Maximum Time" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SLA Compliance by Priority (%)</CardTitle>
              <CardDescription>Percentage of cases resolved within SLA targets</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={slaComplianceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                      <YAxis className="text-xs fill-muted-foreground" />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm font-medium">{label} Priority</p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <p className="text-xs">Within SLA: {payload[0].value}%</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <p className="text-xs">Outside SLA: {payload[1].value}%</p>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Legend />
                      <Bar dataKey="compliant" name="Within SLA" fill="#22c55e" stackId="a" />
                      <Bar dataKey="nonCompliant" name="Outside SLA" fill="#ef4444" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-4">
                {slaComplianceData.map((item) => (
                  <Card key={item.name} className="overflow-hidden">
                    <div className="flex flex-col">
                      <div className="bg-muted p-2 text-center text-sm font-medium">{item.name} Priority</div>
                      <div className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-500">{item.compliant}%</div>
                        <div className="text-xs text-muted-foreground">SLA Compliance</div>
                      </div>
                      <div className="h-2 w-full bg-red-200">
                        <div className="h-full bg-green-500" style={{ width: `${item.compliant}%` }}></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
