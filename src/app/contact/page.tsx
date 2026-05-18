import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PublicNavbar } from "@/components/site/public-navbar";
import { SiteFooter } from "@/components/site/footer";

export default function ContactPage() {
  return (
    <main>
      <PublicNavbar />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">Datang, chat, atau booking online.</h1>
          <div className="mt-8 grid gap-4 text-zinc-300">
            <p className="flex gap-3"><MapPin className="h-5 w-5 text-[#d7b56d]" /> Jl. Senopati No. 21, Jakarta Selatan</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 text-[#d7b56d]" /> +62 21 555 0101</p>
            <p className="flex gap-3"><MessageCircle className="h-5 w-5 text-[#d7b56d]" /> +62 812 3456 7890</p>
            <p className="flex gap-3"><Mail className="h-5 w-5 text-[#d7b56d]" /> hello@noirblade.local</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Google Maps"
            className="h-[520px] w-full grayscale invert"
            loading="lazy"
            src="https://www.google.com/maps?q=Senopati%20Jakarta&output=embed"
          />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
