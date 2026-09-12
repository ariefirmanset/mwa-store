import { Link } from "../ui";

export default function PromoHighlight() {
  return (
    <div className="flex w-full justify-center items-center py-4 text-sm font-bold gap-1">
      <p>
        GRATIS ONGKIR MULAI Rp500K DI JABODETABEK. SILAHKAN CEK S&K PENGIRIMAN
      </p>
      <Link className="underline" href="#">
        DI SINI
      </Link>
    </div>
  );
}
