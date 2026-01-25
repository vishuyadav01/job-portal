import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent " +
            "min-h-[44px] sm:min-h-[40px] " +
            "px-3 py-2 sm:py-1.5 " +
            "text-sm sm:text-base md:text-sm " +
            "shadow-sm transition-colors " +
            "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground " +
            "placeholder:text-muted-foreground " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 " +
            "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
