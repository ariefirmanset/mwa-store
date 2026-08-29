import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  label?: string;
  className?: string;
  ariaLabel: string;
  type?: "button" | "reset" | "submit";
}

export default function Button({
  children,
  className,
  label,
  ariaLabel,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`hover:cursor-pointer ${className ?? ""}`}
    >
      {children ?? label}
    </button>
  );
}
