import Image from "next/image";
import { ComponentProps } from "react";

type ImgProps = ComponentProps<typeof Image>;

export default function Img({ alt, src, className = "", ...props }: ImgProps) {
  return <Image alt={alt} src={src} className={` ${className}`} {...props} />;
}
