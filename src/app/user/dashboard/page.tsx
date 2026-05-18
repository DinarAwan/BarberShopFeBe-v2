import { BookingWizard } from "@/features/bookings/booking-wizard";

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">User Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Book your next grooming slot.</h1>
      </div>
      <section className="glass-panel rounded-2xl p-5 sm:p-6">
        <BookingWizard />
      </section>
    </div>
  );
}
