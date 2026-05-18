import { UsersClient } from "@/features/admin/users-client";

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">Users</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Manage customer accounts.</h1>
      </div>
      <UsersClient />
    </div>
  );
}
