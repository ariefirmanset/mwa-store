import React from "react";
import { Img } from "../ui";
import { Button } from "../ui/Button";
import Icon from "../ui/Icon";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "../ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { shirtProducts } from "@/constants/shirtProducts";

export default function Shirt() {
  return (
    <section id="shirt">
      <div className="relative h-[100dvh] overflow-hidden">
        <Img
          src="/img/shirt/shirtHero1.jpeg"
          alt="black shirt crop top"
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 100vw,100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute top-[18%] left-19">
          <span className="text-9xl text-krem font-italiana">
            where <br />- style
          </span>
        </div>
        <div className="absolute top-[28%] right-19">
          <span className="text-9xl text-krem font-italiana">
            lives <br />- now
          </span>
        </div>

        {/* Bottom row: CTA kiri, keterangan kanan */}
        <div className="absolute bottom-12 left-19 right-19 flex items-end justify-between">
          <p className="text-krem/80 text-sm max-w-xs text-left leading-relaxed">
            Koleksi terbaru 2026 — dirancang untuk gaya hidup modern.
          </p>
          <Button
            type="button"
            className="bg-krem text-charcoal hover:bg-abu-netral hover:text-white px-8 h-12 rounded-lg font-medium w-79"
          >
            Shop Now
            <Icon Icon={ArrowRight} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full h-[calc(100dvh-7rem)] min-h-[500px] max-h-[750px] bg-white justify-center items-center">
        <div className="flex gap-4">
          <Carousel className="w-full max-w-5xl">
            <CarouselContent>
              {shirtProducts.map((p, i) => (
                <CarouselItem key={i} className="basis-auto">
                  <ProductCard Product={p} key={i} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
