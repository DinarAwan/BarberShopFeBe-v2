"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Fajar A.",
    quote: "Booking-nya rapi, barber tepat waktu, hasil fade bersih banget. Vibes tempatnya premium tapi tetap santai.",
  },
  {
    name: "Nadia R.",
    quote: "Suka karena bisa pilih barber dan slot langsung. Hair coloring konsultasinya detail dan hasilnya natural.",
  },
  {
    name: "Reza M.",
    quote: "Dashboard booking jelas, tinggal datang. Beard trim-nya presisi dan service terasa personal.",
  },
];

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const item = useMemo(() => testimonials[index], [index]);

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8">
      <div className="mb-6 flex text-[#d7b56d]">
        {Array.from({ length: 5 }).map((_, star) => (
          <Star key={star} className="h-5 w-5 fill-current" />
        ))}
      </div>
      <p className="text-xl leading-8 text-zinc-100">&ldquo;{item.quote}&rdquo;</p>
      <div className="mt-8 flex items-center justify-between">
        <p className="font-semibold">{item.name}</p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIndex((value) => (value === 0 ? testimonials.length - 1 : value - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIndex((value) => (value + 1) % testimonials.length)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
