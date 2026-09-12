import { Img } from "../ui";
import { promoItems } from "../../constants/promoItems";

export default function Promos() {
  return (
    <section id="promos">
      <div className="flex w-full h-[70dvh]">
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
      </div>
    </section>
  );
}
