import { AdminDashboardClient } from "@/features/admin/dashboard-client";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">Admin Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Operational overview.</h1>
      </div>
      <AdminDashboardClient />
    </div>
  );
}
