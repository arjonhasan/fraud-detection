  "use client"

  import * as React from "react"
  import type { ReactElement } from "react"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
  import { Badge } from "@/components/ui/badge"
  import { Slider } from "@/components/ui/slider"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import {
    LineChart,
    Line,
    BarChart,
    Bar,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
  } from "recharts"
  import { ChartContainer } from "@/components/ui/chart"
  import {
    AlertTriangle,
    Calendar,
    Clock,
    Filter,
    Laptop,
    Maximize2,
    MousePointer,
    Smartphone,
    User,
    UserCheck,
    MapPin,
  } from "lucide-react"
  import { LineDot } from "recharts/types/cartesian/Line"
  import type { DotProps } from "recharts"

  // Sample user data
  const users = [
    { id: "U1001", name: "John Smith", email: "john.smith@example.com", riskScore: 12 },
    { id: "U1002", name: "Emily Johnson", email: "emily.j@example.com", riskScore: 78 },
    { id: "U1003", name: "Michael Brown", email: "michael.b@example.com", riskScore: 24 },
    { id: "U1004", name: "Sarah Williams", email: "sarah.w@example.com", riskScore: 92 },
    { id: "U1005", name: "David Miller", email: "david.m@example.com", riskScore: 45 },
  ]

  // Sample login activity data
  const generateLoginData = (userId: string, anomalous: boolean) => {
    const now = new Date()
    const data = []

    // Generate 30 days of login data
    for (let i = 0; i < 30; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - (30 - i))

      // Normal users have 0-3 logins per day
      let loginCount = Math.floor(Math.random() * 4)

      // Anomalous users have spikes in activity
      if (anomalous && (i === 22 || i === 23 || i === 24)) {
        loginCount = Math.floor(Math.random() * 8) + 8 // 8-15 logins
      }

      data.push({
        date: date.toISOString().split("T")[0],
        logins: loginCount,
        // Flag anomalous behavior
        anomaly: anomalous && (i === 22 || i === 23 || i === 24),
      })
    }

    return data
  }

  // Sample session data
  const generateSessionData = (userId: string, anomalous: boolean) => {
    const data = []

    // Generate 20 sessions
    for (let i = 0; i < 20; i++) {
      const date = new Date()
      date.setHours(date.getHours() - i * 6)

      // Normal session duration between 5-30 minutes
      let duration = Math.floor(Math.random() * 25) + 5
      let pageViews = Math.floor(Math.random() * 15) + 5
      let transactionAttempts = Math.floor(Math.random() * 3)

      // Anomalous sessions
      if (anomalous && (i === 2 || i === 3)) {
        duration = Math.floor(Math.random() * 5) + 1 // Very short 1-5 minutes
        pageViews = Math.floor(Math.random() * 30) + 20 // Many page views
        transactionAttempts = Math.floor(Math.random() * 5) + 5 // Many transaction attempts
      }

      data.push({
        sessionId: `S${userId}-${i}`,
        timestamp: date.toISOString(),
        duration,
        pageViews,
        transactionAttempts,
        device: Math.random() > 0.7 ? "mobile" : "desktop",
        location: ["US", "UK", "CA", "AU", "DE", "FR"][Math.floor(Math.random() * 6)],
        anomaly: anomalous && (i === 2 || i === 3),
      })
    }

    return data
  }

  // Sample behavioral biometrics data
  const generateBiometricsData = (userId: string, anomalous: boolean) => {
    const data = []

    // Generate 50 data points
    for (let i = 0; i < 50; i++) {
      // Normal typing speed and mouse movement patterns
      let typingSpeed = Math.floor(Math.random() * 30) + 50 // 50-80 WPM
      let mouseSpeed = Math.floor(Math.random() * 20) + 10 // 10-30 pixels/sec

      // Add some noise for normal variation
      if (Math.random() > 0.8) {
        typingSpeed += Math.floor(Math.random() * 20) - 10
        mouseSpeed += Math.floor(Math.random() * 10) - 5
      }

      // Anomalous patterns
      if (anomalous && i > 35) {
        typingSpeed = Math.floor(Math.random() * 40) + 90 // 90-130 WPM (much faster)
        mouseSpeed = Math.floor(Math.random() * 30) + 35 // 35-65 pixels/sec (much faster)
      }

      data.push({
        id: i,
        typingSpeed,
        mouseSpeed,
        anomaly: anomalous && i > 35,
      })
    }

    return data
  }

  // Sample location data
  const generateLocationData = (userId: string, anomalous: boolean) => {
    const normalLocations = ["New York, US", "New York, US", "New York, US", "New Jersey, US", "Connecticut, US"]
    const anomalousLocations = ["Moscow, RU", "Beijing, CN", "Lagos, NG", "Kyiv, UA"]

    const data = []

    // Generate 15 login locations
    for (let i = 0; i < 15; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (15 - i))

      let location
      if (anomalous && i > 10) {
        location = anomalousLocations[Math.floor(Math.random() * anomalousLocations.length)]
      } else {
        location = normalLocations[Math.floor(Math.random() * normalLocations.length)]
      }

      data.push({
        date: date.toISOString().split("T")[0],
        location,
        anomaly: anomalous && i > 10,
      })
    }

    return data
  }

  // Generate data for the selected user
  const getUserData = (userId: string) => {
    const user = users.find((u) => u.id === userId) || users[0]
    const anomalous = user.riskScore > 70

    return {
      user,
      loginData: generateLoginData(userId, anomalous),
      sessionData: generateSessionData(userId, anomalous),
      biometricsData: generateBiometricsData(userId, anomalous),
      locationData: generateLocationData(userId, anomalous),
    }
  }

  // Add chart config
  const chartConfig = {
    logins: {
      label: "Login Count",
      color: "#0ea5e9"
    },
    anomaly: {
      label: "Anomalous Activity",
      color: "#f43f5e"
    },
    duration: {
      label: "Session Duration",
      color: "#0ea5e9"
    },
    pageViews: {
      label: "Page Views",
      color: "#10b981"
    },
    transactionAttempts: {
      label: "Transaction Attempts",
      color: "#8b5cf6"
    },
    typingSpeed: {
      label: "Typing Speed",
      color: "#0ea5e9"
    },
    mouseSpeed: {
      label: "Mouse Speed",
      color: "#10b981"
    }
  }

  export function UserBehaviorAnalytics() {
    const [selectedUserId, setSelectedUserId] = React.useState("U1002") // Start with a high-risk user
    const [anomalyThreshold, setAnomalyThreshold] = React.useState(70)
    const [timeRange, setTimeRange] = React.useState("30d")

    const userData = React.useMemo(() => getUserData(selectedUserId), [selectedUserId])

    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>User Behavior Analytics</CardTitle>
              <CardDescription>Analyze user behavior patterns to detect anomalies</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center">
                        {user.name}
                        {user.riskScore > 70 && (
                          <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-destructive"></span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 rounded-lg border p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{userData.user.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData.user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium text-muted-foreground">Risk Score</div>
                  <div className="flex items-center">
                    <span
                      className={`text-lg font-bold ${userData.user.riskScore > anomalyThreshold ? "text-destructive" : "text-primary"}`}
                    >
                      {userData.user.riskScore}
                    </span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </div>
                <Badge variant={userData.user.riskScore > anomalyThreshold ? "destructive" : "outline"}>
                  {userData.user.riskScore > anomalyThreshold ? (
                    <>
                      <AlertTriangle className="mr-1 h-3 w-3" /> Anomalous
                    </>
                  ) : (
                    <>
                      <UserCheck className="mr-1 h-3 w-3" /> Normal
                    </>
                  )}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium text-muted-foreground">Last Login</div>
                <div className="mt-1 flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>Today, 10:42 AM</span>
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium text-muted-foreground">Login Locations</div>
                <div className="mt-1 flex items-center">
                  <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>3 different countries</span>
                  {userData.user.riskScore > anomalyThreshold && (
                    <Badge variant="destructive" className="ml-2">
                      Suspicious
                    </Badge>
                  )}
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium text-muted-foreground">Devices</div>
                <div className="mt-1 flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-muted-foreground" />
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span>2 devices</span>
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium text-muted-foreground">Account Age</div>
                <div className="mt-1 flex items-center">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>237 days</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="activity">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
              <TabsTrigger value="sessions">Session Analysis</TabsTrigger>
              <TabsTrigger value="biometrics">Behavioral Biometrics</TabsTrigger>
              <TabsTrigger value="locations">Location Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Login Activity Timeline</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-xs">Normal Activity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-destructive"></div>
                    <span className="text-xs">Anomalous Activity</span>
                  </div>
                </div>
              </div>

              <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData.loginData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const isAnomaly = payload[0].payload.anomaly
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="flex flex-col gap-2">
                                  <p className="text-sm font-medium">{new Date(label).toLocaleDateString()}</p>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${isAnomaly ? "bg-destructive" : "bg-primary"}`}
                                    />
                                    <p className="text-xs">Login Count: {payload[0].value}</p>
                                  </div>
                                  {isAnomaly && (
                                    <div className="flex items-center gap-2 text-destructive">
                                      <AlertTriangle className="h-3 w-3" />
                                      <p className="text-xs font-medium">Anomalous Activity</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="logins" name="Login Count">
                        {userData.loginData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.anomaly ? "#f43f5e" : "#0ea5e9"} />
                        ))}
                      </Bar>
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

            </TabsContent>
              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-medium">Anomaly Detection Settings</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="threshold">Anomaly Threshold</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="threshold"
                        defaultValue={[anomalyThreshold]}
                        max={100}
                        step={1}
                        onValueChange={(value) => setAnomalyThreshold(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right text-sm font-medium">{anomalyThreshold}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Detection Sensitivity</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select sensitivity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

            <TabsContent value="sessions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Session Analysis</h3>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 border-b p-3 font-medium">
                  <div>Session ID</div>
                  <div>Date & Time</div>
                  <div>Duration</div>
                  <div>Page Views</div>
                  <div>Transactions</div>
                  <div>Device</div>
                  <div>Location</div>
                </div>
                <div className="max-h-[400px] overflow-auto">
                  {userData.sessionData.map((session) => (
                    <div
                      key={session.sessionId}
                      className={`grid grid-cols-7 gap-4 border-b p-3 text-sm ${session.anomaly ? "bg-destructive/10" : ""}`}
                    >
                      <div>{session.sessionId}</div>
                      <div>{new Date(session.timestamp).toLocaleString()}</div>
                      <div>{session.duration} min</div>
                      <div>{session.pageViews}</div>
                      <div>{session.transactionAttempts}</div>
                      <div className="flex items-center">
                        {session.device === "mobile" ? (
                          <Smartphone className="mr-1 h-4 w-4" />
                        ) : (
                          <Laptop className="mr-1 h-4 w-4" />
                        )}
                        {session.device}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{session.location}</span>
                        {session.anomaly && (
                          <Badge variant="destructive" className="ml-2">
                            Anomaly
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Session Duration Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { range: "0-5 min", count: userData.sessionData.filter((s) => s.duration <= 5).length },
                              {
                                range: "5-10 min",
                                count: userData.sessionData.filter((s) => s.duration > 5 && s.duration <= 10).length,
                              },
                              {
                                range: "10-15 min",
                                count: userData.sessionData.filter((s) => s.duration > 10 && s.duration <= 15).length,
                              },
                              {
                                range: "15-20 min",
                                count: userData.sessionData.filter((s) => s.duration > 15 && s.duration <= 20).length,
                              },
                              { range: "20+ min", count: userData.sessionData.filter((s) => s.duration > 20).length },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="range" className="text-xs fill-muted-foreground" />
                            <YAxis className="text-xs fill-muted-foreground" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#0ea5e9" name="Sessions" />
                            <Legend />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Transaction Attempts vs. Page Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                              type="number"
                              dataKey="pageViews"
                              name="Page Views"
                              className="text-xs fill-muted-foreground"
                            />
                            <YAxis
                              type="number"
                              dataKey="transactionAttempts"
                              name="Transaction Attempts"
                              className="text-xs fill-muted-foreground"
                            />
                            <Tooltip
                              cursor={{ strokeDasharray: "3 3" }}
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload
                                  return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                      <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">Session {data.sessionId}</p>
                                        <div className="flex items-center gap-2">
                                          <div className="h-2 w-2 rounded-full bg-primary" />
                                          <p className="text-xs">Page Views: {data.pageViews}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="h-2 w-2 rounded-full bg-primary" />
                                          <p className="text-xs">Transaction Attempts: {data.transactionAttempts}</p>
                                        </div>
                                        {data.anomaly && (
                                          <div className="flex items-center gap-2 text-destructive">
                                            <AlertTriangle className="h-3 w-3" />
                                            <p className="text-xs font-medium">Anomalous Pattern</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                }
                                return null
                              }}
                            />
                            <Scatter name="Sessions" data={userData.sessionData}>
                              {userData.sessionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.anomaly ? "#f43f5e" : "#0ea5e9"} />
                              ))}
                            </Scatter>
                            <Legend />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="biometrics" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Behavioral Biometrics</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-xs">Normal Behavior</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-destructive"></div>
                    <span className="text-xs">Anomalous Behavior</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Typing Speed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={userData.biometricsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="id" className="text-xs fill-muted-foreground" />
                            <YAxis className="text-xs fill-muted-foreground" />
                            <Tooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload
                                  return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                      <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">Sample #{data.id}</p>
                                        <div className="flex items-center gap-2">
                                          <div
                                            className={`h-2 w-2 rounded-full ${data.anomaly ? "bg-destructive" : "bg-primary"}`}
                                          />
                                          <p className="text-xs">Typing Speed: {data.typingSpeed} WPM</p>
                                        </div>
                                        {data.anomaly && (
                                          <div className="flex items-center gap-2 text-destructive">
                                            <AlertTriangle className="h-3 w-3" />
                                            <p className="text-xs font-medium">Anomalous Pattern</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                }
                                return null
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="typingSpeed"
                              name="Typing Speed (WPM)"
                              stroke="#0ea5e9"
                              dot={(props: DotProps) => {
                                const { cx, cy, payload } = props
                                if (!cx || !cy) return <circle cx={0} cy={0} r={0} />
                                const isAnomaly = payload.anomaly
                                return (
                                  <circle
                                    cx={cx}
                                    cy={cy}
                                    r={isAnomaly ? 4 : 2}
                                    fill={isAnomaly ? "#f43f5e" : "#0ea5e9"}
                                  />
                                )
                              }}
                            />
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Mouse Movement Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                              type="number"
                              dataKey="typingSpeed"
                              name="Typing Speed"
                              className="text-xs fill-muted-foreground"
                            />
                            <YAxis
                              type="number"
                              dataKey="mouseSpeed"
                              name="Mouse Speed"
                              className="text-xs fill-muted-foreground"
                            />
                            <Tooltip
                              cursor={{ strokeDasharray: "3 3" }}
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0].payload
                                  return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                      <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium">Biometric Sample</p>
                                        <div className="flex items-center gap-2">
                                          <div className="h-2 w-2 rounded-full bg-primary" />
                                          <p className="text-xs">Typing Speed: {data.typingSpeed} WPM</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <div className="h-2 w-2 rounded-full bg-primary" />
                                          <p className="text-xs">Mouse Speed: {data.mouseSpeed} px/s</p>
                                        </div>
                                        {data.anomaly && (
                                          <div className="flex items-center gap-2 text-destructive">
                                            <AlertTriangle className="h-3 w-3" />
                                            <p className="text-xs font-medium">Anomalous Pattern</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                }
                                return null
                              }}
                            />
                            <Scatter name="Biometrics" data={userData.biometricsData}>
                              {userData.biometricsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.anomaly ? "#f43f5e" : "#0ea5e9"} />
                              ))}
                            </Scatter>
                            <Legend />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Behavioral Pattern Analysis</CardTitle>
                  <CardDescription>Comparison of current behavior with historical patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-md border p-3">
                        <div className="text-sm font-medium text-muted-foreground">Typing Rhythm</div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-lg font-bold">87%</span>
                          <Badge variant={userData.user.riskScore > anomalyThreshold ? "destructive" : "outline"}>
                            {userData.user.riskScore > anomalyThreshold ? "Mismatch" : "Match"}
                          </Badge>
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm font-medium text-muted-foreground">Navigation Pattern</div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-lg font-bold">62%</span>
                          <Badge variant={userData.user.riskScore > anomalyThreshold ? "destructive" : "outline"}>
                            {userData.user.riskScore > anomalyThreshold ? "Mismatch" : "Match"}
                          </Badge>
                        </div>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="text-sm font-medium text-muted-foreground">Form Filling</div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-lg font-bold">91%</span>
                          <Badge variant="outline">Match</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <MousePointer className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Mouse Movement Heatmap</div>
                          <div className="text-xs text-muted-foreground">
                            Visual representation of mouse movement patterns
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Maximize2 className="mr-2 h-4 w-4" />
                        View Heatmap
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Login Location Analysis</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-xs">Normal Location</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-destructive"></div>
                    <span className="text-xs">Suspicious Location</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-3 gap-4 border-b p-3 font-medium">
                  <div>Date</div>
                  <div>Location</div>
                  <div>Status</div>
                </div>
                <div className="max-h-[300px] overflow-auto">
                  {userData.locationData.map((entry, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-3 gap-4 border-b p-3 text-sm ${entry.anomaly ? "bg-destructive/10" : ""}`}
                    >
                      <div>{new Date(entry.date).toLocaleDateString()}</div>
                      <div>{entry.location}</div>
                      <div>
                        {entry.anomaly ? (
                          <Badge variant="destructive">Suspicious</Badge>
                        ) : (
                          <Badge variant="outline">Normal</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Location Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-md border p-3">
                      <div className="text-sm font-medium">Unusual Location Changes</div>
                      <div className="mt-2">
                        {userData.user.riskScore > anomalyThreshold ? (
                          <div className="flex items-start gap-2 text-destructive">
                            <AlertTriangle className="mt-0.5 h-4 w-4" />
                            <div>
                              <p className="text-sm font-medium">Rapid location change detected</p>
                              <p className="text-xs">Login from New York, US followed by Moscow, RU within 2 hours</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2 text-primary">
                            <UserCheck className="mt-0.5 h-4 w-4" />
                            <div>
                              <p className="text-sm font-medium">No unusual location changes</p>
                              <p className="text-xs">All logins from expected locations</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-md border p-3">
                      <div className="text-sm font-medium">IP Address Analysis</div>
                      <div className="mt-2">
                        {userData.user.riskScore > anomalyThreshold ? (
                          <div className="flex items-start gap-2 text-destructive">
                            <AlertTriangle className="mt-0.5 h-4 w-4" />
                            <div>
                              <p className="text-sm font-medium">Suspicious IP addresses detected</p>
                              <p className="text-xs">3 logins from known proxy/VPN IP addresses</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start gap-2 text-primary">
                            <UserCheck className="mt-0.5 h-4 w-4" />
                            <div>
                              <p className="text-sm font-medium">Clean IP reputation</p>
                              <p className="text-xs">No suspicious IP addresses detected</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Travel Velocity Analysis</div>
                      {userData.user.riskScore > anomalyThreshold && (
                        <Badge variant="destructive">Impossible Travel</Badge>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">
                        Analyzes the physical possibility of a user's login locations based on the time between logins and
                        the distance between locations.
                      </p>
                      {userData.user.riskScore > anomalyThreshold ? (
                        <div className="mt-2 text-xs text-destructive">
                          User logged in from New York, US and Beijing, CN within 3 hours - physically impossible travel.
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-primary">
                          All login location changes are physically possible given the time between logins.
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }
