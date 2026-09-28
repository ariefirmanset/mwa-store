import { ComponentProps } from "react";

interface LinkProps extends ComponentProps<"a"> {
  label?: string;
}
export default function Link({
  label,
  className = "",
  children,
  ...props
}: LinkProps) {
  return (
    <a
      className={`transition-colors hover:text-abu-netral ${className}`}
      {...props}
      aria-label={props["aria-label"] || label}
    >
      {children ?? label}
    </a>
  );
}
