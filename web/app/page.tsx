import { Footer, Header } from "@/components/layouts";
import PromoHighlight from "@/components/layouts/PromoHighlight";
import BecomeMember from "@/components/sections/BecomeMember";
import CategoryAccordion from "@/components/sections/CategoryAccordion";
import Hero from "@/components/sections/Hero";
import NewBrand from "@/components/sections/NewBrand";
import Shirt from "@/components/sections/Shirt";
import TopProduct from "@/components/sections/TopProduct";

export default function Home() {
  return (
    <>
      <PromoHighlight />
      <Header />
      <Hero />
      <CategoryAccordion />
      {/* <Shirt /> */}
      <BecomeMember />
      <NewBrand />
      {/* <TopProduct /> */}
      <Footer />
    </>
  );
}
