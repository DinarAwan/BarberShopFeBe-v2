import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#d7b56d]/70 focus:ring-2 focus:ring-[#d7b56d]/20",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
