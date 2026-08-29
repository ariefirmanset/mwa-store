import NavLink from "./NavLink";

interface NavItem {
  href: string;
  label: string;
}

interface NavLinkListProps {
  links: NavItem[];
  containerClassName?: string;
  linkClassName?: string;
}
export default function NavLinkList({
  links,
  containerClassName,
  linkClassName,
}: NavLinkListProps) {
  return (
    <nav className={`flex gap-6 items-center ${containerClassName ?? ""} `}>
      {links.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          className={linkClassName}
        />
      ))}
    </nav>
  );
}
