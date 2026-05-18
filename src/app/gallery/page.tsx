import { PublicNavbar } from "@/components/site/public-navbar";
import { SiteFooter } from "@/components/site/footer";
import { BarberArt } from "@/components/site/barber-art";

const images = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
  "/images/gallery-5.png",
  "/images/gallery-6.png",
];

export default function GalleryPage() {
  return (
    <main>
      <PublicNavbar />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b56d]">Gallery</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-6xl">Detail ruang dan grooming work yang bisa kamu rasakan.</h1>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <BarberArt variant={index % 2 ? "silver" : "mirror"} className="transition duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
