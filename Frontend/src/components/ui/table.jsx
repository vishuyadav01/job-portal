import * as React from "react"
import { cn } from "@/lib/utils"

/* Wrapper handles horizontal scrolling on small screens */
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-xs sm:text-sm min-w-[640px] sm:min-w-full",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/* Header */
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-background sticky top-0 z-10 [&_tr]:border-b",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

/* Body */
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

/* Footer */
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/* Row */
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/* Head cell */
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 sm:px-3 text-left align-middle font-medium text-muted-foreground whitespace-nowrap",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/* Body cell */
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 sm:p-3 align-middle whitespace-nowrap",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

/* Caption */
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs sm:text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
