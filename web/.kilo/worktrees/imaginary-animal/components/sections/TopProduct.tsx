import { topProduct } from "@/constants/topProduct";
import { ProductRevealCard, Typograpy } from "../ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function TopProduct() {
  return (
    <div className="flex flex-col w-full h-[calc(100dvh-4rem)] min-h-[500px] max-h-[750px] bg-olive-tua overflow-hidden px-[5%] pb-[8%] justify-center items-center">
      <Typograpy className="text-center py-16 ">Top Products</Typograpy>
      <div className="flex gap-4">
        <Carousel className="w-full max-w-5xl">
          <CarouselContent>
            {topProduct.map((p, i) => (
              <CarouselItem key={i} className="basis-auto">
                <ProductRevealCard Product={p} key={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
