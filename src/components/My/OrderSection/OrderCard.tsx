import Image from "next/image";

import { OrderStatus, OrderType } from "common/types/order";
import NoImage from "components/NoImage";
import Link from "next/link";

type OrderCardProps = {
  order: OrderType;
};

const Status = {
  READY: "출고 대기",
  IN_DELIVERY: "배송중",
  DONE: "배송 완료",
  CANCLED: "주문 취소",
  REFUND_REQUESTED: "환불 요청",
  REFUND_COMPLETE: "환불 완료",
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="p-4 w-full rounded-md shadow">
      <div className="w-full flex">
        <div
          className="relative flex-shrink-0 w-32 h-32 bg-gray-200 rounded-md 
            overflow-hidden animate-pulse"
        >
          $
          {order.image ? (
            <Image
              className="w-full h-full object-cover object-center"
              src={order.image}
              alt="주문 제품 이미지"
              fill
              sizes="100vw 100vh"
            />
          ) : (
            <NoImage />
          )}
        </div>
        <div className="w-full ml-4 flex flex-col ">
          <p className="text-xs">
            주문번호
            <span className="ml-2 text-orange-500">{order.orderId}</span>
          </p>
          <Link
            href={`/order/${order.orderId}`}
            className="mt-4 font-semibold cursor-pointer hover:underline"
          >
            {order.title}
          </Link>
          <div className="mt-auto w-full flex justify-between items-end">
            <div className="flex flex-col">
              <p className="text-sm text-orange-500">{Status[order.status]}</p>
              <p className="mt-2 text-xs">{order.createdAt.split("T")[0]}</p>
            </div>

            {order.status === OrderStatus.DONE && (
              <button
                className="px-3 h-8 text-xs rounded-md shadow transition-all 
                hover:shadow-lg hover:translate-y-[1px]"
              >
                리뷰 작성
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
