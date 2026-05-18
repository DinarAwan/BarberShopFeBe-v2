import { Scissors, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function BarberArt({ variant = "gold", className }: { variant?: "gold" | "silver" | "mirror"; className?: string }) {
  const accent = variant === "silver" ? "bg-[#d8dde6]" : "bg-[#d7b56d]";
  const border = variant === "silver" ? "border-[#d8dde6]/40" : "border-[#d7b56d]/40";

  return (
    <div className={cn("relative h-full min-h-72 overflow-hidden bg-[#090909] premium-grid", className)}>
      <div className={cn("absolute -right-20 top-10 h-72 w-72 rounded-full opacity-20 blur-3xl", accent)} />
      <div className={cn("absolute left-10 top-10 rounded-full border p-4 text-[#d7b56d]", border)}>
        <Scissors className="h-8 w-8" />
      </div>
      <div className="absolute left-1/2 top-[18%] h-44 w-44 -translate-x-1/2 rounded-full border border-white/15 bg-white/[0.04]" />
      <div className={cn("absolute left-1/2 top-[32%] h-20 w-20 -translate-x-1/2 rounded-full", accent)} />
      <div className="absolute left-1/2 top-[48%] h-48 w-64 -translate-x-1/2 rounded-t-[5rem] border border-white/10 bg-black/80 shadow-2xl" />
      <div className={cn("absolute bottom-[21%] left-1/2 h-4 w-72 -translate-x-1/2 rounded-full", accent)} />
      <div className="absolute bottom-[12%] left-1/2 h-24 w-44 -translate-x-1/2 rounded-2xl border border-white/10 bg-white/[0.04]" />
      <div className="absolute bottom-7 left-7 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
        <Sparkles className="h-4 w-4 text-[#d7b56d]" />
        Noir & Blade
      </div>
    </div>
  );
}
