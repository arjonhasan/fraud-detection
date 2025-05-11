"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Download,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Mail,
  Calendar,
  Star,
  Share2,
  Copy,
  Printer,
  BarChart,
} from "lucide-react"

export function ReportActions() {
  const [showExportDialog, setShowExportDialog] = React.useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = React.useState(false)
  const [showSaveDialog, setShowSaveDialog] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Export Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span>Export as Excel</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <FilePdf className="mr-2 h-4 w-4" />
            <span>Export as PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <Copy className="mr-2 h-4 w-4" />
            <span>Export as CSV</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <Printer className="mr-2 h-4 w-4" />
            <span>Print Report</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" onClick={() => setShowScheduleDialog(true)}>
        <Calendar className="mr-2 h-4 w-4" />
        Schedule
      </Button>

      <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
        <Star className="mr-2 h-4 w-4" />
        Save
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Report Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>Email Report</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share Report</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <BarChart className="mr-2 h-4 w-4" />
            <span>Create Custom Report</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export Report</DialogTitle>
            <DialogDescription>Configure your export options below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="export-name" className="col-span-4">
                Report Name
              </Label>
              <Input id="export-name" defaultValue="Fraud Detection Report" className="col-span-4" />
            </div>
            <div className="grid gap-2">
              <Label>Include Sections</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="metrics" defaultChecked />
                <Label htmlFor="metrics" className="font-normal">
                  Metrics Overview
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="charts" defaultChecked />
                <Label htmlFor="charts" className="font-normal">
                  Charts & Visualizations
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="table" defaultChecked />
                <Label htmlFor="table" className="font-normal">
                  Detailed Data Table
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowExportDialog(false)}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>Set up automated report delivery.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule-name" className="col-span-4">
                Schedule Name
              </Label>
              <Input id="schedule-name" defaultValue="Weekly Fraud Report" className="col-span-4" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="col-span-4">
                Frequency
              </Label>
              <select
                id="frequency"
                className="col-span-4 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="daily">Daily</option>
                <option value="weekly" selected>
                  Weekly
                </option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipients" className="col-span-4">
                Recipients (comma separated)
              </Label>
              <Input id="recipients" placeholder="email@example.com" className="col-span-4" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowScheduleDialog(false)}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Report</DialogTitle>
            <DialogDescription>Save this report for future reference.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="report-name" className="col-span-4">
                Report Name
              </Label>
              <Input id="report-name" defaultValue="Fraud Detection Report" className="col-span-4" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="col-span-4">
                Description
              </Label>
              <Input id="description" placeholder="Brief description of this report" className="col-span-4" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="favorite" />
              <Label htmlFor="favorite" className="font-normal">
                Add to favorites
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowSaveDialog(false)}>Save Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
