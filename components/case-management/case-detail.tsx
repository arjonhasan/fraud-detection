"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Edit,
  FileText,
  Link2,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  Send,
  User,
  UserPlus,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Sample case data
const caseData = {
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
  status: "investigating",
  resolution: null,
  assignedTo: "user1",
  assignedToName: "Sarah Connor",
  assignedToAvatar: "/placeholder-user.jpg",
  tags: ["suspicious-pattern", "high-value"],
  dueDate: "2023-05-12T17:00:00",
  slaStatus: "on_track",
  relatedCases: ["CASE-045", "CASE-067"],
  riskScore: 85,
}

// Sample timeline data
const timelineData = [
  {
    id: 1,
    type: "case_created",
    timestamp: "2023-05-10T09:30:00",
    user: "System",
    userAvatar: null,
    content: "Case created automatically from fraud detection alert",
    metadata: {
      alertId: "ALERT-5839",
      riskScore: 85,
    },
  },
  {
    id: 2,
    type: "case_assigned",
    timestamp: "2023-05-10T09:45:00",
    user: "Michael Chen",
    userAvatar: "/placeholder-user.jpg",
    content: "Case assigned to Sarah Connor",
    metadata: {
      assignedTo: "Sarah Connor",
    },
  },
  {
    id: 3,
    type: "status_change",
    timestamp: "2023-05-10T10:15:00",
    user: "Sarah Connor",
    userAvatar: "/placeholder-user.jpg",
    content: "Status changed from New to Investigating",
    metadata: {
      oldStatus: "new",
      newStatus: "investigating",
    },
  },
  {
    id: 4,
    type: "comment",
    timestamp: "2023-05-10T10:30:00",
    user: "Sarah Connor",
    userAvatar: "/placeholder-user.jpg",
    content: "Reviewing transaction history for the past 30 days to identify patterns",
    metadata: {},
  },
  {
    id: 5,
    type: "attachment",
    timestamp: "2023-05-10T11:15:00",
    user: "Sarah Connor",
    userAvatar: "/placeholder-user.jpg",
    content: "Added transaction history report",
    metadata: {
      fileName: "transaction_history_30d.pdf",
      fileSize: "1.2 MB",
    },
  },
  {
    id: 6,
    type: "comment",
    timestamp: "2023-05-10T13:45:00",
    user: "Sarah Connor",
    userAvatar: "/placeholder-user.jpg",
    content:
      "Customer has been contacted via phone. They confirmed they were traveling but denied making some of the transactions. Proceeding with transaction reversal and card block.",
    metadata: {},
  },
  {
    id: 7,
    type: "action",
    timestamp: "2023-05-10T14:00:00",
    user: "Sarah Connor",
    userAvatar: "/placeholder-user.jpg",
    content: "Card blocked and replacement ordered",
    metadata: {
      actionType: "card_block",
      cardId: "CARD-8293",
    },
  },
  {
    id: 8,
    type: "attachment",
    timestamp: "2023-05-10T14:30:00",
    user: "Sarah Connor",
    userAvatar: "/placeholder-user.jpg",
    content: "Added customer communication log",
    metadata: {
      fileName: "customer_communication_log.pdf",
      fileSize: "0.8 MB",
    },
  },
]

// Sample customer data
const customerData = {
  id: "CUST-5839",
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  accountCreated: "2020-03-15T10:30:00",
  accountStatus: "active",
  riskScore: 45,
  previousCases: 2,
  recentActivity: [
    {
      id: "ACT-001",
      type: "login",
      timestamp: "2023-05-09T18:30:00",
      details: "Login from new device (iPhone) in New York, NY",
    },
    {
      id: "ACT-002",
      type: "transaction",
      timestamp: "2023-05-09T19:15:00",
      details: "Purchase of $899.99 at Electronics Store",
    },
    {
      id: "ACT-003",
      type: "transaction",
      timestamp: "2023-05-10T08:45:00",
      details: "Purchase of $1,200.00 at Jewelry Store",
    },
    {
      id: "ACT-004",
      type: "transaction",
      timestamp: "2023-05-10T09:20:00",
      details: "Purchase of $400.00 at Department Store",
    },
  ],
}

// Sample transaction data
const transactionData = {
  id: "TRX-29384",
  amount: 2500,
  currency: "USD",
  timestamp: "2023-05-10T08:30:00",
  status: "completed",
  type: "purchase",
  merchant: {
    id: "MERCH-8293",
    name: "Luxury Goods Inc.",
    category: "Retail",
    location: "Miami, FL",
  },
  paymentMethod: {
    type: "credit_card",
    last4: "4567",
    expiryDate: "05/25",
    issuer: "Visa",
  },
  device: {
    type: "mobile",
    ip: "203.0.113.1",
    location: "Miami, FL",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X)",
  },
  riskScore: 85,
  riskFactors: [
    "Unusual location",
    "High-value transaction",
    "Recent account changes",
    "Multiple transactions in short period",
  ],
}

export function CaseDetail() {
  const router = useRouter()
  const [newComment, setNewComment] = React.useState("")
  const [showResolveDialog, setShowResolveDialog] = React.useState(false)

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy h:mm a")
  }

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
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

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            New
          </Badge>
        )
      case "investigating":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Investigating
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            Pending
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Resolved
          </Badge>
        )
      case "closed":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get SLA status indicator
  const getSlaIndicator = (slaStatus: string) => {
    switch (slaStatus) {
      case "on_track":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            SLA On Track
          </Badge>
        )
      case "at_risk":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            SLA At Risk
          </Badge>
        )
      case "breached":
        return <Badge variant="destructive">SLA Breached</Badge>
      default:
        return null
    }
  }

  // Get timeline item icon
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "case_created":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "case_assigned":
        return <UserPlus className="h-4 w-4 text-blue-500" />
      case "status_change":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-gray-500" />
      case "attachment":
        return <Paperclip className="h-4 w-4 text-gray-500" />
      case "action":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "resolution":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      // In a real app, this would send the comment to the server
      console.log("Submitting comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cases
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowResolveDialog(true)}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Resolve
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Case Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Reassign Case
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                Change Status
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Change Priority
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link2 className="mr-2 h-4 w-4" />
                Link Related Case
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Paperclip className="mr-2 h-4 w-4" />
                Add Attachment
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <XCircle className="mr-2 h-4 w-4" />
                Close Case
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{caseData.title}</h2>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10">
                    Case {caseData.id}
                  </Badge>
                  {getPriorityBadge(caseData.priority)}
                  {getStatusBadge(caseData.status)}
                  {getSlaIndicator(caseData.slaStatus)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">{caseData.description}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-medium">Case Details</h3>
                    <dl className="grid grid-cols-2 gap-1 text-sm">
                      <dt className="text-muted-foreground">Created</dt>
                      <dd>{formatDate(caseData.dateCreated)}</dd>
                      <dt className="text-muted-foreground">Updated</dt>
                      <dd>{formatDate(caseData.dateUpdated)}</dd>
                      <dt className="text-muted-foreground">Due Date</dt>
                      <dd>{formatDate(caseData.dueDate)}</dd>
                      <dt className="text-muted-foreground">Risk Score</dt>
                      <dd className="font-medium text-destructive">{caseData.riskScore}/100</dd>
                    </dl>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Assignment</h3>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={caseData.assignedToAvatar || "/placeholder.svg"}
                          alt={caseData.assignedToName}
                        />
                        <AvatarFallback>
                          {caseData.assignedToName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{caseData.assignedToName}</p>
                        <p className="text-xs text-muted-foreground">Fraud Analyst</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="mb-1 text-sm font-medium">Related Cases</h4>
                      <div className="flex flex-wrap gap-1">
                        {caseData.relatedCases.map((caseId) => (
                          <Badge key={caseId} variant="outline" className="cursor-pointer hover:bg-accent">
                            {caseId}
                          </Badge>
                        ))}
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Plus className="mr-1 h-3 w-3" />
                          <span className="text-xs">Add</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="timeline" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="transaction">Transaction</TabsTrigger>
                    <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline" className="space-y-4">
                    <div className="mt-4 space-y-4">
                      {timelineData.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                            {getTimelineIcon(item.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {item.userAvatar ? (
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={item.userAvatar || "/placeholder.svg"} alt={item.user} />
                                    <AvatarFallback>{item.user[0]}</AvatarFallback>
                                  </Avatar>
                                ) : null}
                                <span className="text-sm font-medium">{item.user}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</span>
                            </div>
                            <p className="mt-1 text-sm">{item.content}</p>
                            {item.type === "attachment" && (
                              <div className="mt-2 flex items-center gap-2 rounded-md border p-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1">
                                  <p className="text-xs font-medium">{item.metadata.fileName}</p>
                                  <p className="text-xs text-muted-foreground">{item.metadata.fileSize}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-7 px-2">
                                  Download
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" alt="Current User" />
                        <AvatarFallback>CU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Add a comment..."
                          className="mb-2"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm">
                            <Paperclip className="mr-2 h-4 w-4" />
                            Attach
                          </Button>
                          <Button size="sm" onClick={handleCommentSubmit}>
                            <Send className="mr-2 h-4 w-4" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="customer">
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {customerData.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{customerData.name}</h3>
                            <p className="text-sm text-muted-foreground">Customer ID: {customerData.id}</p>
                          </div>
                        </div>
                        <Badge variant={customerData.riskScore > 70 ? "destructive" : "outline"}>
                          Risk Score: {customerData.riskScore}/100
                        </Badge>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Contact Information</h4>
                          <dl className="grid grid-cols-2 gap-1 text-sm">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>{customerData.email}</dd>
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>{customerData.phone}</dd>
                            <dt className="text-muted-foreground">Address</dt>
                            <dd>{customerData.address}</dd>
                          </dl>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Account Information</h4>
                          <dl className="grid grid-cols-2 gap-1 text-sm">
                            <dt className="text-muted-foreground">Account Created</dt>
                            <dd>{formatDate(customerData.accountCreated)}</dd>
                            <dt className="text-muted-foreground">Account Status</dt>
                            <dd className="capitalize">{customerData.accountStatus}</dd>
                            <dt className="text-muted-foreground">Previous Cases</dt>
                            <dd>{customerData.previousCases}</dd>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-medium">Recent Activity</h4>
                        <div className="rounded-md border">
                          {customerData.recentActivity.map((activity, index) => (
                            <div
                              key={activity.id}
                              className={`flex items-center justify-between p-2 text-sm ${
                                index !== customerData.recentActivity.length - 1 ? "border-b" : ""
                              }`}
                            >
                              <div>
                                <p>{activity.details}</p>
                                <p className="text-xs text-muted-foreground">
                                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground">{formatDate(activity.timestamp)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="transaction">
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Transaction Details</h3>
                          <p className="text-sm text-muted-foreground">Transaction ID: {transactionData.id}</p>
                        </div>
                        <Badge variant={transactionData.riskScore > 70 ? "destructive" : "outline"}>
                          Risk Score: {transactionData.riskScore}/100
                        </Badge>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Transaction Information</h4>
                          <dl className="grid grid-cols-2 gap-1 text-sm">
                            <dt className="text-muted-foreground">Amount</dt>
                            <dd>${transactionData.amount.toLocaleString()}</dd>
                            <dt className="text-muted-foreground">Currency</dt>
                            <dd>{transactionData.currency}</dd>
                            <dt className="text-muted-foreground">Date & Time</dt>
                            <dd>{formatDate(transactionData.timestamp)}</dd>
                            <dt className="text-muted-foreground">Status</dt>
                            <dd className="capitalize">{transactionData.status}</dd>
                            <dt className="text-muted-foreground">Type</dt>
                            <dd className="capitalize">{transactionData.type}</dd>
                          </dl>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Merchant Information</h4>
                          <dl className="grid grid-cols-2 gap-1 text-sm">
                            <dt className="text-muted-foreground">Name</dt>
                            <dd>{transactionData.merchant.name}</dd>
                            <dt className="text-muted-foreground">Category</dt>
                            <dd>{transactionData.merchant.category}</dd>
                            <dt className="text-muted-foreground">Location</dt>
                            <dd>{transactionData.merchant.location}</dd>
                          </dl>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Payment Method</h4>
                          <dl className="grid grid-cols-2 gap-1 text-sm">
                            <dt className="text-muted-foreground">Type</dt>
                            <dd className="capitalize">{transactionData.paymentMethod.type.replace("_", " ")}</dd>
                            <dt className="text-muted-foreground">Card Number</dt>
                            <dd>**** **** **** {transactionData.paymentMethod.last4}</dd>
                            <dt className="text-muted-foreground">Expiry Date</dt>
                            <dd>{transactionData.paymentMethod.expiryDate}</dd>
                            <dt className="text-muted-foreground">Issuer</dt>
                            <dd>{transactionData.paymentMethod.issuer}</dd>
                          </dl>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium">Device Information</h4>
                          <dl className="grid grid-cols-2 gap-1 text-sm">
                            <dt className="text-muted-foreground">Type</dt>
                            <dd className="capitalize">{transactionData.device.type}</dd>
                            <dt className="text-muted-foreground">IP Address</dt>
                            <dd>{transactionData.device.ip}</dd>
                            <dt className="text-muted-foreground">Location</dt>
                            <dd>{transactionData.device.location}</dd>
                          </dl>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-2 text-sm font-medium">Risk Factors</h4>
                        <div className="flex flex-wrap gap-1">
                          {transactionData.riskFactors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="bg-destructive/10">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="evidence">
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Evidence & Attachments</h3>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Evidence
                        </Button>
                      </div>

                      <div className="rounded-md border">
                        <div className="flex items-center justify-between border-b p-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">transaction_history_30d.pdf</p>
                              <p className="text-xs text-muted-foreground">1.2 MB • PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">Added May 10, 2023</p>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-b p-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">customer_communication_log.pdf</p>
                              <p className="text-xs text-muted-foreground">0.8 MB • PDF Document</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">Added May 10, 2023</p>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">device_fingerprint_report.json</p>
                              <p className="text-xs text-muted-foreground">0.3 MB • JSON File</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">Added May 10, 2023</p>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Case Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">Status</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Investigating</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 text-sm font-medium">Priority</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <span className="text-sm">High</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 text-sm font-medium">Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span>{formatDate(caseData.dateCreated)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span>{formatDate(caseData.dateUpdated)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Due Date</span>
                      <span>{formatDate(caseData.dueDate)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 text-sm font-medium">Assignment</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={caseData.assignedToAvatar || "/placeholder.svg"}
                        alt={caseData.assignedToName}
                      />
                      <AvatarFallback>
                        {caseData.assignedToName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{caseData.assignedToName}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 text-sm font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {caseData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 text-sm font-medium">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Contact Customer
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Block Card
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resolve Case Dialog */}
      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Resolve Case</DialogTitle>
            <DialogDescription>Provide resolution details for case {caseData.id}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="resolution-type">Resolution Type</Label>
              <Select defaultValue="confirmed_fraud">
                <SelectTrigger id="resolution-type">
                  <SelectValue placeholder="Select resolution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed_fraud">Confirmed Fraud</SelectItem>
                  <SelectItem value="false_positive">False Positive</SelectItem>
                  <SelectItem value="recovered">Recovered</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resolution-notes">Resolution Notes</Label>
              <Textarea
                id="resolution-notes"
                placeholder="Provide details about the resolution..."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label>Actions Taken</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="action-1" />
                  <label htmlFor="action-1" className="text-sm font-normal">
                    Card blocked and replacement issued
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="action-2" />
                  <label htmlFor="action-2" className="text-sm font-normal">
                    Customer notified
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="action-3" />
                  <label htmlFor="action-3" className="text-sm font-normal">
                    Transactions reversed
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="action-4" />
                  <label htmlFor="action-4" className="text-sm font-normal">
                    Account security measures enhanced
                  </label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Follow-up Required</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="follow-up" />
                <label htmlFor="follow-up" className="text-sm font-normal">
                  Schedule follow-up with customer
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResolveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowResolveDialog(false)}>Resolve Case</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
