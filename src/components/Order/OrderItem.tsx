import Image from "next/image";
import Link from "next/link";

import { OrderItemsAtomType } from "common/recoil/atom";
import NoImage from "components/NoImage";

type OrderItemProps = {
  item: OrderItemsAtomType;
};

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <div className="relative h-16 w-16 flex-none rounded-md bg-gray-50 overflow-hidden">
          {item.image ? (
            <Image
              className="h-full w-full object-cover object-center"
              src={item.image}
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
          <Link
            href={`/product/${item.productId}`}
            className="text-sm font-bold leading-6 text-gray-900 hover:underline"
          >
            {item.title}
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm leading-6 text-gray-900">
          {(item.price * item.quantity).toLocaleString("ko-KR")} 원
        </p>

        <p className="mt-4 text-xs leading-5 text-gray-500">
          {item.quantity} 개
        </p>
      </div>
    </li>
  );
}
