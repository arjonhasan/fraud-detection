"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Add chart config
const chartConfig = {
  fraudAttempts: {
    label: "Fraud Attempts",
    color: "#0ea5e9",
  },
  prevented: {
    label: "Prevented",
    color: "#10b981",
  },
  successful: {
    label: "Successful",
    color: "#f43f5e",
  },
  identityTheft: {
    label: "Identity Theft",
    color: "#0ea5e9",
  },
  paymentFraud: {
    label: "Payment Fraud",
    color: "#f43f5e",
  },
  accountTakeover: {
    label: "Account Takeover",
    color: "#8b5cf6",
  },
  other: {
    label: "Other",
    color: "#f59e0b",
  },
}

// Dummy data for the charts
const overviewData = [
  { month: "Jan", fraudAttempts: 165, prevented: 120, amount: 24000 },
  { month: "Feb", fraudAttempts: 180, prevented: 132, amount: 26500 },
  { month: "Mar", fraudAttempts: 205, prevented: 143, amount: 31200 },
  { month: "Apr", fraudAttempts: 250, prevented: 165, amount: 38500 },
  { month: "May", fraudAttempts: 320, prevented: 210, amount: 42100 },
  { month: "Jun", fraudAttempts: 280, prevented: 190, amount: 39800 },
  { month: "Jul", fraudAttempts: 260, prevented: 180, amount: 36500 },
  { month: "Aug", fraudAttempts: 245, prevented: 175, amount: 34200 },
  { month: "Sep", fraudAttempts: 290, prevented: 195, amount: 41000 },
  { month: "Oct", fraudAttempts: 350, prevented: 230, amount: 48500 },
  { month: "Nov", fraudAttempts: 380, prevented: 250, amount: 52000 },
  { month: "Dec", fraudAttempts: 410, prevented: 275, amount: 58000 },
]

const fraudTypeData = [
  { name: "Identity Theft", value: 42, color: "#0ea5e9" },
  { name: "Payment Fraud", value: 28, color: "#f43f5e" },
  { name: "Account Takeover", value: 18, color: "#8b5cf6" },
  { name: "Synthetic Identity", value: 8, color: "#10b981" },
  { name: "Chargeback Fraud", value: 4, color: "#f59e0b" },
]

const regionData = [
  { region: "North America", fraudCount: 1245, preventedCount: 980, amount: 245000 },
  { region: "Europe", fraudCount: 890, preventedCount: 720, amount: 178000 },
  { region: "Asia", fraudCount: 760, preventedCount: 580, amount: 152000 },
  { region: "South America", fraudCount: 420, preventedCount: 310, amount: 84000 },
  { region: "Africa", fraudCount: 280, preventedCount: 190, amount: 56000 },
  { region: "Australia", fraudCount: 175, preventedCount: 140, amount: 35000 },
]

// Heatmap data for fraud by time of day and day of week
const heatmapData = [
  { name: "00:00-04:00", Monday: 12, Tuesday: 8, Wednesday: 9, Thursday: 11, Friday: 13, Saturday: 28, Sunday: 35 },
  { name: "04:00-08:00", Monday: 5, Tuesday: 4, Wednesday: 6, Thursday: 7, Friday: 9, Saturday: 15, Sunday: 12 },
  { name: "08:00-12:00", Monday: 18, Tuesday: 22, Wednesday: 19, Thursday: 21, Friday: 17, Saturday: 15, Sunday: 13 },
  { name: "12:00-16:00", Monday: 25, Tuesday: 27, Wednesday: 24, Thursday: 26, Friday: 30, Saturday: 22, Sunday: 20 },
  { name: "16:00-20:00", Monday: 32, Tuesday: 35, Wednesday: 33, Thursday: 36, Friday: 40, Saturday: 38, Sunday: 30 },
  { name: "20:00-24:00", Monday: 20, Tuesday: 18, Wednesday: 22, Thursday: 24, Friday: 35, Saturday: 45, Sunday: 38 },
]

// Radar chart data for fraud risk assessment
const radarData = [
  {
    subject: "Identity Verification",
    current: 80,
    previous: 65,
    fullMark: 100,
  },
  {
    subject: "Transaction Behavior",
    current: 75,
    previous: 59,
    fullMark: 100,
  },
  {
    subject: "Device Risk",
    current: 86,
    previous: 70,
    fullMark: 100,
  },
  {
    subject: "Location Risk",
    current: 65,
    previous: 60,
    fullMark: 100,
  },
  {
    subject: "Network Analysis",
    current: 90,
    previous: 71,
    fullMark: 100,
  },
  {
    subject: "Historical Patterns",
    current: 78,
    previous: 68,
    fullMark: 100,
  },
]

// Sankey diagram data for fraud flow
const sankeyData = {
  nodes: [
    { name: "Transactions" },
    { name: "Flagged" },
    { name: "Not Flagged" },
    { name: "Investigated" },
    { name: "Auto-cleared" },
    { name: "Confirmed Fraud" },
    { name: "False Positive" },
    { name: "Recovered" },
    { name: "Loss" },
  ],
  links: [
    { source: 0, target: 1, value: 2000 },
    { source: 0, target: 2, value: 8000 },
    { source: 1, target: 3, value: 1500 },
    { source: 1, target: 4, value: 500 },
    { source: 3, target: 5, value: 800 },
    { source: 3, target: 6, value: 700 },
    { source: 5, target: 7, value: 300 },
    { source: 5, target: 8, value: 500 },
  ],
}

// Time series data for fraud patterns
const timeSeriesData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (30 - i))

  // Create some patterns in the data
  const dayOfWeek = date.getDay()
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  // More fraud attempts on weekends
  const baseFraud = isWeekend ? 45 + Math.random() * 20 : 30 + Math.random() * 15

  // Add a trend and some randomness
  const trend = i * 0.5 // Increasing trend
  const random = Math.random() * 15 - 7.5 // Random noise

  const fraudAttempts = Math.round(baseFraud + trend + random)
  const prevented = Math.round(fraudAttempts * (0.6 + Math.random() * 0.2)) // 60-80% prevention rate

  return {
    date: date.toISOString().split("T")[0],
    fraudAttempts,
    prevented,
    successful: fraudAttempts - prevented,
  }
})

export function FraudReportsCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud Analytics</CardTitle>
        <CardDescription>Visualize fraud patterns and detection metrics over time</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="by-type">By Fraud Type</TabsTrigger>
            <TabsTrigger value="by-region">By Region</TabsTrigger>
            <TabsTrigger value="heatmap">Time Heatmap</TabsTrigger>
            <TabsTrigger value="radar">Risk Assessment</TabsTrigger>
            <TabsTrigger value="sankey">Fraud Flow</TabsTrigger>
            <TabsTrigger value="time-series">Time Series</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="h-[400px]">
              <FraudOverviewChart />
            </div>
          </TabsContent>
          <TabsContent value="by-type" className="space-y-4">
            <div className="h-[400px]">
              <FraudByTypeChart />
            </div>
          </TabsContent>
          <TabsContent value="by-region" className="space-y-4">
            <div className="h-[400px]">
              <FraudByRegionChart />
            </div>
          </TabsContent>
          <TabsContent value="heatmap" className="space-y-4">
            <div className="h-[400px]">
              <FraudHeatmapChart />
            </div>
          </TabsContent>
          <TabsContent value="radar" className="space-y-4">
            <div className="h-[400px]">
              <FraudRiskRadarChart />
            </div>
          </TabsContent>
          <TabsContent value="sankey" className="space-y-4">
            <div className="h-[400px]">
              <FraudFlowSankeyChart />
            </div>
          </TabsContent>
          <TabsContent value="time-series" className="space-y-4">
            <div className="h-[400px]">
              <FraudTimeSeriesChart />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function FraudOverviewChart() {
  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={overviewData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
          <YAxis className="text-xs fill-muted-foreground" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">{payload[0]?.payload.month}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0ea5e9]" />
                        <p className="text-xs">Fraud Attempts: {payload[0]?.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                        <p className="text-xs">Prevented: {payload[1]?.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                        <p className="text-xs">Amount: ${payload[0]?.payload.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="fraudAttempts"
            stroke="#0ea5e9"
            fillOpacity={1}
            fill="url(#colorFraud)"
            strokeWidth={2}
            name="Fraud Attempts"
          />
          <Area
            type="monotone"
            dataKey="prevented"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorPrevented)"
            strokeWidth={2}
            name="Prevented"
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function FraudByTypeChart() {
  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <div className="flex h-full flex-col md:flex-row">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={fraudTypeData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {fraudTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">{payload[0]?.name}</p>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: payload[0]?.payload.color }}
                          />
                          <p className="text-xs">{payload[0]?.value}% of total fraud</p>
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
      </div>
    </ChartContainer>
  )
}

function FraudByRegionChart() {
  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={regionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="region" className="text-xs fill-muted-foreground" />
          <YAxis className="text-xs fill-muted-foreground" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">{payload[0]?.payload.region}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0ea5e9]" />
                        <p className="text-xs">Fraud Count: {payload[0]?.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                        <p className="text-xs">Prevented: {payload[1]?.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                        <p className="text-xs">Amount: ${payload[0]?.payload.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="fraudCount" name="Fraud Count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          <Bar dataKey="preventedCount" name="Prevented" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function FraudHeatmapChart() {
  // Generate colors for the heatmap
  const getColor = (value) => {
    // Color scale from light to dark
    if (value < 10) return "#f7f7f7"
    if (value < 15) return "#d9f0f3"
    if (value < 20) return "#a6e1ec"
    if (value < 25) return "#67c6e1"
    if (value < 30) return "#3ba7d9"
    if (value < 35) return "#1d85c4"
    if (value < 40) return "#0e60a3"
    return "#08306b"
  }

  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <div className="text-sm font-medium">Fraud Incidents by Time of Day and Day of Week</div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={heatmapData} layout="vertical" margin={{ top: 20, right: 30, left: 70, bottom: 20 }}>
            <XAxis type="number" className="text-xs fill-muted-foreground" />
            <YAxis dataKey="name" type="category" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const dataKey = payload[0].dataKey
                  const value = payload[0].value
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">
                          {label} - {dataKey}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: getColor(value) }} />
                          <p className="text-xs">Fraud Incidents: {value}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="Monday" name="Monday">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-monday-${index}`} fill={getColor(entry.Monday)} />
              ))}
            </Bar>
            <Bar dataKey="Tuesday" name="Tuesday">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-tuesday-${index}`} fill={getColor(entry.Tuesday)} />
              ))}
            </Bar>
            <Bar dataKey="Wednesday" name="Wednesday">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-wednesday-${index}`} fill={getColor(entry.Wednesday)} />
              ))}
            </Bar>
            <Bar dataKey="Thursday" name="Thursday">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-thursday-${index}`} fill={getColor(entry.Thursday)} />
              ))}
            </Bar>
            <Bar dataKey="Friday" name="Friday">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-friday-${index}`} fill={getColor(entry.Friday)} />
              ))}
            </Bar>
            <Bar dataKey="Saturday" name="Saturday">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-saturday-${index}`} fill={getColor(entry.Saturday)} />
              ))}
            </Bar>
            <Bar dataKey="Sunday" name="Sunday">
              {heatmapData.map((entry, index) => (
                <Cell key={`cell-sunday-${index}`} fill={getColor(entry.Sunday)} />
              ))}
            </Bar>
            <Legend />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#f7f7f7" }} />
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#a6e1ec" }} />
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#3ba7d9" }} />
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: "#08306b" }} />
              <span className="text-xs">Very High</span>
            </div>
          </div>
        </div>
      </div>
    </ChartContainer>
  )
}

function FraudRiskRadarChart() {
  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <div className="text-sm font-medium">Fraud Risk Assessment by Category</div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Current Period" dataKey="current" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
            <Radar name="Previous Period" dataKey="previous" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
            <Legend />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">{payload[0]?.payload.subject}</p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#0ea5e9]" />
                          <p className="text-xs">Current: {payload[0]?.value}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#f43f5e]" />
                          <p className="text-xs">Previous: {payload[1]?.value}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex justify-center">
          <div className="text-xs text-muted-foreground">
            Higher values indicate higher risk levels in each category
          </div>
        </div>
      </div>
    </ChartContainer>
  )
}

function FraudFlowSankeyChart() {
  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <div className="text-sm font-medium">Fraud Detection Flow Analysis</div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Sankey Diagram Visualization</p>
              <p className="text-xs mt-2">
                Shows the flow from total transactions through flagging, investigation, and resolution stages
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                <div className="rounded-md border p-2">
                  <div className="font-medium">Transactions</div>
                  <div className="text-2xl font-bold">10,000</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="font-medium">Flagged</div>
                  <div className="text-2xl font-bold">2,000</div>
                  <div className="text-xs text-muted-foreground">(20%)</div>
                </div>
                <div className="rounded-md border p-2">
                  <div className="font-medium">Confirmed Fraud</div>
                  <div className="text-2xl font-bold">800</div>
                  <div className="text-xs text-muted-foreground">(8%)</div>
                </div>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-sm bg-blue-500" />
                  <span className="text-xs">Transaction Flow</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-sm bg-red-500" />
                  <span className="text-xs">Fraud Flow</span>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )
}

function FraudTimeSeriesChart() {
  return (
    <ChartContainer className="h-full" config={chartConfig}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs fill-muted-foreground"
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getDate()}/${date.getMonth() + 1}`
            }}
          />
          <YAxis className="text-xs fill-muted-foreground" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">{new Date(payload[0]?.payload.date).toLocaleDateString()}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#0ea5e9]" />
                        <p className="text-xs">Fraud Attempts: {payload[0]?.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#10b981]" />
                        <p className="text-xs">Prevented: {payload[1]?.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#f43f5e]" />
                        <p className="text-xs">Successful: {payload[2]?.value}</p>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey="fraudAttempts"
            name="Fraud Attempts"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ r: 1 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="prevented"
            name="Prevented"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 1 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="successful"
            name="Successful"
            stroke="#f43f5e"
            strokeWidth={2}
            dot={{ r: 1 }}
            activeDot={{ r: 5 }}
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
