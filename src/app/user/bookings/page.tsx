import { BookingList } from "@/features/bookings/booking-list";

export default function UserBookingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">My Bookings</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">History dan status booking.</h1>
      </div>
      <BookingList />
    </div>
  );
}
