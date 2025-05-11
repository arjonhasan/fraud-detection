"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowDown, ArrowUp, DollarSign, ShieldAlert, UserX } from "lucide-react"

export function FraudMetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Fraud Attempts</CardTitle>
          <ShieldAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,853</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              +12.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fraud Loss Amount</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$42,389</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              +8.2%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prevented Fraud</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,463</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowUp className="mr-1 h-4 w-4" />
              +18.7%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flagged Accounts</CardTitle>
          <UserX className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">342</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 flex items-center">
              <ArrowDown className="mr-1 h-4 w-4" />
              -4.3%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
