import Link from "next/link";
import { Scissors } from "lucide-react";
import { RegisterForm } from "@/features/auth/register-form";
import { BarberArt } from "@/components/site/barber-art";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-3 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[#d7b56d]/30 bg-[#d7b56d]/10 text-[#d7b56d]">
              <Scissors className="h-5 w-5" />
            </span>
            Noir & Blade
          </Link>
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h1 className="text-3xl font-semibold">Register</h1>
            <p className="mt-2 text-sm text-zinc-400">Buat akun untuk booking barber favoritmu.</p>
            <div className="mt-6">
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
      <section className="relative hidden overflow-hidden lg:block">
        <BarberArt className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
        <div className="absolute bottom-10 left-10 max-w-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[#d7b56d]">No queue chaos</p>
          <h2 className="mt-4 text-5xl font-semibold">Booking rapi, datang tenang, pulang clean.</h2>
        </div>
      </section>
    </main>
  );
}
