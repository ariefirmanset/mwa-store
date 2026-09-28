import { ComponentProps, ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends ComponentProps<"h1"> {
  as?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

const styles: Record<HeadingLevel, string> = {
  h1: "text-3xl md:texl-4xl font-extrabold tracking-tight",
  h2: "text-2xl md:texl-3xl font-bold tracking-tight",
  h3: "text-xl md:texl-2xl font-semibold tracking-tight",
  h4: "text-lg font-semibold",
  h5: "text-base font-medium",
  h6: "text-sm font-medium",
};

export default function Heading({
  children,
  as: Component = "h1",
  className = "",
  ...props
}: HeadingProps) {
  return (
    <Component className={`${styles[Component]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
