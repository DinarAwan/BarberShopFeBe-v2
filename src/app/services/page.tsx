import { PublicNavbar } from "@/components/site/public-navbar";
import { SiteFooter } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const services = [
  ["Haircut", "Precision cut, styling, hot towel, dan finishing product.", 85000, "45 min"],
  ["Beard Trim", "Beard shaping, razor line, warm towel, dan balm finish.", 45000, "25 min"],
  ["Hair Coloring", "Consultation, color application, wash, dan final styling.", 250000, "120 min"],
  ["Creambath", "Scalp massage, cream treatment, steam, dan rinse.", 110000, "60 min"],
  ["Hair Wash", "Deep wash, light massage, blow dry, dan quick style.", 35000, "20 min"],
];

export default function ServicesPage() {
  return (
    <main>
      <PublicNavbar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">Services</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-6xl">Layanan grooming premium dengan durasi transparan.</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map(([name, description, price, duration]) => (
            <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{name}</h2>
                  <p className="mt-3 text-zinc-400">{description}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">{duration}</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="font-semibold text-[#f0d28b]">{formatCurrency(Number(price))}</p>
                <Button asChild size="sm">
                  <Link href="/login">Book</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
