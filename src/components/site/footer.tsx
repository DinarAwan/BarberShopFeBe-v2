import Link from "next/link";
import { Camera, Globe, MapPin, MessageCircle, Scissors } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070707]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3 font-semibold">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-[#d7b56d]/30 bg-[#d7b56d]/10 text-[#d7b56d]">
              <Scissors className="h-5 w-5" />
            </span>
            Noir & Blade
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
            Premium grooming studio dengan booking digital, barber curated, dan pengalaman yang tenang dari datang sampai selesai.
          </p>
          <div className="mt-5 flex gap-3 text-zinc-400">
            <Link href="#" className="rounded-full border border-white/10 p-2 hover:text-white">
              <Camera className="h-4 w-4" />
            </Link>
            <Link href="#" className="rounded-full border border-white/10 p-2 hover:text-white">
              <Globe className="h-4 w-4" />
            </Link>
            <Link href="https://wa.me/6281234567890" className="rounded-full border border-white/10 p-2 hover:text-white">
              <MessageCircle className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-4 text-sm text-zinc-400">
          <p className="font-semibold text-white">Visit</p>
          <p className="flex gap-3">
            <MapPin className="mt-1 h-4 w-4 text-[#d7b56d]" />
            Jl. Senopati No. 21, Jakarta Selatan
          </p>
          <p>Mon-Fri: 09.00-21.00</p>
          <p>Sat-Sun: 10.00-20.00</p>
          <p>WhatsApp: +62 812 3456 7890</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Google Maps Noir & Blade"
            className="h-56 w-full grayscale invert"
            loading="lazy"
            src="https://www.google.com/maps?q=Senopati%20Jakarta&output=embed"
          />
        </div>
      </div>
    </footer>
  );
}
