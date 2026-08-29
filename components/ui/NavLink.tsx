import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<"a"> {
  label?: string;
}
export default function NavLink({
  label,
  className = "",
  children,
  ...props
}: NavLinkProps) {
  return (
    <a
      className={`transition-colors hover:text-abut-netral ${className}`}
      {...props}
      aria-label={props["aria-label"] || label}
    >
      {children ?? label}
    </a>
  );
}
