import { Bell, ShoppingCart, CircleUser, LucideIcon } from "lucide-react";

export interface typeNav {
  id: number;
  icon?: LucideIcon;
  href: string;
  label: string;
}

export const navIcons: typeNav[] = [
  {
    id: 1,
    icon: Bell,
    href: "/notification",
    label: "Notification",
  },
  {
    id: 2,
    icon: ShoppingCart,
    href: "/cart",
    label: "Keranjang",
  },
  {
    id: 3,
    icon: CircleUser,
    href: "/profile",
    label: "Profil",
  },
];
