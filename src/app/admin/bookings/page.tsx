import { BookingList } from "@/features/bookings/booking-list";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">Manage Bookings</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Approve, reject, and update status.</h1>
      </div>
      <BookingList admin />
    </div>
  );
}
