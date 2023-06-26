import React from "react";

export default function OrderFilter() {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex justify-between">
        <div className="flex">
          <h2 className="font-bold">기간</h2>
        </div>
        <button
          type="button"
          className="text-orange-500 font-bold hover:underline"
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
