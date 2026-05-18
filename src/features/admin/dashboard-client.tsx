"use client";

import { CalendarCheck, Scissors, Users, WalletCards } from "lucide-react";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/shared/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/services/api-client";

type Stats = {
  cards: {
    users: number;
    services: number;
    barbers: number;
    totalBookings: number;
    pendingBookings: number;
    doneBookings: number;
  };
  chart: { label: string; value: number }[];
  recentBookings: {
    id: string;
    bookingDate: string;
    bookingTime: string;
    status: "PENDING" | "CONFIRMED" | "ONGOING" | "DONE" | "CANCELED";
    user: { name: string };
    service: { name: string; price: number };
    barber: { name: string };
  }[];
};

export function AdminDashboardClient() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get("/admin/stats").then((response) => setStats(response.data.data));
  }, []);

  if (!stats) {
    return <Skeleton className="h-96 w-full" />;
  }

  const cards = [
    { label: "Total Bookings", value: stats.cards.totalBookings, icon: CalendarCheck },
    { label: "Customers", value: stats.cards.users, icon: Users },
    { label: "Barbers", value: stats.cards.barbers, icon: Scissors },
    { label: "Revenue Signal", value: formatCurrency(stats.cards.doneBookings * 85000), icon: WalletCards },
  ];

  const max = Math.max(...stats.chart.map((item) => item.value), 1);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <Icon className="h-5 w-5 text-[#d7b56d]" />
              <p className="mt-5 text-3xl font-semibold">{card.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold">Booking Chart</h2>
          <div className="mt-6 space-y-4">
            {stats.chart.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm text-zinc-400">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#d7b56d]" style={{ width: `${(item.value / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <div className="mt-5 divide-y divide-white/10">
            {stats.recentBookings.map((booking) => (
              <div key={booking.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{booking.user.name}</p>
                  <p className="text-sm text-zinc-500">
                    {booking.service.name} with {booking.barber.name} - {new Date(booking.bookingDate).toLocaleDateString("id-ID")} {booking.bookingTime}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
