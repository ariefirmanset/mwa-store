import { LucideIcon } from "lucide-react";

interface IconProps {
  Icon: LucideIcon;
  color?: string;
  size?: number | string;
  className?: string;
}
export default function Icon({
  Icon: IconComponent,
  color,
  size = 20,
  className,
}: IconProps) {
  return (
    <IconComponent color={color} size={size} className={className ?? ""} />
  );
}
