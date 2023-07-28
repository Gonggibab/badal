import React, { Dispatch, SetStateAction } from "react";

import { OrderFilterType } from "pages/admin/order";
import { OrderStatus } from "common/types/order";

type OrderFilterProps = {
  filter: OrderFilterType;
  setFilter: Dispatch<SetStateAction<OrderFilterType>>;
};

export default function OrderFilter({ filter, setFilter }: OrderFilterProps) {
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status: OrderStatus
  ) => {
    const checked = e.currentTarget.checked;

    setFilter({
      ...filter,
      status: checked
        ? filter.status.concat(status)
        : filter.status.filter((stat) => stat !== status),
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex justify-between">
        <div className="flex">
          <h2 className="font-bold">기간</h2>
        </div>
        <button
          type="button"
          className="text-orange-500 font-bold hover:underline"
          onClick={() =>
            setFilter({
              status: [
                "READY",
                "IN_DELIVERY",
                "DONE",
                "CANCLED",
                "RETURN_REQUESTED",
                "RETURN_COMPLETE",
              ],
              gte: null,
              lte: null,
            })
          }
        >
          필터 초기화
        </button>
      </div>
      <fieldset>
        <div className="relative flex gap-x-6">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              checked={filter.status.includes(OrderStatus.READY)}
              onChange={(e) => onChange(e, OrderStatus.READY)}
            />
            <label
              htmlFor="comments"
              className="ml-2 font-semibold tracking-wide"
            >
              출고 대기
            </label>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              checked={filter.status.includes(OrderStatus.IN_DELIVERY)}
              onChange={(e) => onChange(e, OrderStatus.IN_DELIVERY)}
            />
            <label
              htmlFor="comments"
              className="ml-2 font-semibold tracking-wide"
            >
              배송중
            </label>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              checked={filter.status.includes(OrderStatus.DONE)}
              onChange={(e) => onChange(e, OrderStatus.DONE)}
            />
            <label
              htmlFor="comments"
              className="ml-2 font-semibold tracking-wide"
            >
              배송 완료
            </label>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              checked={filter.status.includes(OrderStatus.CANCLED)}
              onChange={(e) => onChange(e, OrderStatus.CANCLED)}
            />
            <label
              htmlFor="comments"
              className="ml-2 font-semibold tracking-wide"
            >
              주문 취소
            </label>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              checked={filter.status.includes(OrderStatus.RETURN_REQUESTED)}
              onChange={(e) => onChange(e, OrderStatus.RETURN_REQUESTED)}
            />
            <label
              htmlFor="comments"
              className="ml-2 font-semibold tracking-wide"
            >
              환불 요청
            </label>
          </div>
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
              checked={filter.status.includes(OrderStatus.RETURN_COMPLETE)}
              onChange={(e) => onChange(e, OrderStatus.RETURN_COMPLETE)}
            />
            <label
              htmlFor="comments"
              className="ml-2 font-semibold tracking-wide"
            >
              환불 완료
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
