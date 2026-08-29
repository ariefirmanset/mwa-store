import NavLinkList from "../ui/NavLinkList";
import { navIcons } from "@/constants/navIcons";
import NavLink from "../ui/NavLink";
import { navLinks } from "@/constants/navLinks";
import Icon from "../ui/Icon";
import SearchBar from "../ui/SearchBar";
import MegaNav from "./MegaNav";

export default function Header() {
  return (
    <header className="lg:h-16 bg-krem flex items-center gap-0 lg:p-[0_80px] text-black">
      {/* left */}
      <div className="flex gap-12 w-full items-center">
        <p className="font-italiana text-[28px]">AFS.</p>
        <div className="flex gap-6">
          <MegaNav />
          <NavLinkList links={navLinks} linkClassName="uppercase" />
        </div>
      </div>
      {/* right */}
      <div className="flex w-full justify-between">
        <SearchBar />
        <div className="flex items-center gap-5">
          {navIcons.map((item) => (
            <NavLink href={item.href} key={item.id} aria-label={item.label}>
              <Icon Icon={item.icon} key={item.id} color="black" size="24" />
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
