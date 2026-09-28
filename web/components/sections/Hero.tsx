import { Img, Link } from "../ui";

export default function Hero() {
  return (
    <div className="relative w-full h-[calc(100dvh-4rem)] min-h-[500px] max-h-[750px] bg-sage overflow-hidden">
      <Img
        src="/img/sneakers-hero.jpeg"
        alt="Hero Fashion 2026"
        fill
        priority // Muat lebih cepat untuk gambar di atas fold
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        className="object-cover object-center"
      />

      {/* gradient overlay biar teks & button tetap kebaca di atas foto apapun */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end px-[5%] pb-[8%] gap-4">
        <span className="uppercase text-white font-medium tracking-tight leading-[0.9] text-[clamp(2.5rem,8vw,6rem)]">
          New Sneakers
        </span>

        <p className="text-white/80 text-sm md:text-base max-w-md">
          Koleksi terbaru 2026 — dirancang untuk gerak, dibangun untuk gaya.
        </p>

        <Link
          href="/collections/new-sneakers"
          className="inline-flex w-fit items-center gap-2 bg-white text-olive-tua px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-olive-tua hover:text-white transition-colors duration-300"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
