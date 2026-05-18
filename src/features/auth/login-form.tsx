"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api-client";
import { useAuthStore } from "@/store/auth-store";
import { loginSchema, type LoginInput } from "@/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    try {
      const response = await api.post("/auth/login", values);
      const { accessToken, user } = response.data.data;
      setSession(accessToken, user);
      toast.success("Login berhasil");
      const fallback = user.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard";
      router.push(params.get("next") ?? fallback);
    } catch {
      toast.error("Login gagal", { description: "Periksa email dan password kamu." });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldError message={form.formState.errors.email?.message}>
        <Mail className="h-4 w-4 text-zinc-500" />
        <Input placeholder="Email" type="email" {...form.register("email")} className="pl-10" />
      </FieldError>
      <FieldError message={form.formState.errors.password?.message}>
        <Lock className="h-4 w-4 text-zinc-500" />
        <Input placeholder="Password" type="password" {...form.register("password")} className="pl-10" />
      </FieldError>
      <Button className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Signing in..." : "Login"}
      </Button>
      <p className="text-center text-sm text-zinc-400">
        Belum punya akun?{" "}
        <Link href="/register" className="font-semibold text-[#f0d28b]">
          Register
        </Link>
      </p>
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-zinc-400">
        Demo admin: admin@barbershop.local / password123
        <br />
        Demo user: user@barbershop.local / password123
      </div>
    </form>
  );
}

function FieldError({ children, message }: { children: React.ReactNode; message?: string }) {
  const [icon, input] = Array.isArray(children) ? children : [null, children];

  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">{icon}</span>
        {input}
      </div>
      {message ? <p className="mt-1 text-xs text-red-300">{message}</p> : null}
    </div>
  );
}
