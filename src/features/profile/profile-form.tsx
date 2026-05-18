"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api-client";
import { useAuthStore } from "@/store/auth-store";
import { profileSchema } from "@/validations/auth";
import type { z } from "zod";

type ProfileInput = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);
  const token = useAuthStore((state) => state.accessToken);
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "" },
  });

  useEffect(() => {
    if (user?.name) form.setValue("name", user.name);
  }, [user?.name, form]);

  async function onSubmit(values: ProfileInput) {
    const response = await api.patch("/auth/me", values);
    if (token) {
      setSession(token, response.data.data);
    }
    toast.success("Profile updated");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold">Nama</label>
        <Input {...form.register("name")} />
        {form.formState.errors.name ? <p className="mt-1 text-xs text-red-300">{form.formState.errors.name.message}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">Email</label>
        <Input value={user?.email ?? ""} disabled />
      </div>
      <Button disabled={form.formState.isSubmitting}>Save Changes</Button>
    </form>
  );
}
