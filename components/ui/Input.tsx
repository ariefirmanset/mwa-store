import React from "react";

interface InputProps {
  type: string;
  className?: string;
  placeholder?: string;
}

export default function Input({ type, className, placeholder }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={` ${className ?? ""}`}
    />
  );
}
