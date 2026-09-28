import { ComponentProps, ReactNode } from "react";

interface ListProps<T> extends Omit<ComponentProps<"ul">, "children"> {
  List: Array<T>;
  renderItem: (Item: T, index: number) => ReactNode;
  keyExtractor: (Item: T, index: number) => string | number;
  itemClassName?: string;
}

export default function List<T>({
  List,
  keyExtractor,
  renderItem,
  itemClassName,
  className = "",
  ...props
}: ListProps<T>) {
  return (
    <ul className={`${className}`} {...props}>
      {List.map((item, index) => {
        const key = keyExtractor
          ? keyExtractor(item, index)
          : (item as Record<string, unknown>)?.id?.toString() ||
            (item as Record<string, unknown>)?.href?.toString() ||
            index;
        return (
          <li key={key} className={`list-none ${itemClassName}`}>
            {renderItem(item, index)}
          </li>
        );
      })}
    </ul>
  );
}
