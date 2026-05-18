"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, Scissors, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/services/api-client";
import { bookingSchema, type BookingInput } from "@/validations/booking";

type Service = { id: string; name: string; price: number; duration: number; description: string };
type Barber = { id: string; name: string; image: string; specialty: string };
type Slot = { time: string; available: boolean };

export function BookingWizard({ onBooked }: { onBooked?: () => void }) {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { serviceId: "", barberId: "", bookingDate: "", bookingTime: "", notes: "" },
  });
  const watchedBarber = useWatch({ control: form.control, name: "barberId" });
  const watchedDate = useWatch({ control: form.control, name: "bookingDate" });
  const watchedService = useWatch({ control: form.control, name: "serviceId" });
  const watchedTime = useWatch({ control: form.control, name: "bookingTime" });
  const selectedService = useMemo(
    () => services.find((service) => service.id === watchedService),
    [services, watchedService],
  );

  useEffect(() => {
    Promise.all([api.get("/services"), api.get("/barbers")]).then(([servicesResponse, barbersResponse]) => {
      setServices(servicesResponse.data.data);
      setBarbers(barbersResponse.data.data);
    });
  }, []);

  useEffect(() => {
    if (!watchedBarber || !watchedDate) return;
    api
      .get(`/bookings/availability?barberId=${watchedBarber}&date=${watchedDate}`)
      .then((response) => setSlots(response.data.data.slots));
  }, [watchedBarber, watchedDate]);

  async function onSubmit(values: BookingInput) {
    try {
      await api.post("/bookings", values);
      toast.success("Booking dibuat", { description: "Status awal booking adalah PENDING." });
      form.reset();
      setSlots([]);
      onBooked?.();
    } catch {
      toast.error("Booking gagal", { description: "Slot mungkin sudah terisi atau data belum lengkap." });
    }
  }

  const minDate = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <FormGroup icon={<Scissors className="h-4 w-4" />} label="Layanan">
          <select className="field" {...form.register("serviceId")}>
            <option value="">Pilih layanan</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - {formatCurrency(service.price)}
              </option>
            ))}
          </select>
          {selectedService ? (
            <p className="mt-2 text-xs text-zinc-500">
              {selectedService.duration} menit - {selectedService.description}
            </p>
          ) : null}
        </FormGroup>

        <FormGroup icon={<UserRound className="h-4 w-4" />} label="Barber">
          <select className="field" {...form.register("barberId")}>
            <option value="">Pilih barber</option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.name} - {barber.specialty}
              </option>
            ))}
          </select>
        </FormGroup>

        <FormGroup icon={<Calendar className="h-4 w-4" />} label="Tanggal">
          <input className="field" min={minDate} type="date" {...form.register("bookingDate")} />
        </FormGroup>

        <FormGroup icon={<Clock className="h-4 w-4" />} label="Jam">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {slots.length ? (
              slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => form.setValue("bookingTime", slot.time, { shouldValidate: true })}
                  className={`rounded-xl border px-3 py-2 text-sm transition ${
                    watchedTime === slot.time
                      ? "border-[#d7b56d] bg-[#d7b56d] text-black"
                      : "border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/10"
                  } disabled:cursor-not-allowed disabled:opacity-30`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="col-span-full text-sm text-zinc-500">Pilih barber dan tanggal untuk melihat slot.</p>
            )}
          </div>
        </FormGroup>
      </div>

      <FormGroup label="Catatan">
        <Textarea placeholder="Contoh: low fade, jangan terlalu pendek di atas." {...form.register("notes")} />
      </FormGroup>

      <Button disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Submitting..." : "Submit Booking"}
      </Button>
    </form>
  );
}

function FormGroup({ icon, label, children }: { icon?: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-200">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
