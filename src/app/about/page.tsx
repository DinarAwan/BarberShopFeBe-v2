import { PublicNavbar } from "@/components/site/public-navbar";
import { SiteFooter } from "@/components/site/footer";
import { BarberArt } from "@/components/site/barber-art";

const barbers = [
  ["Raka Steel", "Classic fade & executive cuts", "/images/barber-raka.png"],
  ["Dimas Noir", "Beard sculpting & modern crop", "/images/barber-dimas.png"],
  ["Arman Vale", "Coloring & texture styling", "/images/barber-arman.png"],
];

export default function AboutPage() {
  return (
    <main>
      <PublicNavbar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">About</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-6xl">Barbershop modern untuk grooming yang presisi dan effortless.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          Noir & Blade menggabungkan craft barber klasik, appointment system yang rapi, dan standar pelayanan studio premium.
        </p>
        <div id="barbers" className="mt-14 grid gap-5 md:grid-cols-3">
          {barbers.map(([name, specialty]) => (
            <div key={name} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="relative aspect-[4/5]">
                <BarberArt variant={name === "Dimas Noir" ? "silver" : "gold"} />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="mt-2 text-zinc-400">{specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
