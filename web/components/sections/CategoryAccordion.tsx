"use client";

import { categories } from "@/constants/categories";
import { Img, Link } from "../ui";

export default function CategoryAccordion() {
  return (
    <section className="w-full h-dvh  bg-krem p-4 md:p-8 flex items-center justify-center">
      <div className="flex w-full max-w-6xl h-full gap-2 md:gap-4">
        {categories.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative flex-grow flex-shrink basis-[10%] hover:basis-[50%] transition-[flex-basis] duration-1000 ease-in-out overflow-hidden rounded-xl md:rounded-2xl cursor-pointer"
          >
            <Img
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover transition-all duration-700 ease-in-out opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex flex-col justify-end h-full">
              <h2 className="text-white text-xl md:text-3xl font-bold tracking-widest whitespace-nowrap origin-bottom-left -rotate-90 group-hover:rotate-0 transition-all duration-500 mb-2 uppercase">
                {item.title}
              </h2>

              <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                <p className="text-white/80 text-sm md:text-base mb-4 hidden md:block">
                  {item.description}
                </p>

                <span className="inline-block bg-olive-tua hover:bg-sage text-white px-6 py-2 text-sm font-semibold tracking-wider transition-colors duration-300 uppercase">
                  Shop Now
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
