"use client";

import { Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import { api } from "@/services/api-client";

type ResourceType = "services" | "barbers";
type Resource = Record<string, string | number>;

export function ResourceManager({ type }: { type: ResourceType }) {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    const response = await api.get(`/${type}`);
    setItems(response.data.data);
  }

  useEffect(() => {
    let ignore = false;
    api.get(`/${type}`).then((response) => {
      if (!ignore) setItems(response.data.data);
    });
    return () => {
      ignore = true;
    };
  }, [type]);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const payload =
      type === "services"
        ? {
            name: String(form.get("name")),
            description: String(form.get("description")),
            price: Number(form.get("price")),
            duration: Number(form.get("duration")),
          }
        : {
            name: String(form.get("name")),
            specialty: String(form.get("specialty")),
            image: String(form.get("image")),
          };

    await api.post(`/${type}`, payload);
    toast.success(`${type === "services" ? "Service" : "Barber"} ditambahkan`);
    event.currentTarget.reset();
    await load();
    setLoading(false);
  }

  async function remove(id: string) {
    await api.delete(`/${type}/${id}`);
    toast.success("Data dihapus");
    load();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={create} className="glass-panel grid gap-3 rounded-2xl p-5 lg:grid-cols-5">
        <input name="name" required className="field" placeholder="Name" />
        {type === "services" ? (
          <>
            <input name="description" required className="field lg:col-span-2" placeholder="Description" />
            <input name="price" required className="field" placeholder="Price" type="number" />
            <input name="duration" required className="field" placeholder="Duration" type="number" />
          </>
        ) : (
          <>
            <input name="specialty" required className="field lg:col-span-2" placeholder="Specialty" />
            <input name="image" required className="field lg:col-span-2" placeholder="Image URL" type="url" />
          </>
        )}
        <Button disabled={loading} className="lg:col-span-5">
          <Plus className="h-4 w-4" />
          Add {type === "services" ? "Service" : "Barber"}
        </Button>
      </form>

      <DataTable headers={type === "services" ? ["Name", "Description", "Price", "Duration", "Action"] : ["Name", "Specialty", "Image", "Action"]}>
        {items.map((item) => (
          <tr key={String(item.id)} className="text-zinc-300">
            <td className="px-5 py-4 font-medium text-white">{item.name}</td>
            {type === "services" ? (
              <>
                <td className="px-5 py-4">{item.description}</td>
                <td className="px-5 py-4">Rp {Number(item.price).toLocaleString("id-ID")}</td>
                <td className="px-5 py-4">{item.duration} min</td>
              </>
            ) : (
              <>
                <td className="px-5 py-4">{item.specialty}</td>
                <td className="max-w-xs truncate px-5 py-4">{item.image}</td>
              </>
            )}
            <td className="px-5 py-4">
              <Button variant="danger" size="sm" onClick={() => remove(String(item.id))}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
