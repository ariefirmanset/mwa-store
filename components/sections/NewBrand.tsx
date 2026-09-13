import { Img } from "../ui";
import { promoItems } from "../../constants/promoItems";
import { Button } from "../ui/Button";

export default function NewBrand() {
  return (
    <section id="promos">
      <div className="relative flex w-full h-[70dvh]">
        {promoItems.map((item) => (
          <Img
            key={item.id}
            alt={item.alt}
            src={item.src}
            width={500}
            height={300}
            className="object-cover flex-1"
          />
        ))}
        <div className="absolute inset-0 justify-center items-center text-white flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="uppercase text-4xl font-bold text-center">
              new brand
            </span>
            <span className="uppercase text-xl">introducing Terra Fela</span>
          </div>
          <div className="">
            <Button
              className="uppercase py-6 text-black"
              size="lg"
              variant="outline"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
