"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function InputOTP({
  maxLength = 6,
  value = "",
  onChange = () => { },
  className,
  containerClassName,
  ...props
}) {
  return (
    <OTPInput
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots?.[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded border text-sm transition-all",
        "border-[#006699]",
        "focus-within:border-[#006699]",
        "data-[active=true]:border-[#006699]",
        "data-[active=true]:border-2",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-[#006699] duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({
  ...props
}) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="w-2"
      {...props}
    >
      <MinusIcon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
