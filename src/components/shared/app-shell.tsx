"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  LogOut,
  Menu,
  Scissors,
  Settings2,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/services/api-client";
import { useAuthStore } from "@/store/auth-store";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/services", label: "Services", icon: Settings2 },
  { href: "/admin/barbers", label: "Barbers", icon: Scissors },
  { href: "/admin/users", label: "Users", icon: Users },
];

const userLinks = [
  { href: "/user/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/user/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/user/profile", label: "Profile", icon: User },
];

export function AppShell({ children, role }: { children: React.ReactNode; role: "ADMIN" | "USER" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);
  const user = useAuthStore((state) => state.user);
  const links = role === "ADMIN" ? adminLinks : userLinks;

  async function logout() {
    await api.post("/auth/logout");
    clearSession();
    toast.success("Logout berhasil");
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#080808] p-4 transition lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[#d7b56d]/30 bg-[#d7b56d]/10 text-[#d7b56d]">
              <Scissors className="h-5 w-5" />
            </span>
            Noir & Blade
          </Link>
          <button className="rounded-xl p-2 hover:bg-white/10 lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-semibold">{user?.name ?? "Member"}</p>
          <p className="mt-1 text-xs text-zinc-500">{role}</p>
        </div>

        <nav className="mt-6 grid gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white",
                  active && "bg-[#d7b56d]/15 text-[#f0d28b]",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button variant="secondary" className="absolute bottom-4 left-4 right-4" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </aside>

      {open ? <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} /> : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#050505]/80 px-4 backdrop-blur-xl sm:px-6">
          <button className="rounded-xl border border-white/10 p-2 lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <p className="hidden text-sm text-zinc-500 lg:block">Modern barbershop management</p>
          <Button asChild size="sm">
            <Link href={role === "ADMIN" ? "/admin/bookings" : "/user/bookings"}>Book / Manage</Link>
          </Button>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
