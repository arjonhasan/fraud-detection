"use client"

import * as React from "react"
import { Check, Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

const fraudTypes = [
  { value: "all", label: "All Types" },
  { value: "identity-theft", label: "Identity Theft" },
  { value: "payment-fraud", label: "Payment Fraud" },
  { value: "account-takeover", label: "Account Takeover" },
  { value: "synthetic-identity", label: "Synthetic Identity" },
  { value: "chargeback", label: "Chargeback Fraud" },
]

const statuses = [
  { value: "all", label: "All Statuses" },
  { value: "confirmed", label: "Confirmed" },
  { value: "investigating", label: "Investigating" },
  { value: "flagged", label: "Flagged" },
  { value: "prevented", label: "Prevented" },
]

const regions = [
  { value: "all", label: "All Regions" },
  { value: "north-america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "south-america", label: "South America" },
  { value: "africa", label: "Africa" },
  { value: "australia", label: "Australia" },
]

export function FraudReportsFilters() {
  const [fraudType, setFraudType] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [region, setRegion] = React.useState("")

  const activeFilters = [
    fraudType && fraudTypes.find((t) => t.value === fraudType)?.label,
    status && statuses.find((s) => s.value === status)?.label,
    region && regions.find((r) => r.value === region)?.label,
  ].filter(Boolean)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            Fraud Type
            {fraudType && (
              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal lg:hidden">
                {fraudTypes.find((t) => t.value === fraudType)?.label}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search fraud type..." />
            <CommandList>
              <CommandEmpty>No fraud type found.</CommandEmpty>
              <CommandGroup>
                {fraudTypes.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(value) => {
                      setFraudType(value === fraudType ? "" : value)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", fraudType === type.value ? "opacity-100" : "opacity-0")} />
                    {type.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            Status
            {status && (
              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal lg:hidden">
                {statuses.find((s) => s.value === status)?.label}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((s) => (
                  <CommandItem
                    key={s.value}
                    value={s.value}
                    onSelect={(value) => {
                      setStatus(value === status ? "" : value)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", status === s.value ? "opacity-100" : "opacity-0")} />
                    {s.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            Region
            {region && (
              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal lg:hidden">
                {regions.find((r) => r.value === region)?.label}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search region..." />
            <CommandList>
              <CommandEmpty>No region found.</CommandEmpty>
              <CommandGroup>
                {regions.map((r) => (
                  <CommandItem
                    key={r.value}
                    value={r.value}
                    onSelect={(value) => {
                      setRegion(value === region ? "" : value)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", region === r.value ? "opacity-100" : "opacity-0")} />
                    {r.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {activeFilters.length > 0 && (
        <div className="hidden space-x-1 lg:flex">
          {activeFilters.map((filter, i) => (
            <Badge key={i} variant="secondary" className="rounded-sm px-1 font-normal">
              {filter}
            </Badge>
          ))}
        </div>
      )}

      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 lg:px-3"
          onClick={() => {
            setFraudType("")
            setStatus("")
            setRegion("")
          }}
        >
          Reset
        </Button>
      )}
    </div>
  )
}
