import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  neutral: "border-white/10 bg-white/10 text-zinc-200",
  gold: "border-[#d7b56d]/30 bg-[#d7b56d]/15 text-[#f0d28b]",
  green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  red: "border-red-400/20 bg-red-400/10 text-red-200",
  blue: "border-sky-400/20 bg-sky-400/10 text-sky-200",
};

export function Badge({
  className,
  tone = "neutral",
  children,
}: {
  className?: string;
  tone?: keyof typeof tones;
  children: ReactNode;
}) {
  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
