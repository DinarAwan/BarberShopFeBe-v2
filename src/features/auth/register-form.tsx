"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api-client";
import { useAuthStore } from "@/store/auth-store";
import { registerSchema, type RegisterInput } from "@/validations/auth";

export function RegisterForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: RegisterInput) {
    try {
      const response = await api.post("/auth/register", values);
      const { accessToken, user } = response.data.data;
      setSession(accessToken, user);
      toast.success("Akun berhasil dibuat");
      router.push("/user/dashboard");
    } catch {
      toast.error("Register gagal", { description: "Email mungkin sudah terdaftar." });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <InputWithIcon icon={<User className="h-4 w-4" />} error={form.formState.errors.name?.message}>
        <Input placeholder="Nama lengkap" {...form.register("name")} className="pl-10" />
      </InputWithIcon>
      <InputWithIcon icon={<Mail className="h-4 w-4" />} error={form.formState.errors.email?.message}>
        <Input placeholder="Email" type="email" {...form.register("email")} className="pl-10" />
      </InputWithIcon>
      <InputWithIcon icon={<Lock className="h-4 w-4" />} error={form.formState.errors.password?.message}>
        <Input placeholder="Password" type="password" {...form.register("password")} className="pl-10" />
      </InputWithIcon>
      <Button className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Creating..." : "Register"}
      </Button>
      <p className="text-center text-sm text-zinc-400">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-semibold text-[#f0d28b]">
          Login
        </Link>
      </p>
    </form>
  );
}

function InputWithIcon({
  icon,
  error,
  children,
}: {
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span>
        {children}
      </div>
      {error ? <p className="mt-1 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
