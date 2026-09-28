import ProductCatalog from "@/components/ui/ProductCatalog";

export const metadata = {
  title: "Products | Terra Fela",
  description:
    "Jelajahi koleksi sneakers, apparel, dan accessories Terra Fela.",
};

export default function ProductsPage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 md:py-16">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold uppercase">Katalog Produk</h1>
        <p className="text-sm text-muted-foreground">
          Semua koleksi Terra Fela dalam satu tempat.
        </p>
      </div>
      <ProductCatalog />
    </section>
  );
}
