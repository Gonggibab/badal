import { useState } from "react";

import { OrderType } from "common/types/order";
import { PaymentDataType } from "common/types/tosspayments";
import isoTimeToKRdate from "common/utils/isoTimeToKRdate";

type OrderStatusProps = {
  order: OrderType;
  payment: PaymentDataType;
};

export default function OrderStatus({ order, payment }: OrderStatusProps) {
  const [progress, setProgress] = useState<number>(0);

  return (
    <div className="py-6">
      {order.status === "CANCLED" && (
        <div className="text-xl font-medium">
          해당 주문은 <span className="text-orange-500">취소처리</span>{" "}
          되었습니다.
          <p className="mt-2 text-sm font-semibold">
            취소 시각:{" "}
            {payment.cancels && isoTimeToKRdate(payment.cancels[0].canceledAt)}
          </p>
        </div>
      )}
      {order.status === "RETURN_REQUESTED" && (
        <div className="text-xl font-medium">
          해당 주문은 <span className="text-orange-500">환불처리</span>{" "}
          중입니다.
        </div>
      )}
      {order.status === "RETURN_COMPLETE" && (
        <div className="text-xl font-medium">
          해당 주문은 <span className="text-orange-500">환불처리</span>{" "}
          완료되었습니다.
        </div>
      )}
      {(order.status === "READY" ||
        order.status === "IN_DELIVERY" ||
        order.status === "DONE") && (
        <>
          <p className="font-semibold tracking-tight">우체국 택배</p>
          <p className="mt-1 mb-4 text-sm leading-7 tracking-tight">
            운송장 번호:
            <span className="text-orange-500 font-semibold"> {order.id}</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${
                progress > 2
                  ? "w-[100%]"
                  : progress > 1
                  ? "w-[66%]"
                  : progress > 0
                  ? "w-[36%]"
                  : "w-[3%]"
              } bg-orange-600 h-2.5  rounded-full`}
            ></div>
          </div>
          <div className="mt-4 w-full flex justify-between items-center text-sm font-medium">
            <p
              className={`${
                progress >= 0 ? "text-orange-500" : "text-gray-900"
              }`}
            >
              출고 대기
            </p>
            <p
              className={`${
                progress >= 1 ? "text-orange-500" : "text-gray-900"
              }`}
            >
              배송 시작
            </p>
            <p
              className={`${
                progress >= 2 ? "text-orange-500" : "text-gray-900"
              }`}
            >
              배송중
            </p>
            <p
              className={`${
                progress >= 3 ? "text-orange-500" : "text-gray-900"
              }`}
            >
              배송 완료
            </p>
          </div>
        </>
      )}
    </div>
  );
}
