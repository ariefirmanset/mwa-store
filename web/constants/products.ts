export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: "sneakers" | "apparel" | "accessories";
  isNew?: boolean;
};

// TODO: ganti dengan fetch dari BE waktu udah ready
export const products: Product[] = [
  {
    id: "1",
    name: "Air Terra High UNC",
    slug: "air-terra-high-unc",
    price: 1899000,
    image: "/promoSneakers.jpeg",
    category: "sneakers",
    isNew: true,
  },
  {
    id: "2",
    name: "Terra Fela Jersey",
    slug: "terra-fela-jersey",
    price: 649000,
    image: "/promo2.jpeg",
    category: "apparel",
    isNew: true,
  },
  {
    id: "3",
    name: "Terra Court Low",
    slug: "terra-court-low",
    price: 1499000,
    image: "/promoSneakers.jpeg",
    category: "sneakers",
  },
  {
    id: "4",
    name: "Skywalkers Shorts",
    slug: "skywalkers-shorts",
    price: 399000,
    image: "/promo2.jpeg",
    category: "apparel",
  },
  {
    id: "5",
    name: "Terra Cap Classic",
    slug: "terra-cap-classic",
    price: 249000,
    image: "/promoSneakers.jpeg",
    category: "accessories",
  },
  {
    id: "6",
    name: "Terra Crew Socks",
    slug: "terra-crew-socks",
    price: 99000,
    image: "/promo2.jpeg",
    category: "accessories",
  },
];

export const categories: {
  label: string;
  value: Product["category"] | "all";
}[] = [
  { label: "Semua", value: "all" },
  { label: "Sneakers", value: "sneakers" },
  { label: "Apparel", value: "apparel" },
  { label: "Accessories", value: "accessories" },
];

export const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Harga: Rendah ke Tinggi", value: "price-asc" },
  { label: "Harga: Tinggi ke Rendah", value: "price-desc" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];
