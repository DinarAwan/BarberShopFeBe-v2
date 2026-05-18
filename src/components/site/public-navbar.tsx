"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Scissors, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Barbers", "/about#barbers"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-wide">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[#d7b56d]/30 bg-[#d7b56d]/10 text-[#d7b56d]">
            <Scissors className="h-5 w-5" />
          </span>
          <span>Noir & Blade</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-zinc-400 transition hover:text-white">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <button className="rounded-xl border border-white/10 p-2 lg:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#080808] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-xl px-3 py-3 text-zinc-300 hover:bg-white/10">
                {label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button asChild variant="secondary">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
