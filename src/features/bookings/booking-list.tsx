"use client";

import { CalendarX, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/services/api-client";

const bookingStatuses = ["PENDING", "CONFIRMED", "ONGOING", "DONE", "CANCELED"] as const;
type BookingStatus = (typeof bookingStatuses)[number];

type Booking = {
  id: string;
  bookingDate: string;
  bookingTime: string;
  status: BookingStatus;
  notes?: string | null;
  service: { name: string; price: number };
  barber: { name: string };
  user?: { name: string; email: string };
};

export function BookingList({ admin = false }: { admin?: boolean }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [cancelId, setCancelId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const response = await api.get("/bookings", { params: { status: status || undefined, q: query || undefined } });
    setBookings(response.data.data.bookings);
    setLoading(false);
  }

  useEffect(() => {
    let ignore = false;
    api.get("/bookings", { params: { status: status || undefined, q: query || undefined } }).then((response) => {
      if (!ignore) {
        setBookings(response.data.data.bookings);
        setLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, status]);

  async function updateStatus(id: string, nextStatus: BookingStatus) {
    await api.patch(`/bookings/${id}`, { status: nextStatus });
    toast.success("Status booking diperbarui");
    load();
  }

  async function cancelBooking() {
    if (!cancelId) return;
    await updateStatus(cancelId, "CANCELED");
    setCancelId(null);
  }

  if (loading) {
    return <Skeleton className="h-72 w-full" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input className="field sm:max-w-xs" placeholder="Search booking" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="field sm:max-w-xs" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">All status</option>
          {bookingStatuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Button variant="secondary" onClick={load}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center">
          <CalendarX className="mx-auto h-10 w-10 text-zinc-600" />
          <p className="mt-4 font-semibold">Belum ada booking</p>
          <p className="mt-2 text-sm text-zinc-500">Data akan muncul setelah customer membuat booking.</p>
        </div>
      ) : (
        <DataTable headers={admin ? ["Customer", "Service", "Barber", "Date", "Status", "Action"] : ["Service", "Barber", "Date", "Status", "Action"]}>
          {bookings.map((booking) => (
            <tr key={booking.id} className="text-zinc-300">
              {admin ? (
                <td className="px-5 py-4">
                  <p className="font-medium text-white">{booking.user?.name}</p>
                  <p className="text-xs text-zinc-500">{booking.user?.email}</p>
                </td>
              ) : null}
              <td className="px-5 py-4">
                <p className="font-medium text-white">{booking.service.name}</p>
                <p className="text-xs text-zinc-500">{formatCurrency(booking.service.price)}</p>
              </td>
              <td className="px-5 py-4">{booking.barber.name}</td>
              <td className="px-5 py-4">
                {new Date(booking.bookingDate).toLocaleDateString("id-ID")} at {booking.bookingTime}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={booking.status} />
              </td>
              <td className="px-5 py-4">
                {admin ? (
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="secondary" onClick={() => updateStatus(booking.id, "CONFIRMED")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => updateStatus(booking.id, "ONGOING")}>
                      Ongoing
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => updateStatus(booking.id, "DONE")}>
                      Done
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => updateStatus(booking.id, "CANCELED")}>
                      Reject
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" variant="danger" disabled={booking.status === "CANCELED"} onClick={() => setCancelId(booking.id)}>
                    Cancel
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      )}

      <ConfirmModal
        open={Boolean(cancelId)}
        onOpenChange={(open) => !open && setCancelId(null)}
        onConfirm={cancelBooking}
        title="Cancel booking?"
        description="Booking akan berubah menjadi CANCELED dan slot dapat digunakan kembali jika admin mengizinkan."
      />
    </div>
  );
}
