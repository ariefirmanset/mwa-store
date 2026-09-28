"use client";

import { useMemo, useState } from "react";
import {
  categories,
  products,
  sortOptions,
  type SortValue,
  type Product,
} from "../../constants/products";
import { cn } from "@/lib/utils";
import ProductRevealCard from "./ProductRevealCard";

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<
    Product["category"] | "all"
  >("all");
  const [sort, setSort] = useState<SortValue>("newest");

  const filtered = useMemo(() => {
    const result =
      activeCategory === "all"
        ? [...products]
        : products.filter((p) => p.category === activeCategory);

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    // "newest" pakai urutan dummy asli (TODO: pakai createdAt dari BE nanti)

    return result;
  }, [activeCategory, sort]);

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-10">
      {/* Sidebar filter */}
      <aside className="flex shrink-0 flex-row gap-2 overflow-x-auto md:w-48 md:flex-col md:overflow-visible">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition-colors",
              activeCategory === cat.value
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
            )}
          >
            {cat.label}
          </button>
        ))}
      </aside>

      {/* Grid + sort */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {filtered.length} produk
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Belum ada produk di kategori ini.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductRevealCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
