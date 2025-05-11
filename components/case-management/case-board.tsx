"use client"

import * as React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,  
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertTriangle,
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  User,
  FileText,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Types for case management
type CasePriority = "low" | "medium" | "high" | "critical"
type CaseStatus = "new" | "investigating" | "pending" | "resolved" | "closed"
type CaseResolution = "confirmed_fraud" | "false_positive" | "recovered" | "unresolved" | null

interface FraudCase {
  id: string
  title: string
  description: string
  transactionId?: string
  amount?: number
  customerId?: string
  customerName?: string
  customerEmail?: string
  dateCreated: string
  dateUpdated: string
  priority: CasePriority
  status: CaseStatus
  resolution: CaseResolution
  assignedTo?: string
  assignedToName?: string
  assignedToAvatar?: string
  tags: string[]
  commentCount: number
  attachmentCount: number
  dueDate?: string
  slaStatus?: "on_track" | "at_risk" | "breached"
}

// Sample data for case management
const initialCases: FraudCase[] = [
  {
    id: "CASE-001",
    title: "Suspicious transaction pattern detected",
    description: "Multiple high-value transactions from different locations within short time period",
    transactionId: "TRX-29384",
    amount: 2500,
    customerId: "CUST-5839",
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    dateCreated: "2023-05-10T09:30:00",
    dateUpdated: "2023-05-10T14:45:00",
    priority: "high",
    status: "new",
    resolution: null,
    assignedTo: "user1",
    assignedToName: "Sarah Connor",
    assignedToAvatar: "/placeholder-user.jpg",
    tags: ["suspicious-pattern", "high-value"],
    commentCount: 3,
    attachmentCount: 2,
    dueDate: "2023-05-12T17:00:00",
    slaStatus: "on_track",
  },
  {
    id: "CASE-002",
    title: "Account takeover attempt",
    description: "Multiple failed login attempts followed by password reset from unrecognized device",
    customerId: "CUST-7291",
    customerName: "Emily Johnson",
    customerEmail: "emily.j@example.com",
    dateCreated: "2023-05-09T16:20:00",
    dateUpdated: "2023-05-10T11:30:00",
    priority: "critical",
    status: "investigating",
    resolution: null,
    assignedTo: "user2",
    assignedToName: "Michael Chen",
    assignedToAvatar: "/placeholder-user.jpg",
    tags: ["account-security", "login-attempt"],
    commentCount: 5,
    attachmentCount: 1,
    dueDate: "2023-05-11T12:00:00",
    slaStatus: "at_risk",
  },
  {
    id: "CASE-003",
    title: "Potential synthetic identity",
    description: "New account with mismatched identity verification documents",
    customerId: "CUST-9382",
    customerName: "Robert Williams",
    customerEmail: "robert.w@example.com",
    dateCreated: "2023-05-08T10:15:00",
    dateUpdated: "2023-05-10T09:20:00",
    priority: "medium",
    status: "investigating",
    resolution: null,
    assignedTo: "user3",
    assignedToName: "Jessica Taylor",
    assignedToAvatar: "/placeholder-user.jpg",
    tags: ["identity-verification", "new-account"],
    commentCount: 7,
    attachmentCount: 4,
    dueDate: "2023-05-15T17:00:00",
    slaStatus: "on_track",
  },
  {
    id: "CASE-004",
    title: "Chargeback dispute",
    description: "Customer claiming unauthorized transaction, but device fingerprint matches previous purchases",
    transactionId: "TRX-38291",
    amount: 899.99,
    customerId: "CUST-2938",
    customerName: "David Miller",
    customerEmail: "david.m@example.com",
    dateCreated: "2023-05-07T14:30:00",
    dateUpdated: "2023-05-10T10:45:00",
    priority: "medium",
    status: "pending",
    resolution: null,
    assignedTo: "user1",
    assignedToName: "Sarah Connor",
    assignedToAvatar: "/placeholder-user.jpg",
    tags: ["chargeback", "dispute"],
    commentCount: 8,
    attachmentCount: 3,
    dueDate: "2023-05-17T17:00:00",
    slaStatus: "on_track",
  },
  {
    id: "CASE-005",
    title: "Unusual withdrawal pattern",
    description: "Multiple ATM withdrawals in different countries within 24 hours",
    amount: 3500,
    customerId: "CUST-6291",
    customerName: "Lisa Wong",
    customerEmail: "lisa.w@example.com",
    dateCreated: "2023-05-06T09:45:00",
    dateUpdated: "2023-05-10T16:30:00",
    priority: "high",
    status: "resolved",
    resolution: "confirmed_fraud",
    assignedTo: "user2",
    assignedToName: "Michael Chen",
    assignedToAvatar: "/placeholder-user.jpg",
    tags: ["atm-withdrawal", "geo-suspicious"],
    commentCount: 12,
    attachmentCount: 5,
    slaStatus: "on_track",
  },
  {
    id: "CASE-006",
    title: "Potential ATO - Password Reset",
    description: "Password reset from unrecognized device and location",
    customerId: "CUST-4827",
    customerName: "Thomas Anderson",
    customerEmail: "thomas.a@example.com",
    dateCreated: "2023-05-10T08:15:00",
    dateUpdated: "2023-05-10T15:20:00",
    priority: "critical",
    status: "new",
    resolution: null,
    tags: ["account-security", "password-reset"],
    commentCount: 1,
    attachmentCount: 0,
    dueDate: "2023-05-11T17:00:00",
    slaStatus: "at_risk",
  },
  {
    id: "CASE-007",
    title: "False positive investigation",
    description: "Transaction flagged but customer confirmed legitimacy",
    transactionId: "TRX-73921",
    amount: 1299.99,
    customerId: "CUST-3827",
    customerName: "Jennifer Lopez",
    customerEmail: "jennifer.l@example.com",
    dateCreated: "2023-05-09T11:30:00",
    dateUpdated: "2023-05-10T13:45:00",
    priority: "low",
    status: "resolved",
    resolution: "false_positive",
    assignedTo: "user3",
    assignedToName: "Jessica Taylor",
    assignedToAvatar: "/placeholder-user.jpg",
    tags: ["false-positive", "customer-confirmed"],
    commentCount: 4,
    attachmentCount: 1,
    slaStatus: "on_track",
  },
  {
    id: "CASE-008",
    title: "Merchant fraud investigation",
    description: "Multiple customers reporting unauthorized charges from same merchant",
    dateCreated: "2023-05-08T14:20:00",
    dateUpdated: "2023-05-10T11:15:00",
    priority: "high",
    status: "pending",
    resolution: null,
    assignedTo: "user1",
    assignedToName: "Sarah Connor",
    assignedToAvatar: "/placeholder-user.jpg",
    tags: ["merchant-fraud", "multiple-reports"],
    commentCount: 9,
    attachmentCount: 6,
    dueDate: "2023-05-13T17:00:00",
    slaStatus: "on_track",
  },
]

// Group cases by status
const groupCasesByStatus = (cases: FraudCase[]) => {
  const grouped: Record<CaseStatus, FraudCase[]> = {
    new: [],
    investigating: [],
    pending: [],
    resolved: [],
    closed: [],
  }

  cases.forEach((case_) => {
    grouped[case_.status].push(case_)
  })

  return grouped
}

export function CaseBoard() {
  const [cases, setCases] = React.useState<FraudCase[]>(initialCases)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredCases, setFilteredCases] = React.useState<FraudCase[]>(cases)
  const [groupedCases, setGroupedCases] = React.useState<Record<CaseStatus, FraudCase[]>>(groupCasesByStatus(cases))

  // Filter cases based on search query
  React.useEffect(() => {
    const filtered = cases.filter(
      (case_) =>
        case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.transactionId?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredCases(filtered)
    setGroupedCases(groupCasesByStatus(filtered))
  }, [cases, searchQuery])

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back in its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the case that was dragged
    const draggedCase = cases.find((case_) => case_.id === draggableId)
    if (!draggedCase) return

    // Create a new array of cases with the dragged case removed
    const newCases = cases.filter((case_) => case_.id !== draggableId)

    // Update the status of the dragged case
    const updatedCase = {
      ...draggedCase,
      status: destination.droppableId as CaseStatus,
      dateUpdated: new Date().toISOString(),
    }

    // Add the updated case back to the array
    newCases.push(updatedCase)

    // Update state
    setCases(newCases)
  }

  // Get priority badge variant
  const getPriorityBadge = (priority: CasePriority) => {
    switch (priority) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "high":
        return (
          <Badge variant="destructive" className="bg-orange-500">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  // Get SLA status indicator
  const getSlaIndicator = (slaStatus: string | undefined) => {
    if (!slaStatus) return null

    switch (slaStatus) {
      case "on_track":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            On Track
          </Badge>
        )
      case "at_risk":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            At Risk
          </Badge>
        )
      case "breached":
        return <Badge variant="destructive">SLA Breached</Badge>
      default:
        return null
    }
  }

  // Get resolution badge
  const getResolutionBadge = (resolution: CaseResolution) => {
    if (!resolution) return null

    switch (resolution) {
      case "confirmed_fraud":
        return <Badge variant="destructive">Confirmed Fraud</Badge>
      case "false_positive":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            False Positive
          </Badge>
        )
      case "recovered":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Recovered
          </Badge>
        )
      case "unresolved":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Unresolved
          </Badge>
        )
      default:
        return null
    }
  }

  // Column titles and icons
  const columnConfig = {
    new: { title: "New Cases", icon: <AlertCircle className="h-5 w-5 text-blue-500" /> },
    investigating: { title: "Investigating", icon: <Search className="h-5 w-5 text-yellow-500" /> },
    pending: { title: "Pending Action", icon: <Clock className="h-5 w-5 text-orange-500" /> },
    resolved: { title: "Resolved", icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
    closed: { title: "Closed", icon: <XCircle className="h-5 w-5 text-gray-500" /> },
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases by ID, customer, or transaction..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {Object.entries(groupedCases).map(([status, statusCases]) => (
            <div key={status} className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {columnConfig[status].icon}
                  <h3 className="font-medium">{columnConfig[status].title}</h3>
                  <Badge variant="secondary">{statusCases.length}</Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-1 flex-col gap-2 rounded-lg border border-dashed p-2"
                  >
                    {statusCases.map((case_, index) => (
                      <Draggable key={case_.id} draggableId={case_.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Card className="mb-2">
                              <CardHeader className="p-3 pb-0">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <CardTitle className="text-sm">{case_.title}</CardTitle>
                                    <CardDescription className="mt-1 line-clamp-2 text-xs">
                                      {case_.description}
                                    </CardDescription>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuItem>Assign Case</DropdownMenuItem>
                                      <DropdownMenuItem>Add Comment</DropdownMenuItem>
                                      <DropdownMenuItem>Add Attachment</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>Change Status</DropdownMenuItem>
                                      <DropdownMenuItem>Change Priority</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <div className="mb-2 flex flex-wrap gap-1">
                                  {getPriorityBadge(case_.priority)}
                                  {case_.resolution && getResolutionBadge(case_.resolution)}
                                  {case_.slaStatus && getSlaIndicator(case_.slaStatus)}
                                </div>
                                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span>Case {case_.id}</span>
                                  </div>
                                  {case_.amount && (
                                    <div className="flex items-center gap-1">
                                      <span>${case_.amount.toLocaleString()}</span>
                                    </div>
                                  )}
                                </div>
                                {case_.customerName && (
                                  <div className="mb-2 flex items-center gap-1 text-xs">
                                    <User className="h-3 w-3 text-muted-foreground" />
                                    <span>{case_.customerName}</span>
                                  </div>
                                )}
                                {case_.dueDate && (
                                  <div className="mb-2 flex items-center gap-1 text-xs">
                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                    <span>Due: {new Date(case_.dueDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                              </CardContent>
                              <CardFooter className="flex items-center justify-between p-3 pt-0">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <MessageSquare className="h-3 w-3" />
                                    <span>{case_.commentCount}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    <span>{case_.attachmentCount}</span>
                                  </div>
                                </div>
                                {case_.assignedTo && (
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={case_.assignedToAvatar || "/placeholder.svg"}
                                      alt={case_.assignedToName}
                                    />
                                    <AvatarFallback>
                                      {case_.assignedToName
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </CardFooter>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {statusCases.length === 0 && (
                      <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                        <p className="text-sm text-muted-foreground">No cases</p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
