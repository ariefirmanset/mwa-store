import React, { ComponentProps, ReactNode } from "react";

interface TypograpyProps extends ComponentProps<"span"> {
  children: ReactNode;
  className?: string;
}

export default function Typograpy({
  children,
  className = "",
  ...props
}: TypograpyProps) {
  return (
    <span className={`text-5xl font-italiana ${className}`} {...props}>
      {children}
    </span>
  );
}
