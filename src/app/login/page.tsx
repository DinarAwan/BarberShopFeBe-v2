import Link from "next/link";
import { Suspense } from "react";
import { Scissors } from "lucide-react";
import { LoginForm } from "@/features/auth/login-form";
import { BarberArt } from "@/components/site/barber-art";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:block">
        <BarberArt className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
        <div className="absolute bottom-10 left-10 max-w-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[#d7b56d]">Premium booking</p>
          <h1 className="mt-4 text-5xl font-semibold">Masuk dan pilih slot grooming terbaikmu.</h1>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-3 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[#d7b56d]/30 bg-[#d7b56d]/10 text-[#d7b56d]">
              <Scissors className="h-5 w-5" />
            </span>
            Noir & Blade
          </Link>
          <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">Login</h2>
            <p className="mt-2 text-sm text-zinc-400">Gunakan akun customer atau admin.</p>
            <div className="mt-6">
              <Suspense>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
