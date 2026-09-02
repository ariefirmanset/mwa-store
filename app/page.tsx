import { Footer, Header } from "@/components/layouts";
import CategoryAccordion from "@/components/sections/CategoryAccordion";
import Hero from "@/components/sections/Hero";
import Promo from "@/components/sections/Promo";
import TopProduct from "@/components/sections/TopProduct";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CategoryAccordion />
      <Promo />
      <TopProduct />
      <Footer />
    </>
  );
}
