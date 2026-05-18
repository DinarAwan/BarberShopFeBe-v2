import Link from "next/link";
import { ArrowRight, CalendarCheck, Clock, MapPin, Sparkles } from "lucide-react";
import { BarberArt } from "@/components/site/barber-art";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/site/public-navbar";
import { SiteFooter } from "@/components/site/footer";
import { TestimonialCarousel } from "@/components/site/testimonial-carousel";
import { formatCurrency } from "@/lib/utils";

const services = [
  ["Haircut", "Precision cut dengan styling premium.", 85000],
  ["Beard Trim", "Sculpting, razor line, dan balm finish.", 45000],
  ["Hair Coloring", "Color consult dan aplikasi modern.", 250000],
  ["Creambath", "Scalp treatment yang rileks dan nourishing.", 110000],
  ["Hair Wash", "Deep wash, massage, dan quick style.", 35000],
] as const;

const barbers = [
  {
    name: "Raka Steel",
    specialty: "Classic fade & executive cuts",
  },
  {
    name: "Dimas Noir",
    specialty: "Beard sculpting & modern crop",
  },
  {
    name: "Arman Vale",
    specialty: "Coloring & texture styling",
  },
];

const gallery = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <PublicNavbar />

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#050505]/70 to-[#050505]" />
          <div className="premium-grid absolute inset-0 opacity-40" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <Badge tone="gold">Premium grooming studio</Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Noir & Blade Barbershop
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Booking haircut, beard trim, coloring, dan treatment premium dengan barber pilihan, slot real-time, dan pengalaman digital yang rapi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/login">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["12K+", "cuts"],
                ["4.9", "rating"],
                ["10", "daily slots"],
              ].map(([value, label]) => (
                <div key={label} className="glass-panel rounded-2xl p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <BarberArt />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm text-zinc-300">
              <div className="rounded-xl bg-white/[0.06] p-3">
                <CalendarCheck className="mb-2 h-4 w-4 text-[#d7b56d]" />
                Real-time
              </div>
              <div className="rounded-xl bg-white/[0.06] p-3">
                <Clock className="mb-2 h-4 w-4 text-[#d7b56d]" />
                On schedule
              </div>
              <div className="rounded-xl bg-white/[0.06] p-3">
                <Sparkles className="mb-2 h-4 w-4 text-[#d7b56d]" />
                Premium
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Services" title="Menu grooming yang tajam dan jelas." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map(([name, description, price]) => (
            <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-[#d7b56d]/40">
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">{description}</p>
              <p className="mt-5 text-sm font-semibold text-[#f0d28b]">{formatCurrency(price)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="barbers" className="bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Barbers" title="Tim yang tahu karakter potonganmu." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {barbers.map((barber) => (
              <div key={barber.name} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]">
                <div className="relative aspect-[4/5]">
                  <BarberArt variant={barber.name === "Dimas Noir" ? "silver" : "gold"} />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{barber.name}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{barber.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Gallery" title="Ruang, detail, dan hasil kerja." />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((image, index) => (
            <div key={image} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
              <BarberArt variant={index % 2 ? "silver" : "mirror"} className="transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionTitle eyebrow="Testimonials" title="Dipercaya customer yang butuh rapi tanpa drama." />
          <TestimonialCarousel />
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-panel flex flex-col justify-between gap-6 rounded-2xl p-6 sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm text-[#f0d28b]">
              <MapPin className="h-4 w-4" /> Senopati, Jakarta Selatan
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Siap booking slot berikutnya?</h2>
          </div>
          <Button asChild>
            <Link href="/login">Book Now</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
