import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#d7b56d]/70 focus:ring-2 focus:ring-[#d7b56d]/20",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
