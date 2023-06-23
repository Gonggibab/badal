import Image from "next/image";

import { OrderItemType } from "common/types/order";
import NoImage from "components/NoImage";

type PurchaseItemProps = {
  item: OrderItemType;
};

export default function PurchaseItem({ item }: PurchaseItemProps) {
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
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {item.title}
          </p>
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
