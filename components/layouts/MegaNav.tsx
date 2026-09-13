import Icon from "../ui/Icon";
import { ChevronDown } from "lucide-react";
import { navMegaLinks } from "@/constants/navMegaLinks";
import Heading from "../ui/Heading";
import List from "../ui/List";
import NavLink from "../ui/Link";
import Img from "../ui/Img";
import { Button } from "../ui/Button";
import Link from "../ui/Link";

export default function MegaNav() {
  return (
    <div className="relative group justify-around">
      <Button
        type="button"
        variant="ghost"
        size="lg"
        className="flex items-end gap-1.5 h-auto p-0 hover:bg-transparent group"
      >
        <span className="uppercase">Category</span>
        <Icon
          Icon={ChevronDown}
          className="transition-transform duration-200 group-hover:rotate-180"
        />
      </Button>
      <div className="absolute left-0 top-12 hidden group-hover:block w-160 rounded-lg bg-krem z-50 shadow-xl before:content=[''] before:absolute before:-top-7 before:left-0 before:h-7 before:w-full before:bg-transparent">
        <div className="flex flex-row gap-8 py-7 px-8">
          {navMegaLinks.map((c) => (
            <div className="space-y-3" key={c.id}>
              <Heading as="h6">{c.header}</Heading>
              <List
                List={c.subLinks}
                keyExtractor={(subitem) => subitem.href}
                className="text-[13px] flex flex-col gap-2.5"
                renderItem={(subitem) => (
                  <NavLink
                    href={subitem.href}
                    label={subitem.label}
                    className="capitalize"
                  />
                )}
              />
            </div>
          ))}
          <div className="relative">
            <Img
              alt="new arrival 2026"
              src="/img/newarival.png"
              width={200}
              height={180}
            />
            <span className="absolute top-1.5 left-1.75 text-white font-bold text-[12px]">
              New Arrivals 2026
            </span>
            <Button
              className="absolute bottom-1.5 right-3.75 text-white font-bold text-[12px]"
              variant="link"
              render={<Link href="/collection"></Link>}
              nativeButton={false}
            >
              Lihat Koleksi →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
