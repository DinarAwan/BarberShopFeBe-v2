"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/table";
import { api } from "@/services/api-client";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
};

export function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [q, setQ] = useState("");

  async function load() {
    const response = await api.get("/users", { params: { q } });
    setUsers(response.data.data);
  }

  useEffect(() => {
    let ignore = false;
    api.get("/users").then((response) => {
      if (!ignore) setUsers(response.data.data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input className="field pl-10" value={q} onChange={(event) => setQ(event.target.value)} onKeyDown={(event) => event.key === "Enter" && load()} placeholder="Search users" />
      </div>
      <DataTable headers={["Name", "Email", "Role", "Joined"]}>
        {users.map((user) => (
          <tr key={user.id} className="text-zinc-300">
            <td className="px-5 py-4 font-medium text-white">{user.name}</td>
            <td className="px-5 py-4">{user.email}</td>
            <td className="px-5 py-4">
              <Badge tone={user.role === "ADMIN" ? "gold" : "neutral"}>{user.role}</Badge>
            </td>
            <td className="px-5 py-4">{new Date(user.createdAt).toLocaleDateString("id-ID")}</td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
