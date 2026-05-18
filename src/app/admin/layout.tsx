import { AppShell } from "@/components/shared/app-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell role="ADMIN">{children}</AppShell>;
}
