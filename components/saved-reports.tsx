"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, StarOff, MoreHorizontal, Calendar, FileText, BarChart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const savedReports = [
  {
    id: 1,
    name: "Monthly Fraud Overview",
    description: "Comprehensive overview of fraud metrics for the current month",
    created: "2023-04-15",
    type: "Dashboard",
    favorite: true,
  },
  {
    id: 2,
    name: "High-Risk Transactions",
    description: "Analysis of transactions flagged as high-risk",
    created: "2023-05-02",
    type: "Custom",
    favorite: true,
  },
  {
    id: 3,
    name: "Regional Fraud Comparison",
    description: "Comparison of fraud patterns across different regions",
    created: "2023-05-10",
    type: "Geographic",
    favorite: false,
  },
  {
    id: 4,
    name: "Fraud by Transaction Type",
    description: "Breakdown of fraud incidents by transaction type",
    created: "2023-05-18",
    type: "Custom",
    favorite: false,
  },
  {
    id: 5,
    name: "Quarterly Executive Summary",
    description: "Executive-level summary of fraud metrics for Q1 2023",
    created: "2023-04-01",
    type: "Dashboard",
    favorite: true,
  },
]

export function SavedReports() {
  const [reports, setReports] = React.useState(savedReports)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFavorite = (id: number) => {
    setReports(reports.map((report) => (report.id === id ? { ...report, favorite: !report.favorite } : report)))
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "Dashboard":
        return <BarChart className="h-5 w-5 text-primary" />
      case "Geographic":
        return <Calendar className="h-5 w-5 text-primary" />
      case "Custom":
        return <FileText className="h-5 w-5 text-primary" />
      default:
        return <FileText className="h-5 w-5 text-primary" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Saved Reports</CardTitle>
            <CardDescription>Access your saved and favorite reports</CardDescription>
          </div>
          <Button>Create New Report</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">No reports found</p>
              </div>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">{getIconForType(report.type)}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{report.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => toggleFavorite(report.id)}
                        >
                          {report.favorite ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Created: {report.created}</span>
                        <span>•</span>
                        <span>Type: {report.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
