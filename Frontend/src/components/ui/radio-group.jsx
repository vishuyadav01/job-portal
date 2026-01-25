import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn(
        "grid gap-3 sm:gap-2",
        className
      )}
      {...props}
    />
  )
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // base + mobile-friendly size
        "relative flex items-center justify-center rounded-full border border-primary text-primary shadow-sm",
        "h-5 w-5 sm:h-4 sm:w-4",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 sm:h-3 sm:w-3 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
