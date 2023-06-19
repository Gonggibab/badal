import Image from "next/image";

import NoImage from "components/NoImage";
import Link from "next/link";

type OrderItemProps = {
  productId: string;
  title: string;
  image?: string | null;
  price: number;
  quantity: number;
};

export default function OrderItem({
  productId,
  title,
  image,
  price,
  quantity,
}: OrderItemProps) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <div className="relative h-16 w-16 flex-none rounded-md bg-gray-50 overflow-hidden">
          {image ? (
            <Image
              className="h-full w-full object-cover object-center"
              src={image}
              alt="상품 이미지"
              fill
              sizes="100vw 100vh"
              priority
            />
          ) : (
            <NoImage />
          )}
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <Link href={`/product/${productId}`} className="hover:underline">
              {title.split("/")[0]}
            </Link>
          </p>
          <p className="mt-4 truncate text-xs leading-5 text-gray-500">
            {title.split("/").splice(1).join(" / ")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm leading-6 text-gray-900">
          {(price * quantity).toLocaleString("ko-KR")} 원
        </p>

        <p className="mt-4 text-xs leading-5 text-gray-500">{quantity} 개</p>
      </div>
    </li>
  );
}
