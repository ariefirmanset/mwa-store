import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex bg-white border w-full max-w-md border-black px-4 focus-within:ring-1 rounded-lg items-center focus-within:ring-black">
      <Input
        type="search"
        className="lg:h-10 lg:w-101.5 w-full flex-1 border-none bg-transparent p-0 text-sm outline-none shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0"
        placeholder="Cari produk, atau kategori..."
      />

      <Button
        ariaLabel="Cari"
        className="flex items-center justify-center text-neutral-600 hover:text-black shrink-0"
      >
        <Icon Icon={Search} size={20} />
      </Button>
    </div>
  );
}
